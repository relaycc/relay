import { useWrap } from "./useWrap";
import { useEffect } from "react";
import { ProxyMarked, proxyMarker, proxy } from "comlink";

export const usePush = (key: string, value: unknown, targ: unknown) => {
  const proxied = (() => {
    if (typeof value === "function") {
      if (isProxy(value)) {
        return value;
      } else {
        return proxy(value);
      }
    } else {
      return value;
    }
  })();
  const wrapped = useWrap(targ);
  useEffect(() => {
    (async () => {
      try {
        const prefixKey = `notify-${key}`;
        const func = await wrapped[prefixKey];
        console.log(`usePush.ts :: pushing key: ${key} with value: ${value}`);
        func(await proxied);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, [wrapped, key, proxied, value]);
};

const isProxy = (val: unknown): val is ProxyMarked => {
  return (
    typeof val === "object" &&
    val !== null &&
    !!(val as ProxyMarked)[proxyMarker]
  );
};
