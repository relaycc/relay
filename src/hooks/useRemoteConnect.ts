import { useListen } from "./useListen";

export const useRemoteConnect = (target: Window | null) => {
  const connect = useListen("connect", target);
  return (connect || null) as (() => null) | null;
};
