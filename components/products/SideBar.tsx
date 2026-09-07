import prisma from "@/libs/prisma";
import Link from "next/link";

export default async function SideBar({
  activeCategoryId,
}: {
  activeCategoryId: number | undefined;
}) {
  const categories = await prisma.category.findMany();

  return (
    <aside className="mb-8 w-full">
      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-bold text-slate-900 sm:text-base">
            分类
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            点击切换 URL 参数，便于分享
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 sm:flex-nowrap sm:overflow-visible">
          <Link
            href="/products"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              !activeCategoryId
                ? "bg-sky-100 text-sky-800 ring-1 ring-sky-200"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            全部商品
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?categoryId=${c.id}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategoryId == c.id
                  ? "bg-sky-100 text-sky-800 ring-1 ring-sky-200"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
