import prisma from "@repo/db/client";
import GraphComponent from "../../../components/GraphComponent";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";

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

  //sorted in a mannor where most recent transaction is on top
  return allTransactions.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
};

export default async function () {
  const allTransactions = await getAllP2pTransactions();

  return (
    <div className="w-scree">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Hello User!
      </div>
      <div>
        {/* graph here */}
        <GraphComponent transactions={allTransactions} />
      </div>
    </div>
  );
}
