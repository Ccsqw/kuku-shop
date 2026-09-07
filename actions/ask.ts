"use server";
import prisma from "@/libs/prisma";
import { updateTag } from "next/cache";
export async function addQuestion(question: {
  productId: number;
  question: string;
}) {
  await prisma.question.create({
    data: {
      productId: question.productId,
      question: question.question,
    },
  });
  updateTag("product");
}
