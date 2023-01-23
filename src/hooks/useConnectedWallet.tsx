import { Wallet } from "ethers";
import { create } from "zustand";

const devWallet = (() => {
  if (process.env.NEXT_PUBLIC_TEST_PK === undefined) {
    return null;
  } else {
    try {
      return new Wallet(process.env.NEXT_PUBLIC_TEST_PK);
    } catch {
      return null;
    }
  }
})();

export const useConnectedWallet = create<{
  connectedWallet: Wallet | null;
  setConnectedWallet: (wallet: Wallet | null) => unknown;
}>((set) => ({
  connectedWallet: devWallet,
  setConnectedWallet: (wallet: Wallet | null) =>
    set({ connectedWallet: wallet }),
}));
