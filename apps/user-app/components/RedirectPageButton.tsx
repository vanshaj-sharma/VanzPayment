"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

export const RedirectPageButton = ({
  btname,
  location,
}: {
  btname: string;
  location: string;
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(location);
      }}
    >
      {btname}
    </Button>
  );
};
