import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
  await client.user.create({
    data: {
      email: "thisissparta@mail.com",
      name: "vansa",
    },
  });
  return NextResponse.json({
    message: "this is sparta",
  });
};
