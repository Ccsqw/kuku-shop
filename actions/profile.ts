"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/libs/prisma";
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

export async function getUserTimeline() {
  try {
    const userId = await getUserIdFromCookie();
    const user_timeline = await prisma.user_timeline.findMany({
      where: {
        userId,
      },
    });
    return {
      success: true,
      message: "获取用户时间线成功",
      data: user_timeline,
    };
  } catch (error) {
    return {
      success: false,
      message: "获取用户时间线失败",
    };
  }
}
