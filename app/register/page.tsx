"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    // 注册逻辑
    // 发送注册请求
    const response = await fetch("/api/auth/register", {
      method: "POST",
      //转成json格式
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setError("");
      alert(data.message);
      router.push("/login");
    } else {
      setError(data.message);
    }
    console.log("注册响应:", data);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-8 sm:p-10 w-full max-w-md">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500"></div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              注册
            </h1>
            <p className="mt-3 max-w-sm text-sm text-slate-500">
              支持qq邮箱、163邮箱、gmail邮箱等
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
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-2.5 text-slate-900 shadow-inner outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-500/25"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-2.5 text-slate-900 shadow-inner outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-500/25"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                密码(≥6位)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
                className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-2.5 text-slate-900 shadow-inner outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-500/25"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 py-3.5 text-sm font-semibold text-white shadow-lg outline-none ring-sky-500/40 hover:shadow-sky-500/35 hover:from-sky-500 hover:to-cyan-500"
          >
            注册
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            已有账号
            <Link
              href="/login"
              className="ml-1 font-semibold text-sky-600 underline decoration-sky-200 underline-offset-4 hover:text-sky-700 hover:decoration-sky-400"
            >
              登录
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
