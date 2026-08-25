import { NextResponse } from "next/server";
export async function GET() {
  const response = NextResponse.json(
    {
      success: true,
      data: { name: "kuku", age: 18 },
      message: "测试成功",
    },
    { status: 200 },
  );
  return response;
}
