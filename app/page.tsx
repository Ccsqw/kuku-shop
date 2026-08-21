import Image from "next/image";
import Layout from "@/components/Layout";
import HomeBanner from "@/components/home/HomeBanner";
import HomeCategoryRow from "@/components/home/HomeCategoryRow";
import { Suspense } from "react";
import HomeFeatured from "@/components/home/HomeFeatured";
import HomeFeaturedInfinite from "@/components/home/HomeFeaturedInfinite";

export default function Home() {
  return (
    <Layout>
      <HomeBanner />
      <Suspense fallback={<div>Loading...</div>}>
        <HomeCategoryRow />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeFeatured />
      </Suspense>
      {/* 以后测试完组件记得删除注释，否则会报错 */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <HomeFeaturedInfinite initialProducts={[]} />
      </Suspense> */}
      <section className="bg-slate-900 py-12 text-center text-slate-300">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            测试账号
            <span className="text-white">admin@example.com / password</span>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            受保护路由与购物车、订单 API 需登录；由根目录 proxy.ts 校验 JWT。
          </p>
        </div>
      </section>
    </Layout>
  );
}
