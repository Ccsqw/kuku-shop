import prisma from "@/libs/prisma";
import { Category } from "@/types";
import Link from "next/link";
export default async function HomeCategoryRow() {
  "use cache";
  const categories: Category[] = await prisma.category.findMany();
  return (
    <section className="border-b border-slate-200/80 bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">热门品类</h2>
            <p className="text-slate-500 mt-1">
              按品类快速进入商品列表，价格与库存以详情页为准
            </p>
          </div>
          <Link href="/products" className="text-sky-600 hover:text-sky-700">
            浏览全部→
          </Link>
        </div>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
              className="p-5 flex min-w-0 w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-5rem)/6)] flex-col items-center rounded-xl border border-slate-100 bg-slate-50/80 transition hover:bg-sky-200 hover:border-sky-200"
            >
              <div className="mb-3 flex h-14 w-14 items-center rounded-full bg-white p-2 shadow-sm">
                <img
                  src={category.iconUrl}
                  alt={category.name}
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-center text-sm font-medium text-slate-800">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
