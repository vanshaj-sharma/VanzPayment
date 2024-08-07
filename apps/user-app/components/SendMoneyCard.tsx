"use client";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { toast } from "react-toastify";
export const SendMoneyCard = () => {
  const router = useRouter();
  const [phoneno, setPhoneno] = useState("");
  const [amount, setAmount] = useState("");

  const displayText = ({
    okay,
    message,
  }: {
    okay: boolean;
    message?: string;
  }) => {
    if (!okay) {
      toast.error(message);
    } else {
      toast.success("Transaction complete!", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="h-[90vh]">
      <Card title={"Amount"}>
        <div className="min-w-72 pt-2">
          <TextInput
            placeholder="Add Your Friend's Phone Number"
            label="Phone Number"
            onChange={(value) => {
              setPhoneno(value);
            }}
          />
          <TextInput
            placeholder="Add Transfer Amount"
            label="Amount"
            onChange={(value) => {
              setAmount(value);
            }}
          />
          <div className="flex justify-center pt-4">
            <Button
              onClick={async () => {
                const details = await p2pTransfer(
                  phoneno,
                  Number(amount) * 100
                );
                //add here
                router.refresh();
                // @ts-ignore
                displayText(details);
              }}
            >
              Send Money
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
