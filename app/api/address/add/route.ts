import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/prisma";
import { getUserIdFromRequest } from "@/libs/auth-request";
export async function POST(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  const { tag, name, tel, address, isDefault } = await request.json();
  if (!tag || !name || !tel || !address) {
    return NextResponse.json(
      {
        success: false,
        message: "请填写完整地址信息",
      },
      { status: 400 },
    );
  }
  if (isDefault) {
    //如果isDefault为true，需要取消原有的默认地址
    await prisma.address.updateMany({
      where: {
        userId,
      },
      data: {
        isDefault: 0,
      },
    });
  }
  const newAddress = await prisma.address.create({
    data: {
      userId,
      tag,
      name,
      tel,
      address,
      isDefault: isDefault ? 1 : 0,
    },
  });
  return NextResponse.json({
    success: true,
    message: "添加地址成功",
    data: newAddress,
  });
}
