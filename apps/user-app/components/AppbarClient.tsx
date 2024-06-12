"use client";
import { Appbar } from "@repo/ui/appbar";
//useSession for client side and getServerSession for server side rendering!!
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AppbarClient = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <Appbar
        onSignin={signIn}
        //we are passing signout function as async cause we
        //want to ensure that sign is completed before redirection to sign in page;
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
};
