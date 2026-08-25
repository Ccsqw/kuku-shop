import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      {
        success: false,
        message: "请填写所有字段",
      },
      { status: 400 },
    );
  }

  //验证邮箱是否存在
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "邮箱不存在",
      },
      { status: 400 },
    );
  }
  //验证密码是否正确
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    return NextResponse.json(
      {
        success: false,
        message: "密码错误",
      },
      { status: 400 },
    );
  }

  //token用户权限校验
  //过期时间1小时
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );
  console.log("token:", token);
  const res = NextResponse.json(
    {
      success: true,
      message: "登录成功",
      //返回用户信息
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        //直接返回token
        // token,
      },
    },
    { status: 200 },
  );
  res.cookies.set("auth_token", token, {
    //httpOnly: true, // 只能通过HTTP请求访问，不能通过JavaScript访问
    httpOnly: true,
    //只要访问同域名下的路径，就可以访问到cookie
    path: "/",
    //过期时间1小时
    maxAge: 60 * 60,
  });
  return res;
}
