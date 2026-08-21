import Image from "next/image";
import Link from "next/link";
export default function HomeBanner() {
  return (
    <section className="relative min-h-[22rem] md:min-h-[28rem] overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920"
          fill
          alt=""
          className="object-cover opactity-40"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-sky-900/40"></div>
      </div>
      <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row md:items-center gap-10">
        <div className="max-w-xl text-white space-y-6">
          <p className="text-sm text-white tracking-[0.2em]">企业级电商商城</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            全链路体验
            <span> Next.js 16</span>
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed">
            服务端渲染、Server Actions、Route Handlers、Cache Components、Proxy
            鉴权与按需缓存失效，Prisma 数据库
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="items-center justify-center px-8 py-3 font-semibold text-white"
            >
              进入商城
            </Link>
            <Link
              href="/dashboard"
              className="items-center justify-center px-8 py-3 font-semibold rounded-lg border border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
              控制台
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 space-y-3 shadow-2xl">
            <p className="font-semibold text-white">
              项目及课程版权所有：前端徐老师
            </p>
            <ul className="list-disc pl-5 text-slate-300 leading-relaxed">
              <li>已申请国家知识产权局知识产权备案，侵权必究</li>
              <li>徐老师本人vx：xw34771105</li>
              <li>
                徐老师更多课程：
                <a
                  className="text-blue-300 hover:text-white"
                  href="https://xulaoshi.taobao.com"
                  target="_blank"
                >
                  https://xulaoshi.taobao.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
