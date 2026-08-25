"use server";
import prisma from "@/libs/prisma";
import { Product } from "@/types";
export default async function getFeaturedProducts(skip: number) {
  const products: Product[] = await prisma.products.findMany({
    skip,
    take: 12,
    orderBy: {
      id: "asc",
    },
  });
  return products;
}
