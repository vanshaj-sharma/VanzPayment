"use client";
import { useBalance } from "@repo/store/useBalance";
export default function Page(): JSX.Element {
  const balance = useBalance();
  return (
    <>
      <div className="text-4xl ">hi there</div>
      <div>Your balance is {balance}</div>
    </>
  );
}
