import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const response = NextResponse.json(
    { success: true, message: "退出成功" },
    { status: 200 },
  );
  response.cookies.delete("auth_token");

  return response;
}
