import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { getUserIdFromRequest } from "@/libs/auth-request";
export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  //在进入到这里时，userId已经通过拦截器验证通过，所以这里直接查询数据库即可
  const addresses = await prisma.address.findMany({
    where: {
      userId,
    },
    orderBy: {
      isDefault: "desc",
    },
  });
  return NextResponse.json({
    success: true,
    message: "获取用户地址成功",
    data: addresses,
  });
}
