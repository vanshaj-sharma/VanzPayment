import { Card } from "@repo/ui/card";

export const P2pTransactionsCard = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    senderId?: number;
    receiverId?: number;
  }[];
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Card title={"Recent P2P Transactions"}>
        <div className="text-center pb-8 pt-8">No Recent P2P Transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent P2P Transaction">
      {transactions.map((t) => (
        <div className="flex justify-between">
          <div>
            <div className="text-sm">{/* add received or sent */}</div>
            <div className="text-slate-600 text-xs">
              {t.time.toDateString()}
            </div>
            <div className="flex flex-col justify-center">
              - Rs {t.amount / 100}
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};
