import * as Comlink from "comlink";
import { useMemo, useEffect, useState } from "react";

const COMLINK: {
  wrapped: any;
} = {
  wrapped: null,
};

export const useWrap = (target: Window | null) => {
  const [wrapped, setWrapped] = useState(false);

  useEffect(() => {
    if (target === null) {
      return;
    } else {
    if (COMLINK.wrapped === null) {
      COMLINK.wrapped = Comlink.wrap(
        Comlink.windowEndpoint(target)
      );
    }
    setWrapped(true);
    }
  }, [target]);

  return useMemo(() => {
    if (wrapped && COMLINK.wrapped === null) {
      throw new Error("Wrapped is true but COMLINK.wrapped is null");
    } else {
      return COMLINK.wrapped;
    }
  }, [wrapped]);
};
