import prisma from "@/libs/prisma";
import { Product } from "@/types";
import Link from "next/link";
import HomeFeaturedInfinite from "@/components/home/HomeFeaturedInfinite";
export default async function HomeFeatured() {
  "use cache";
  const products: Product[] = await prisma.products.findMany({
    skip: 0,
    take: 12,
    orderBy: { id: "asc" },
  });
  return (
    <section className="bg-slate-50 py-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">精选商品</h2>
            <p className="text-slate-500 mt-1">
              为你挑选口碑与热度兼具的商品，点进卡片查看详情与规格
            </p>
          </div>
          <div>
            <Link
              href="/products"
              className="text-sky-600 font-semibold hover:text-sky-700"
            >
              查看全部→
            </Link>
          </div>
        </div>
        {/* 无限滚动组件 */}
        <HomeFeaturedInfinite initialProducts={products} />
        <p className="mt-10 border-t border-slate-200 pt-8 text-center text-sm text-slate-400">
          我是有底线的~
        </p>
      </div>
    </section>
  );
}
