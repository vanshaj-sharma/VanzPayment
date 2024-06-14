"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  // getting payer info and handling if info not available
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Unauthorized Action Detected",
    };
  }

  //getting/ validating receiver
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "Invalid Number",
    };
  }

  //db txn

  await prisma.$transaction(async (txn) => {
    //this will lock db
    await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

    const fromBalance = await txn.balance.findUnique({
      where: {
        id: Number(from),
      },
    });

    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient balance ");
    }

    await txn.balance.update({
      where: { id: Number(from) },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });

    await txn.balance.update({
      where: { id: toUser.id },
      data: {
        amount: {
          increment: amount,
        },
      },
    });
  });
}
