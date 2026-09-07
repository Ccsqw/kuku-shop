"use server";
import prisma from "@/libs/prisma";
import { CartType } from "@/types";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
//通过cookie获取userId
async function getUserIdFromCookie(): Promise<number> {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) throw new Error("未登录");
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: number;
  };
  //写在server action中的打印语句，打印的结果在后端显示
  console.log("解码后的数据", decoded);
  return decoded.userId as number;
}

export async function addCartItems(
  productId: number,
  count: number,
  price: number,
  category: string,
  name: string,
  image: string,
) {
  try {
    //获取userId
    const userId = await getUserIdFromCookie();
    //判断加购 的商品数据库是否存在
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });
    if (existingCartItem) {
      //如果存在，更新数量
      await prisma.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          count: existingCartItem.count + count,
        },
      });
    } else {
      //如果不存在，创建新商品
      await prisma.cart.create({
        data: {
          userId,
          productId,
          count,
          price,
          category,
          name,
          image,
        },
      });
    }
    return { success: true, message: "添加成功" };
  } catch (error) {
    return { success: false, message: "登录信息已过期，请重新登录" };
  }
}

//获取购物车商品数据
export async function getCartItems() {
  try {
    //获取userId
    const userId = await getUserIdFromCookie();
    //查询购物车商品
    const cartItems = await prisma.cart.findMany({
      where: {
        userId,
      },
    });
    console.log("购物车商品数据", cartItems);
    return { success: true, message: "获取成功", data: cartItems || [] };
  } catch (error) {
    return { success: false, message: "登录信息已过期，请重新登录" };
  }
}

//删除购物车商品
export async function deleteCartItem(id: number) {
  try {
    //获取userId
    const userId = await getUserIdFromCookie();
    //删除购物车商品
    await prisma.cart.delete({
      where: {
        id,
        userId,
      },
    });
    return { success: true, message: "删除成功", data: null };
  } catch (error) {
    return {
      success: false,
      message: "登录信息已过期，请重新登录",
      data: null,
    };
  }
}
