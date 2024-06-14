"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";

export const SendMoneyCard = () => {
  return (
    <div className="h-[90vh]">
      <Card title={"Amount"}>
        <div className="min-w-72 pt-2">
          <TextInput
            placeholder="Add Your Friend's Phone Number"
            label="Phone Number"
            onChange={() => {}}
          />
          <TextInput
            placeholder="Add Transfer Amount"
            label="Amount"
            onChange={() => {}}
          />
          <div className="flex justify-center pt-4">
            <Button onClick={() => {}}>Add Money</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
