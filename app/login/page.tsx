"use client";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("/api/auth/login", {
      method: "post",

      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log("后端返回的结果", data);
    //存储到本地存储里
    if (data.success) {
      sessionStorage.setItem("username", data.user.name);
      sessionStorage.setItem("userId", data.user.id);
      setError("");
      router.push("/");
    } else {
      setError(data.message);
    }
  };
  return (
    <Layout>
      <div className="flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-8 sm:p-10 w-full max-w-md">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500" />

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              登录
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              欢迎登录Kuku Shop 在线商城
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-100 bg-red-50/90 px-4 py-3 text-sm text-red-800 shadow-sm">
              {error}
            </div>
          )}

          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                邮箱
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-2.5 text-slate-900 shadow-inner shadow-white/50 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-2 focus:ring-sky-500/25"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                密码
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-2.5 text-slate-900 shadow-inner shadow-white/50 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-2 focus:ring-sky-500/25"
              />
            </div>
          </div>

          <button
            type="button"
            // onClick={handleLogin}

            className="mt-8 w-full rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 outline-none ring-sky-500/40 transition hover:from-sky-500 hover:to-cyan-500 hover:shadow-sky-500/35 active:scale-[0.99]"
            onClick={handleLogin}
          >
            登录
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            没有账号?
            <Link
              href="/register"
              className="ml-1 font-semibold text-sky-600 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-700 hover:decoration-sky-400"
            >
              前去注册
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
