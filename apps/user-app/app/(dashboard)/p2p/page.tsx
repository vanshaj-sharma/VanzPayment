import { SendMoneyCard } from "../../../components/SendMoneyCard";

export default function () {
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
          Add P2P Transactions here
          {/* <SendMoneyCard /> */}
        </div>
      </div>
    </div>
  );
}
