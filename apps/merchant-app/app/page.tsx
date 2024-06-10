"use client";

import { useBalance } from "@repo/store/useBalance";

export default function Page(): JSX.Element {
  const balance = useBalance();
  return (
    <>
      <div className="text-3xl">hello from merchant home page</div>
      <div>Your balance in merchant app is {balance}</div>
    </>
  );
}
