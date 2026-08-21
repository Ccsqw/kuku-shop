export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="container mx-auto px-4 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          <div className="min-w-0 md:flex-1">
            <p className="text-lg font-bold text-white">Shop Enterprise</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              演示型全栈电商：Next.js 16、TypeScript、Server Actions、Route
              Handlers、Cache Components 与 Proxy 鉴权。
            </p>
          </div>
          <div className="min-w-0 md:flex-1">
            <h3 className="mb-4 text-sm font-semibold text-slate-300">
              支付方式
            </h3>
            <ul className="space-y-2 text-sm">
              <li>货到付款</li>
              <li>支付方式</li>
              <li>分期付款</li>
              <li>公司转账</li>
            </ul>
          </div>
          <div className="min-w-0 md:flex-1">
            <h3 className="mb-4 text-sm font-semibold text-slate-300">
              售后服务
            </h3>
            <ul className="space-y-2 text-sm">
              <li>售后政策</li>
              <li>价格保护</li>
              <li>退款说明</li>
              <li>返修/退换货</li>
              <li>取消订单</li>
            </ul>
          </div>
          <div className="min-w-0 md:flex-1">
            <h3 className="mb-4 text-sm font-semibold text-slate-300">
              技术栈提示
            </h3>
            <ul className="space-y-2 text-sm">
              <li>根目录 proxy.ts 校验 JWT</li>
              <li>lib/data 下 use cache 读模型</li>
              <li>app/actions 写路径与失效</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
