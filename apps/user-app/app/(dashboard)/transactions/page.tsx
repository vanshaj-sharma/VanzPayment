import { getServerSession } from "next-auth";
import { AllTransactionCard } from "../../../components/AllTransactionCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

//function to get p2p txns

const getAllP2pTransactions = async () => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
    include: {
      fromUser: {
        select: {
          name: true,
        },
      },

      toUser: {
        select: {
          name: true,
        },
      },
    },
  });

  const allTransactions: {
    id: number;
    time: Date;
    amount: number;
    senderId?: number | null;
    receiverId?: number | null;
    txnPhoneNumber?: string | null;
  }[] = transactions.map((t) => ({
    id: t.id,
    time: t.timestamp,
    amount: t.amount,
    // if fromId = user then it is a received txn
    senderId: t.fromUserId === userId ? null : t.fromUserId,
    // if toUserid = user then it is a sent txn
    receiverId: t.toUserId === userId ? null : t.toUserId,
    //adding ref to name
    txnPhoneNumber: t.fromUserId === userId ? t.toUser.name : t.fromUser.name,
  }));

  // TODO: add pagination!!
  //sorted in a mannor where most recent transaction is on top
  return allTransactions;
  // .sort(
  //   (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  // );
  // .slice(0, 5);
};

const getAllBankTransactions = async () => {
  const session = await getServerSession(authOptions);
  const userId = await Number(session?.user?.id);

  //this will give all transaction of current user
  //and where status show success
  //TODO: add transaction for failure
  const onRampTransactions = await prisma.onRampTransaction.findMany({
    where: {
      AND: [{ userId: userId }, { status: "Success" }],
    },
  });

  return onRampTransactions.map((t) => ({
    id: t.id,
    time: t.startTime,
    amount: t.amount,
    provider: t.provider,
  }));
  // .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  //latest first
};

export default async function () {
  const allP2pTransactions = await getAllP2pTransactions();
  const allBankTransactions = await getAllBankTransactions();
  const allTransactions = [...allBankTransactions, ...allP2pTransactions].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions
      </div>
      <div className="">
        <AllTransactionCard transactions={allTransactions} />
      </div>
    </div>
  );
}
