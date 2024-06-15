import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
  page = "transfer",
}: {
  amount: number;
  locked: number;
  page?: "transfer" | "p2p";
}) => {
  return page === "transfer" ? (
    <Card title={"Balance"}>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unblocked Balance</div>
        <div>{amount / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Total Locked Balance</div>
        <div>{locked / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Total Balance</div>
        <div>{(amount + locked) / 100} INR</div>
      </div>
    </Card>
  ) : (
    <div className="border-b flex justify-between border-slate-300">
      <h1 className="text-3xl">Total Balance:</h1>
      <div className="text-2xl pt-1">{(amount + locked) / 100} INR</div>
    </div>
  );
};
