import { useListen } from "../comlink/useListen";

export const useRemoteConnect = () => {
  const connect = useListen("connect");
  return (connect || null) as (() => null) | null;
};
