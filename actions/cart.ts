"use server";
import prisma from "@/libs/prisma";
import { CartType } from "@/types";
export async function addCartItems(
  userId: number,
  productId: number,
  count: number,
  price: number,
  category: string,
  name: string,
  image: string,
) {
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
}
