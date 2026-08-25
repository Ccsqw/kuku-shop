"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCartItems } from "@/actions/cart";
const navLink = "text-gray-700 hover:text-sky-600";

export default function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    setIsLogin(sessionStorage.getItem("username") ? true : false);
    //获取购物车商品数量
    const fetchTotalItems = async () => {
      const result = await getCartItems();

      if (!result.success) {
        setTotalItems(0);
        return;
      } else {
        setTotalItems(result.data?.length as number);
      }
    };
    fetchTotalItems();
  }, []);
  const handleLogout = async () => {
    sessionStorage.clear();

    const response = await fetch("/api/auth/logout", {
      method: "post",
    });
    const data = await response.json();
    console.log("后端返回的结果", data);
    if (data.success) {
      setIsLogin(false);
      router.push("/login");
    }
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-6xl h-14 flex items-center px-4 gap-6">
        <Link href="/" className="text-xl font-bold text-sky-600">
          Kuku Shop
        </Link>
        <div className="flex border border-gray-300 rounded flex-1">
          <input
            type="text"
            placeholder="搜索商品"
            className="outline-none border-0 px-3py-2 min-w-0 flex-1"
          />
          <button className="bg-sky-600 text-white px-3 py-2 rounded-r-md text-sm border-gray-300">
            搜索
          </button>
        </div>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/products" className={navLink}>
            商品
          </Link>
          {isLogin ? (
            <>
              <Link href="/dashboard" className={navLink}>
                控制台
              </Link>
              <Link href="/orders" className={navLink}>
                我的订单
              </Link>
              <Link href="/profile" className={navLink}>
                个人中心
              </Link>
              <button className={navLink} type="button" onClick={handleLogout}>
                退出
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={navLink}>
                登录
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-sky-600 text-white px-3 py-1.5 text-sm hover:bg-sky-700"
              >
                注册
              </Link>
            </>
          )}

          <Link
            href="/cart"
            className="transition-opacity hover:opacity-70 relative"
          >
            <Image
              src="/icons/cart.png"
              alt="购物车"
              width="24"
              height="24"
              className="w-6 h-6"
            />

            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center bg-red-500 text-white px-1 rounded-full text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
