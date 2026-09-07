import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getTokenFromRequest } from "@/libs/auth-request";
import { profile } from "console";
function unauthorized(request: NextRequest) {
  const isApi = request.nextUrl.pathname.startsWith("/api");
  console.log("请求路径", request.nextUrl);
  if (isApi)
    return NextResponse.json(
      { success: false, message: "未登录或登录状态失效" },
      { status: 401 },
    );
  return NextResponse.redirect(new URL("/login", request.url));
}
export async function proxy(request: NextRequest) {
  //   console.log("拦截器触发", request);
  /**
   * 拦截器，检查登录状态
   * @param request 请求对象
   * @returns 响应对象
   * 路由跳转：重定向到登录页
   * 接口请求：返回json数据，提示未登录
   */
  const token = await getTokenFromRequest(request);
  // 检查token是否存在
  // 如果不存在，返回未登录响应
  if (!token) return unauthorized(request);
  try {
    //jwt.verify解析成功返回对象，包含userId属性，解析不成功抛出错误
    jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
  } catch (error) {
    return unauthorized(request);
  }
}
///api/address/:path* 拦截/api/address下的所有路径
export const config = {
  matcher: ["/cart", "/orders", "/profile", "/api/address/:path*"],
};
