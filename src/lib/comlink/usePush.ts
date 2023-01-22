import { useWrap } from "./useWrap";
import { useEffect } from "react";
import { ProxyMarked, proxyMarker, proxy } from "comlink";

export const usePush = (key: string, value: unknown, target: Window | null) => {
  const wrapped = useWrap(target);

  useEffect(() => {
    (async () => {
      try {
        const prefixKey = `notify-${key}`;
        const func = await wrapped[prefixKey];
        console.log(`usePush.ts :: pushing key: ${key} with value: ${value}`);
        func(await value);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, [wrapped, key, value]);
};

const isProxy = (val: unknown): val is ProxyMarked => {
  return (
    typeof val === "object" &&
    val !== null &&
    !!(val as ProxyMarked)[proxyMarker]
  );
};
