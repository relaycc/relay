import { create } from "zustand";

interface StoreState {
  isConnected: boolean;
  updateIsConnected: (isConnected: boolean) => void;
  address: string | null;
  updateAddress: (address: string) => void;
  signer: any;
  updateSigner: (signer: any) => void;
  isIframe: boolean;
  updateIsIframe: (isIframe: boolean) => void;
}

export const useIframeStore = create<StoreState>((set) => ({
  isConnected: false,
  updateIsConnected: (isConnected: boolean) => set({ isConnected }),
  address: null,
  updateAddress: (address: string) => set({ address }),
  signer: null,
  updateSigner: (signer: any) => set({ signer }),
  isIframe: false,
  updateIsIframe: (isIframe: boolean) => set({ isIframe }),
}));
