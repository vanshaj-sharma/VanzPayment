import { atom } from "recoil";

export const balanceAtom = atom<number>({
  key: "balance",
  default: 0,
});

//created a simple recoil atom which is going to be used in hook
