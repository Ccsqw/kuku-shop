"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserTimeline } from "@/actions/profile";
import AddressModel from "./_components/address-model";
const MOCK_USER = {
  displayName: "徐老师",
  email: "zhang****@example.com",
  phone: "138****6280",
  memberLevel: "微信号：xw34771105",
  memberTag: "GOLD",
  joinDate: "2026-05-01",
  points: 2860,
  coupons: 3,
  completedOrders: 24,
  favorites: 12,
};

interface AddressType {
  id: number;
  tag: string;
  isDefault: 0 | 1;
  name: string;
  tel: string;
  address: string;
  userId: number;
}

const TABS = [
  { id: "overview", label: "概览" },
  { id: "account", label: "账号资料" },
  { id: "security", label: "安全与隐私" },
];

export default function ProfilePage() {
  const [tab, setTab] = useState<string>("overview");
  const [useTimeline, setUserTimeline] = useState<any[]>([]);
  const [useAddress, setUserAddress] = useState<AddressType[]>([]);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const getUserAddress = async () => {
    const res = await fetch("/api/address/list");
    const data: any = await res.json();
    console.log("地址", data);
    setUserAddress(data.data);
  };

  useEffect(() => {
    getUserAddress();
    getUserTimeline().then((res: any) => {
      if (res.success) {
        setUserTimeline(res.data as any);
      } else {
        alert(res.message);
        setUserTimeline([]);
      }
    });
  }, []);
  return (
    <Layout>
      <div className="min-h-[72vh] bg-gradient-to-b from-slate-100 via-white to-slate-50">
        {/* 顶部个人卡片 */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_20%_-10%,rgba(14,165,233,0.22),transparent)]" />
          <div className="relative container mx-auto max-w-6xl px-4 py-10 sm:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                <div className="relative">
                  <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-600 text-3xl font-bold text-white shadow-lg shadow-sky-500/30 ring-4 ring-white">
                    {MOCK_USER.displayName.slice(0, 1)}
                  </div>
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold  text-amber-950 shadow">
                    {MOCK_USER.memberTag}
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold text-sky-600">PROFILE</p>
                  <h1 className="mt-1 text-3xl font-bold text-slate-900">
                    {MOCK_USER.displayName}
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    {MOCK_USER.memberLevel} · 前端一对一辅导
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    徐老师正版课程店：
                    <a
                      href="https://xulaoshi.taobao.com/"
                      target="_blank"
                      className="text-sky-600 hover:text-sky-800"
                    >
                      https://xulaoshi.taobao.com/
                    </a>
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    店铺名称：码控前端徐老师
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <button
                      type="button"
                      className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
                    >
                      编辑资料
                    </button>
                    <Link
                      href="/orders"
                      className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-sky-200 hover:text-sky-700"
                    >
                      我的订单
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex w-full max-w-md flex-wrap gap-3 lg:max-w-lg">
                <div className="min-w-0 w-[calc((100%-0.75rem)/2)] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm  sm:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-0.75rem)/2)]">
                  <p className="text-xs text-slate-500">已完成订单</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                    {MOCK_USER.completedOrders}
                  </p>
                </div>
                <div className="min-w-0 w-[calc((100%-0.75rem)/2)] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm  sm:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-0.75rem)/2)]">
                  <p className="text-xs text-slate-500">可用优惠券</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-amber-600">
                    {MOCK_USER.coupons}
                  </p>
                </div>
                <div className="min-w-0 w-[calc((100%-0.75rem)/2)] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm  sm:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-0.75rem)/2)]">
                  <p className="text-xs text-slate-500">积分余额</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-sky-600">
                    {MOCK_USER.points.toLocaleString()}
                  </p>
                </div>
                <div className="min-w-0 w-[calc((100%-0.75rem)/2)] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm  sm:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-0.75rem)/2)]">
                  <p className="text-xs text-slate-500">商品收藏</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-rose-600">
                    {MOCK_USER.favorites}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-4 py-10">
          {/* Tab */}
          <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-sm">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:flex-none sm:px-6 ${
                  tab === t.id
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="min-w-0 space-y-8 lg:flex-[2]">
              {tab === "overview" && (
                <>
                  <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">
                      快捷入口
                    </h2>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      {[
                        {
                          href: "/cart",
                          title: "购物车",
                          sub: "查看待结算商品",
                          color: "from-sky-500 to-cyan-500",
                        },
                        {
                          href: "/orders",
                          title: "订单中心",
                          sub: "物流与售后",
                          color: "from-violet-500 to-purple-600",
                        },
                        {
                          href: "/products",
                          title: "继续购物",
                          sub: "发现更多好物",
                          color: "from-rose-500 to-orange-500",
                        },
                        {
                          href: "#",
                          title: "优惠券",
                          sub: "即将上线",
                          color: "from-emerald-500 to-teal-600",
                        },
                      ].map((card) => (
                        <Link
                          key={card.title}
                          href={card.href}
                          className="group flex w-full items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-sky-200 hover:bg-white hover:shadow-md sm:w-[calc((100%-0.75rem)/2)] sm:min-w-0"
                        >
                          <span
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-lg font-bold text-white shadow-md`}
                          >
                            {card.title.slice(0, 1)}
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 group-hover:text-sky-700">
                              {card.title}
                            </p>
                            <p className="text-xs text-slate-500">{card.sub}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-lg font-bold text-slate-900">
                        最近动态
                      </h2>
                      <span className="text-xs text-slate-400">演示数据</span>
                    </div>
                    <ol className="mt-5 space-y-0 border-l-2 border-slate-100 pl-5">
                      {useTimeline.map((item, i) => (
                        <li key={i} className="relative pb-8 last:pb-0">
                          <span className="absolute -left-[1.4rem] top-1 flex h-3 w-3 rounded-full border-2 border-white bg-sky-500 shadow ring-2 ring-sky-100" />
                          <p className="text-xs text-slate-400">{item.time}</p>
                          <p className="mt-1 font-semibold text-slate-900">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-sm text-slate-600">
                            {item.desc}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">
                      收货地址
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      默认地址将用于结算页；以下为演示条目。
                    </p>
                    <ul className="mt-5 space-y-4">
                      {useAddress.map((item) => (
                        <li
                          key={item.id}
                          className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-sky-200/80 hover:bg-white"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-slate-200/80 px-2 py-0.5 text-xs font-medium text-slate-700">
                              {" "}
                              {item.tag}
                            </span>

                            {item.isDefault ? (
                              <span className="rounded-md bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800">
                                默认
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-2 font-medium text-slate-900">
                            {item.name} · {item.tel}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            {item.address}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setAddressModalOpen(true)}
                      className="mt-4 w-full rounded-xl border border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-600 hover:border-sky-300 hover:bg-sky-50/50 hover:text-sky-700"
                    >
                      + 新增地址
                    </button>
                  </section>
                </>
              )}

              {tab === "account" && (
                <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900">账号资料</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    以下字段为只读展示，后续可对接编辑表单。
                  </p>
                  <dl className="mt-6 divide-y divide-slate-100">
                    {[
                      ["昵称", MOCK_USER.displayName],
                      ["登录邮箱", MOCK_USER.email],
                      ["绑定手机", MOCK_USER.phone],
                      ["会员等级", MOCK_USER.memberLevel],
                      ["注册时间", MOCK_USER.joinDate],
                    ].map(([k, v]) => (
                      <div
                        key={k as string}
                        className="flex flex-wrap items-center justify-between gap-3 py-4"
                      >
                        <dt className="text-sm text-slate-500">{k}</dt>
                        <dd className="text-sm font-medium text-slate-900">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {tab === "security" && (
                <section className="space-y-6">
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">
                      安全设置
                    </h2>
                    <ul className="mt-4 divide-y divide-slate-100">
                      {[
                        ["登录密码", "已设置 · 建议定期更换", "修改"],
                        ["手机验证", MOCK_USER.phone, "更换"],
                        ["邮箱验证", MOCK_USER.email, "验证"],
                        ["两步验证", "未开启（演示）", "开启"],
                      ].map(([title, sub, action]) => (
                        <li
                          key={title as string}
                          className="flex flex-wrap items-center justify-between gap-3 py-4"
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {title}
                            </p>
                            <p className="mt-0.5 text-sm text-slate-500">
                              {sub}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="text-sm font-semibold text-sky-600 hover:text-sky-800"
                          >
                            {action}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-5 text-sm text-amber-950">
                    <p className="font-semibold">安全提示</p>
                    <p className="mt-2 leading-relaxed text-amber-900/90">
                      请勿向他人透露验证码与密码；若收到可疑「中奖」「退款」链接，请通过官方
                      App 或网站核实。演示文案，后续可替换为运营配置。
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* 侧栏 */}
            <aside className="min-w-0 space-y-6 lg:flex-1">
              <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-slate-100 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                  会员权益
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  本周精选礼遇
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-sky-400">✓</span> 积分商城 9 折兑换券
                    ×1（演示）
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-400">✓</span> 指定品类满 299 减 30
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-400">✓</span> 生日月双倍积分
                  </li>
                </ul>
                <button
                  type="button"
                  className="mt-5 w-full rounded-xl bg-sky-500 py-2.5 text-sm font-semibold text-white hover:bg-sky-400"
                >
                  查看全部权益
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900">帮助中心</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    "如何修改收货地址？",
                    "退换货政策说明",
                    "发票与报销凭证",
                    "联系在线客服",
                  ].map((t) => (
                    <li key={t}>
                      <a href="#" className="text-slate-600 hover:text-sky-600">
                        {t} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-slate-50 p-6 text-sm text-slate-600">
                <p className="font-semibold text-slate-800">购物须知</p>
                <p className="mt-2 leading-relaxed">
                  会员积分可在结算时抵扣现金，优惠券请在有效期内使用；订单发货后可在「我的订单」查看物流。如有退换货需求，请在签收后
                  7 日内联系客服，未拆封商品支持七天无理由退货（特殊品类除外）。
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <AddressModel
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSave={getUserAddress}
      />
    </Layout>
  );
}
