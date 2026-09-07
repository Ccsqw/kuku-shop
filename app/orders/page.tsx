"use client";
import Layout from "@/components/Layout";
import Link from "next/link";
import { getOrder } from "@/actions/order";
import { useState, useEffect, useMemo } from "react";
type OrderStatus = "pending" | "shipped" | "completed" | "cancelled";
interface OrderType {
  id: number;
  orderNo: string;
  createdAt: Date;
  status: OrderStatus;
  statusLabel: string;
  total: number;
  name: string;
  spec: string;
  qty: number;
  price: number;
  recipient: string;
  address: string;
  payment: string;
  express: string;
}
function statusBadgeClass(status: OrderStatus) {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-800 ring-amber-200/80";
    case "shipped":
      return "bg-sky-50 text-sky-800 ring-sky-200/80";
    case "completed":
      return "bg-emerald-50 text-emerald-800 ring-emerald-200/80";
    case "cancelled":
      return "bg-slate-100 text-slate-600 ring-slate-200/80";
  }
}

export default function OrdersPage() {
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const stat = useMemo(() => {
    const all = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;

    const done = orders.filter((o) => o.status === "completed").length;
    //reduce 计算所有未取消订单的总金额
    //reduce的参数 s 累加器 o 当前元素
    //reduce的初始值 0

    const sum = orders
      .filter((item) => item.status !== "cancelled")
      .reduce((s, o) => s + o.total, 0);
    return {
      all,
      pending,
      done,
      sum,
    };
  }, [orders]);
  const fetchOrder = async () => {
    const orders = await getOrder();
    if (orders.success) setOrders(orders.data);
    else alert(orders.message);
  };
  //对于不需要及时跟新的模糊搜索结果，使用useMemo缓存结果
  const fliterOrders = useMemo(() => {
    if (!query.trim()) {
      return orders;
    }
    return orders.filter(
      (o) =>
        o.orderNo.includes(query) ||
        o.name.includes(query) ||
        o.recipient.includes(query),
    );
  }, [query, orders]);
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Layout>
      <div className="min-h-[70vh] bg-gradient-to-b from-slate-50 via-white to-slate-50/90">
        {/* 头部区域 */}
        <div className="border-b border-slate-200/80 bg-white/90">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium text-sky-600">Order Center</p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  我的订单
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                  查看物流、确认收货与售后进度。以下为演示数据，后续可对接真实订单接口与筛选条件。
                </p>
              </div>

              {/* 统计卡片 */}
              <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                <div className="min-w-22 flex-1 rounded-xl border border-slate-200/90 bg-slate-50/80 px-4 py-3 text-center shadow-sm">
                  <p className="whitespace-nowrap text-xs text-slate-500">
                    全部订单
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {stat.all}
                  </p>
                </div>
                <div className="min-w-22 flex-1 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-center shadow-sm">
                  <p className="whitespace-nowrap text-xs text-amber-700/90">
                    待发货
                  </p>
                  <p className="mt-1 text-xl font-bold text-amber-900">
                    {stat.pending}
                  </p>
                </div>
                <div className="min-w-22 flex-1 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-center shadow-sm">
                  <p className="whitespace-nowrap text-xs text-emerald-700/90">
                    已完成
                  </p>
                  <p className="mt-1 text-xl font-bold text-emerald-900">
                    {stat.done}
                  </p>
                </div>
                <div className="min-w-22 flex-1 rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-3 text-center shadow-sm">
                  <p className="whitespace-nowrap text-xs text-sky-700/90">
                    有效金额
                  </p>
                  <p className="mt-1 text-lg font-bold text-sky-900">
                    ¥{stat.sum}
                  </p>
                </div>
              </div>
            </div>

            {/* 搜索栏 */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                    />
                  </svg>
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索订单号、商品名、状态或收件人..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-inner shadow-slate-100 outline-none ring-sky-500/0 transition focus:border-sky-300 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <Link
                href="/products"
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-sky-200 hover:text-sky-700 hover:bg-sky-50/50"
              >
                继续逛逛~
              </Link>
            </div>
          </div>
        </div>

        {/* 订单列表区域 */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
            <span>
              共
              <strong className="text-slate-800">{fliterOrders.length}</strong>
              条结果
              {query.trim() ? `（关键词「${query}」）` : ""}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              支持订单号 / 商品 / 状态模糊搜索
            </span>
          </div>

          {fliterOrders.length === 0 ? (
            /* 空状态 */
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 py-20 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-lg font-semibold text-slate-800">
                没有找到匹配的订单
              </p>
              <p className="mt-1 text-sm text-slate-500">
                换个关键词试试，或清空搜索框查看全部演示订单。
              </p>
              <button
                type="button"
                className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
                onClick={() => setQuery("")}
              >
                清空搜索
              </button>
            </div>
          ) : (
            /* 订单列表 */
            <ul className="space-y-6">
              {fliterOrders.map((order) => (
                <li
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/5 hover:shadow-md"
                >
                  {/* 订单头部 */}
                  <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <span className="font-semibold text-slate-900">
                        {order.orderNo}
                      </span>
                      <span className="text-slate-500">
                        {order.createdAt.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${statusBadgeClass(order.status)}`}
                      >
                        {order.statusLabel}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-sky-200 hover:text-sky-700"
                      >
                        订单详情
                      </button>
                      {order.status === "shipped" && (
                        <button
                          type="button"
                          className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
                        >
                          查看物流
                        </button>
                      )}
                      {order.status === "completed" && (
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-rose-200 hover:text-rose-600"
                        >
                          申请售后
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 订单商品与信息 */}
                  <div className="px-5 py-4">
                    <ul className="divide-y divide-slate-100">
                      <li className="flex flex-wrap items-start justify-between gap-3 py-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900">
                            {order.name}
                          </p>
                          <p className="mt-0.5 text-sm text-slate-500">
                            {order.spec}
                          </p>
                        </div>
                        <div className="text-right text-sm text-slate-600">
                          <span>{order.qty}</span>
                          <span className="ml-3 font-medium text-slate-900">
                            ¥{order.price.toLocaleString()}
                          </span>
                        </div>
                      </li>
                    </ul>

                    {/* 收货与支付信息 */}
                    <div className="mt-4 flex flex-col gap-3 rounded-xl bg-slate-50/90 p-4 text-sm text-slate-600 sm:flex-row">
                      <div className="min-w-0 sm:flex-1">
                        <p className="text-xs font-medium text-slate-400">
                          收货信息
                        </p>
                        <p className="mt-1 font-medium text-slate-800">
                          {order.recipient}
                        </p>
                        <p className="mt-0.5 text-slate-600">
                          {order.address} · 已脱敏展示
                        </p>
                      </div>
                      <div className="min-w-0 sm:flex-1">
                        <p className="text-xs font-medium text-slate-400">
                          支付与配送
                        </p>
                        <p className="mt-1 text-slate-800">{order.payment}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {order.express}
                        </p>
                      </div>
                    </div>

                    {/* 金额信息 */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <p className="text-sm text-slate-500">
                        订单优惠金额：¥
                        {(order.price - order.total).toLocaleString()}
                      </p>
                      <p className="font-bold text-rose-600">
                        实付
                        <span className="text-xl">
                          {" "}
                          ¥{order.total.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* 购物小贴士 */}
          <aside className="mt-10 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/90 to-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">购物小贴士</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500" />
                订单支付成功后仓库一般在 24 小时内完成拣货与发货（演示文案）。
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500" />
                运输中订单可点击「查看物流」跟踪包裹；签收后 7
                日内支持发起售后申请。
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span>
                  订单详情页将展示订单号、订单时间、订单状态、订单商品、订单收货信息、订单支付信息、订单物流信息等
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
