"use client";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { CartType } from "@/types";
import { deleteCartItem, getCartItems } from "@/actions/cart";
export default function CartPage() {
  // const mock = [
  //   {
  //     id: 1,
  //     name: "商品1",
  //     price: 100,
  //     image:
  //       "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
  //     category: "电子产品",
  //     count: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "商品2",
  //     price: 200,
  //     image:
  //       "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
  //     category: "电子产品",
  //     count: 2,
  //   },
  // ];
  const [cartItems, setCartItems] = useState<CartType[]>([]);

  const fetchCartItems = async () => {
    // const res: { success: boolean; message: string; data: CartType[] } =
    const res: any = await getCartItems();
    console.log("结果", res);
    if (res.success) {
      setCartItems(res.data || []);
    } else {
      alert(res.message);
    }
  };

  const handleRomoveItem = (id: number) => {
    deleteCartItem(id);
    location.reload();
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 min-h-[70vh]">
          <div className="text-center py-16">
            <Image
              src="/icons/cart.png"
              alt="购物车"
              width={72}
              height={72}
              loading="eager"
              className="mx-auto mb-4 opacity-40"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              购物车是空的
            </h2>
            <p className="text-gray-500 mb-6">快去选购您喜欢的商品吧</p>
            <Link
              href="/"
              className="inline-block bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
            >
              去逛逛~
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="bg-slate-50/80  min-h-[70vh]">
        <div className="container mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            购物车
          </h1>

          <div className="mt-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="lg:w-2/3">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 border-b border-slate-100 p-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <Link
                        href="/"
                        className="w-24 h-24 overflow-hidden rounded-xl bg-slate-100 relative"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          loading="eager"
                          className="object-cover"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link href="/">
                          <h3 className="text-base font-semibold text-slate-900 hover:text-sky-600">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {item.category}
                        </p>
                        <p className="mt-2 text-lg font-bold text-rose-600">
                          {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50 px-4 py-2.5 shadow-sm ring ring-slate-100">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.75}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-400">
                            数量
                          </p>
                          <p className="text-base font-semibold text-slate-900">
                            {item.count}
                            <span className="ml-1 text-sm font-normal text-slate-500">
                              件
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        onClick={() => handleRomoveItem(item.id)}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">订单摘要</h2>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <div>商品总数</div>
                    <div className="text-slate-900">
                      {/* reduce acc 累加器 item 当前项 初始值为0 */}
                      {cartItems.reduce((acc, item) => acc + item.count, 0)}件
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>优惠金额</div>
                    <div className="text-slate-900">￥0.00</div>
                  </div>
                  <div className="flex justify-between">
                    <div>运费</div>
                    <div className="text-emerald-600">免运费</div>
                  </div>
                </div>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>总计</span>
                    <span className="text-rose-600">
                      {/* toLocaleString 格式化数字  */}￥
                      {cartItems
                        .reduce((acc, item) => acc + item.price * item.count, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-700"
                >
                  去结算
                </button>
                <Link
                  href="/"
                  className="mt-3 block w-full rounded-xl py-2.5 text-center text-sm text-sky-600 hover:text-sky-700"
                >
                  继续购物
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
