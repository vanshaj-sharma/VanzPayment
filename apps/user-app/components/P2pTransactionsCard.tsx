import { Card } from "@repo/ui/card";

export const P2pTransactionsCard = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    senderId?: number | null;
    receiverId?: number | null;
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
      {transactions.slice(0, 10).map((t) =>
        t.senderId != undefined ? (
          // received money here
          <div className="flex justify-between text-green-600 pb-1">
            <div>
              <div className="text-sm">Received INR </div>
              <div className=" text-xs">
                {t.time.toDateString()} @
                {t.time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false, // Use 24-hour format
                })}
              </div>
            </div>
            <div className="flex flex-col justify-center ">
              + Rs {t.amount / 100}
            </div>
          </div>
        ) : (
          // sent amount here
          <div className="flex justify-between text-red-600 pb-1">
            <div>
              <div className="text-sm">Sent INR</div>
              <div className=" text-xs">
                {t.time.toDateString()} @
                {t.time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false, // Use 24-hour format
                })}
              </div>
            </div>
            <div className="flex flex-col justify-center ">
              - Rs {t.amount / 100}
            </div>
          </div>
        )
      )}
    </Card>
  );
};
