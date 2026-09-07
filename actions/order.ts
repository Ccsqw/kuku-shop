"use server";
import prisma from "@/libs/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
async function getUserIdFromCookie(): Promise<number> {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) throw new Error("未登录");
  try {
    //jwt.verify解析成功返回对象，包含userId属性，解析不成功抛出错误
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    return decoded.userId as number;
  } catch (error) {
    throw new Error("token验证失败");
  }
}

export async function getOrder() {
  try {
    const userId = await getUserIdFromCookie();
    const orders = await prisma.orders.findMany({
      where: {
        userId,
      },
    });
    return {
      success: true,
      message: "获取订单成功",
      data: orders,
    };
  } catch (error) {
    return {
      success: false,
      message: "登录过期",
      data: [],
    };
  }
}
