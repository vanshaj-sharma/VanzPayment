import { Card } from "@repo/ui/card";

export const AllTransactionCard = ({
  transactions,
}: {
  transactions: {
    id: number;
    time: Date;
    amount: number;
    senderId?: number | null;
    receiverId?: number | null;
    txnPhoneNumber?: string | null;
    provider?: string;
  }[];
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Card title={"All Transactions"}>
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }

  return (
    <Card title={"All Transactions:"}>
      {transactions.map((transaction) =>
        transaction.provider === undefined ? (
          <P2p t={transaction} />
        ) : (
          <BankTransaction t={transaction} />
        )
      )}
    </Card>
  );
};

// diverting all p2p transactions
const P2p = ({
  t,
}: {
  t: {
    id: number;
    time: Date;
    amount: number;
    senderId?: number | null;
    receiverId?: number | null;
    txnPhoneNumber?: string | null;
  };
}) => {
  return t.senderId != null ? (
    <div key={t.id} className="flex justify-between pb-1">
      <div>
        <div className="text-md">{`Received from ${t.txnPhoneNumber}`}</div>
        <div className=" text-sm">
          {t.time.toDateString()} @
          {t.time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Use 24-hour format
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center text-green-600 pb-1 pr-4 ">
        + Rs {t.amount / 100}
      </div>
    </div>
  ) : (
    <div key={t.id} className="flex justify-between pb-1">
      <div>
        <div className="text-md">{`Sent to ${t.txnPhoneNumber}`}</div>
        <div className=" text-sm">
          {t.time.toDateString()} @
          {t.time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Use 24-hour format
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center text-red-600 pb-1 pr-4 ">
        + Rs {t.amount / 100}
      </div>
    </div>
  );
};

//diverting bank transaction
const BankTransaction = ({
  t,
}: {
  t: {
    id: number;
    time: Date;
    amount: number;
    //TODO: ADD FIX
    // senderId?: number;
    // receiverId?: number;
    // txnPhoneNumber?: string;
    provider?: string;
  };
}) => {
  return (
    <div key={t.id} className="flex justify-between pb-1">
      <div>
        <div className="text-md">Deposit from {t.provider} </div>
        <div className=" text-sm">
          {t.time.toDateString()} @
          {t.time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Use 24-hour format
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center text-green-600 pb-1 pr-4 ">
        + Rs {t.amount / 100}
      </div>
    </div>
  );
};
