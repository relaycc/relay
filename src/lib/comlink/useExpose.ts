import * as Comlink from "comlink";
import { useEffect, useState } from "react";

const COMLINK: {
  exposed: Record<string, unknown> | null;
} = {
  exposed: null,
};

export const useExpose = (key: string, value: unknown, target: Window | null) => {
  const [exposed, setExposed] = useState(false);

  useEffect(() => {
    if (target === null) {
      return;
    } else {
      if (COMLINK.exposed === null) {
        COMLINK.exposed = {};
        Comlink.expose(COMLINK.exposed, Comlink.windowEndpoint(target));
      }
      setExposed(true);
    }
  }, [target]);

  useEffect(() => {
    if (!exposed) {
      return;
    } else {
      if (COMLINK.exposed === null) {
        throw new Error("Exposed is true but COMLINK.exposed is null");
      } else {
        console.log(`useExpose.ts :: exposing key: ${key} with value: ${value}`);
        COMLINK.exposed[key] = Comlink.proxy(value);
      }
    }
  }, [exposed, key, value]);
};
