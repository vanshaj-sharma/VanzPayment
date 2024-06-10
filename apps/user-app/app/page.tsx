"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
export default function Page(): JSX.Element {
  const session = useSession();
  return (
    <>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
    </>
  );
}
