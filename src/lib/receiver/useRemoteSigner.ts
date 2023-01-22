import { Signer } from "@ethersproject/abstract-signer";
import { useListen } from "../comlink/useListen";

export const useRemoteSigner = (target: Window | null) => {
  const signer = useListen("signer", target);
  return (signer || null) as Signer | null;
};
