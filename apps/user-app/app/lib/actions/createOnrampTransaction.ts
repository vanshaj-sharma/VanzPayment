"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  //the token should come from the bank
  //but we are using random

  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unaithenticated Request",
    };
  }

  const token = (Math.random() * 1000).toString();

  //db transaction
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token,
      userId: Number(session?.user?.id),
      amount: amount,
    },
  });

  return {
    message: "Done",
  };
}
