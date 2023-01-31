import { useListen } from "./useListen";

export interface Network {
  id: number;
}

export const useRemoteNetwork = (target: Window | null) => {
  const network = useListen("network", target);
  return (network || null) as Network | null;
};
