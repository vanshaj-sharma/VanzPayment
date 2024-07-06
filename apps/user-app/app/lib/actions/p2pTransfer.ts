"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

//error class
class InsufficientBalanceError extends RangeError {}
class InvalidNumber extends RangeError {}

export async function p2pTransfer(to: string, amount: number) {
  // getting payer info and handling if info not available
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      okay: false,
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
      okay: false,
      message: "Invalid Phone Number",
    };
  }

  //db txn
  try {
    await prisma.$transaction(async (txn) => {
      //this will lock db
      await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
      if (from == toUser.id) {
        throw new InvalidNumber("Cannot Send Money to SELF!");
      }

      const fromBalance = await txn.balance.findUnique({
        where: {
          id: Number(from),
        },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new InsufficientBalanceError("Insufficient balance");
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

      await txn.p2pTransfer.create({
        data: {
          amount: amount,
          timestamp: new Date(),
          fromUserId: Number(from),
          toUserId: toUser.id,
        },
      });
    });
    return {
      okay: true,
      message: "Success!",
    };
  } catch (error) {
    //error handling
    if (error instanceof InsufficientBalanceError) {
      return {
        okay: false,
        message: error.message,
      };
    } else if (error instanceof InvalidNumber) {
      return {
        okay: false,
        message: error.message,
      };
    } else {
      return {
        okay: false,
        message: "An Error has Inccured",
      };
    }
  }
}
