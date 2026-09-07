"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
//按钮基础样式
const pageBtnBase =
  "min-w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium shadow-sm transition";
const pageBtnIdle =
  "border-transparent bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50";
const pageBtnActive = "border-sky-500 bg-sky-500 font-semibold text-white";

function buildProductHref(page: number, categoryId?: number) {
  const params = new URLSearchParams();
  if (page > 1) {
    params.set("page", String(page));
  }
  if (categoryId) {
    params.set("categoryId", String(categoryId));
  }
  const qs = params.toString();
  //   console.log("qs", qs); //page=2&categoryId=2
  return qs ? `/products?${qs}` : "/products";

  // /products?page=1&categoryId=2
}

export default function ProductPagination({
  page,
  categoryId,
  total,
}: {
  page?: number;
  categoryId?: number;
  total: number;
}) {
  const totalPages = Math.ceil(total / 12); //总页数
  //如果page没有值的话，让他是1
  //如果有人乱改url，把改成0或者负数
  //如果一共就5页，路径里改成6,我们就取5
  const safePage = Math.min(Math.max(1, page || 1), totalPages || 1); //更保险的当前页,如果page没有值的话，让他是1,防止page undefined 的情况
  const quickPageCount = Math.min(7, totalPages); //用作页码的
  const quickPages: number[] = [];
  const hasMorePages = totalPages > 7; //是否有更多页
  const [jumpPage, setJumpPage] = useState(safePage);
  const router = useRouter();
  for (let i = 1; i <= quickPageCount; i++) {
    quickPages.push(i);
  }
  //onClick跳转
  const onJumpConfirm = () => {
    if (jumpPage < 1 || jumpPage > totalPages) return;
    router.push(buildProductHref(jumpPage, categoryId));
  };

  if (total === 0) {
    return (
      <p className="mt-10 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
        共0件商品
      </p>
    );
  }
  return (
    <nav className="mt-10 flex flex-col items-center gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:justify-between">
      <p className="font-medium text-slate-700">
        共<span>{total}件</span> 每页 <span>12</span>件 共{totalPages} 页
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1">
        {safePage <= 1 ? (
          <span
            className={`${pageBtnBase} pointer-events-none border-slate-200 bg-white px-3 text-slate-400 opacity-50`}
          >
            上一页
          </span>
        ) : (
          <Link
            href={buildProductHref(safePage - 1, categoryId)}
            className={`${pageBtnBase} border-slate-200 bg-white px-3 text-slate-600 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-300`}
          >
            上一页
          </Link>
        )}
        <div className="mx-1 flex items-center gap-1">
          {quickPages.map((p) => (
            <Link
              key={p}
              href={buildProductHref(p, categoryId)}
              className={`${pageBtnBase} ${p === safePage ? pageBtnActive : pageBtnIdle}`}
            >
              {p}
            </Link>
          ))}
          {hasMorePages && (
            <>
              <span className="px-1 text-slate-400">...</span>
              {safePage > 7 && (
                <span
                  className={`${pageBtnBase} ${pageBtnActive}`}
                  title="第8页及以后请使用下一页按钮或者快速跳转翻页"
                >
                  {safePage}
                </span>
              )}
            </>
          )}
        </div>
        {safePage >= totalPages ? (
          <span
            className={`${pageBtnBase} pointer-events-none border-slate-200 bg-white px-3 text-slate-400 opacity-50`}
          >
            下一页
          </span>
        ) : (
          <Link
            href={buildProductHref(safePage + 1, categoryId)}
            className={`${pageBtnBase} border-slate-200 bg-white px-3 text-slate-600 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-300`}
          >
            下一页
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span>跳至</span>
        <input
          type="text"
          placeholder="页码"
          value={jumpPage}
          onChange={(e) => setJumpPage(Number(e.target.value))}
          className="h-9 w-14 rounded-lg border border-slate-200 bg-white px-2 text-center text-sm shadow-sm outline-none ring-sky-400 focus:border-sky-400 focus:ring-2"
        />
        <button
          onClick={onJumpConfirm}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
        >
          确定
        </button>
      </div>
    </nav>
  );
}
