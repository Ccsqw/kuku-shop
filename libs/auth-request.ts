import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function getUserIdFromRequest(request: NextRequest) {
  const token = getTokenFromRequest(request) as string;
  const decoded = jwt.verify(token, process.env.JWT_SECRET! as string) as {
    userId: number;
  };
  return decoded.userId;
}

export function getTokenFromRequest(request: NextRequest) {
  //从Authorization头中提取token，格式为Bearer token
  const auth = request.headers.get("Authorization");
  //case1:Authorization头中包含token 其他项目
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  //case2:Authorization头中不包含token 本项目 从cookie中获取token

  return request.cookies.get("auth_token")?.value;
}
