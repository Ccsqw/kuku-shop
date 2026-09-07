import { Suspense } from "react";
import prisma from "@/libs/prisma";
import { Product, ProductDetail } from "@/types";
import Layout from "@/components/Layout";
import Link from "next/link";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import { cacheTag } from "next/cache";
interface PageProps {
  params: Promise<{ id: string }>;
}

async function ProductInner({ params }: PageProps) {
  //添加缓存，带标记，保证问大家的问题能够及时展示
  "use cache";
  cacheTag("product");
  const { id } = await params;
  const product: Product | null = await prisma.products.findUnique({
    where: {
      id: Number(id),
    },
  });
  //根据id查询商品详情
  const productDetail: ProductDetail[] | null =
    await prisma.product_detail.findMany({
      where: {
        productId: Number(id),
      },
    });

  // console.log("查询到的商品信息product:", product);
  // console.log("查询到的商品详情productDetail:", productDetail);
  //根据商品id查询大家的问题
  const qaList = await prisma.question.findMany({
    where: {
      productId: Number(id),
    },
    include: {
      //关联加载
      answer: {
        orderBy: { a_id: "asc" },
      },
    },
    orderBy: {
      q_id: "desc",
    },
  });
  console.log("查询到的问题qaList:", qaList);
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-sky-600">
            首页
          </Link>
          <span className="mx-2">/</span>
          <span>商品</span>
          <span className="mx-2">/</span>
          <span>{product?.name}</span>
        </nav>
        <p className="text-xs text-slate-400 mb-6">
          以下为商品详情与规格说明；价格、库存与优惠活动以结算页展示为准，下单前请再次确认。
        </p>
        {/* 商品详情组件 */}
        <ProductDetailClient
          product={product as Product}
          productDetail={productDetail as ProductDetail[]}
          qaList={qaList}
        />
      </div>
    </Layout>
  );
}

export default async function ProductPage(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductInner {...props} />
    </Suspense>
  );
}
