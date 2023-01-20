import { Signer } from "@ethersproject/abstract-signer";
import { useListen } from "../comlink/useListen";

export const useRemoteSigner = () => {
  const signer = useListen("signer");
  return (signer || null) as Signer | null;
};
