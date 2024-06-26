import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { SendMoneyCard } from "../../../components/SendMoneyCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2pTransactionsCard } from "../../../components/P2pTransactionsCard";
import { RedirectPageButton } from "../../../components/RedirectPageButton";

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

//function to get p2p txns
const getAllP2pTransactions = async () => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
  });

  const allTransactions: {
    id: number;
    time: Date;
    amount: number;
    senderId?: number | null;
    receiverId?: number | null;
  }[] = transactions.map((t) => ({
    id: t.id,
    time: t.timestamp,
    amount: t.amount,
    // if fromId = user then it is a received txn
    senderId: t.fromUserId === userId ? null : t.fromUserId,
    // if toUserid = user then it is a sent txn
    receiverId: t.toUserId === userId ? null : t.toUserId,
  }));

  // TODO: add pagination!!
  //sorted in a mannor where most recent transaction is on top
  return allTransactions.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
  // .slice(0, 5);
};

export default async function () {
  const balance = await getBalance();

  const allTransactions = await getAllP2pTransactions();
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
          <BalanceCard
            page={"p2p"}
            amount={balance.amount}
            locked={balance.locked}
          />
          <div className="pt-4 ">
            <P2pTransactionsCard transactions={allTransactions} />
            <div className="flex justify-end">
              <RedirectPageButton
                btname="All Transactions"
                location={"/transactions"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
