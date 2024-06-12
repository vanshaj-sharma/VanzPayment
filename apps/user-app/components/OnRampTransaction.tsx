import { Card } from "@repo/ui/card";

export const OnRampTransaction = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    //TODO: find type of status
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions) {
    return (
      <Card title={"Recent Transaction"}>
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }
  return (
    <Card title={"Recent Transaction"}>
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
              <div className="flex flex-col justify-center">
                + Rs {t.amount / 100}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
