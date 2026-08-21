import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    //确定参数都传了
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "请填写所有字段",
        },
        { status: 400 },
      );
    }
    //验证邮箱是否存在
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log(22222, existingUser);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "该邮箱已被注册",
        },
        { status: 400 },
      );
    }
    //将用户的信息插入数据库 bcrypt
    //password 加密 10 轮
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "注册成功",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "请求失败",
      },
      {
        status: 500,
      },
    );
  }
}
