import * as Comlink from "comlink";
import { useMemo, useEffect, useState } from "react";

const COMLINK: {
  wrapped: any;
} = {
  wrapped: null,
};

export const useWrap = (targ: unknown) => {
  const [wrapped, setWrapped] = useState(false);

  useEffect(() => {
    if (COMLINK.wrapped === null) {
      console.log(targ);
      COMLINK.wrapped = Comlink.wrap(
        Comlink.windowEndpoint((targ as any).current.contentWindow as Window)
      );
    }
    setWrapped(true);
  }, [targ]);

  return useMemo(() => {
    if (wrapped && COMLINK.wrapped === null) {
      throw new Error("Wrapped is true but COMLINK.wrapped is null");
    } else {
      return COMLINK.wrapped;
    }
  }, [wrapped]);
};
