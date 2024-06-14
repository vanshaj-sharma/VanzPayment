import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { SendMoneyCard } from "../../../components/SendMoneyCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2pTransactionsCard } from "../../../components/P2pTransactionsCard";
import { timeStamp } from "console";

const getBalance = async () => {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return {
    // || 0 to remove type errors
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
};
//TODO: Optimize the below txns
//function to get p2p txns
const getSentP2pTransactions = async () => {
  const session = await getServerSession(authOptions);

  const sentTxns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });

  return sentTxns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    receiverId: t.toUserId,
  }));
};

const getReceivedP2pTransactions = async () => {
  const session = await getServerSession(authOptions);

  const receivedTxns = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id),
    },
  });

  return receivedTxns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    senderId: t.fromUserId,
  }));
};

export default async function () {
  const balance = await getBalance();
  const sentTransactions = await getSentP2pTransactions();
  const receivedTransactions = await getReceivedP2pTransactions();
  const allTransaction: {
    time: Date;
    amount: number;
    senderId?: number;
    receiverId?: number;
  }[] = [...sentTransactions, ...receivedTransactions].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <P2pTransactionsCard transactions={allTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
}
