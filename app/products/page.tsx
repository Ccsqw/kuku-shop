import Layout from "@/components/Layout";
import prisma from "@/libs/prisma";
import type { Product } from "@/types";
// import ProductContent from "@/components/products/ProductContent";
import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import SideBar from "@/components/products/SideBar";
import ProductPagination from "@/components/products/ProductPagination";
async function ProductContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; categoryId?: number }>;
}) {
  const { page, categoryId } = await searchParams;

  //有分类id就查询，没有就返回空数组
  const where = categoryId ? { categoryId: categoryId.toString() } : {};
  const total = await prisma.products.count({
    where,
  });
  const products: Product[] = await prisma.products.findMany({
    where,
    skip: Number((page || 1) - 1) * 12,
    take: 12,
    orderBy: {
      id: "asc",
    },
  });
  return (
    <>
      <SideBar activeCategoryId={categoryId} />
      {/* 此时categoryid是1,2,3,4,5而数据库里的是cat-001,002,003,004 */}
      <div className="flex flex-wrap gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="w-full min-w-0 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <ProductPagination categoryId={categoryId} page={page} total={total} />
    </>
  );
}

export default async function ProductPage(props: any) {
  return (
    <Layout>
      <div className="bg-slate-50 py-10">
        <div className="container mx-auto px-4">
          <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">选购中心</h1>
              <p className="mt-1 text-sm text-slate-500">
                分页通过 URL 查询参数 page与 categoryId驱动，便于分享与刷新。
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              ⬅返回首页
            </Link>
          </header>

          <Suspense fallback={<p>数据疯狂加载中。。。</p>}>
            <ProductContent {...props} />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}
