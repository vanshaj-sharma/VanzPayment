"use client";

import { RecoilRoot } from "recoil";

//i am using children from react and wrapping them in a recoilRoot

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
