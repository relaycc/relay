import { usePlausible } from "next-plausible";
import { useCallback } from "react";

export const useShowcaseClick = () => {
  const plausible = usePlausible();

  return useCallback(
    (robot: string) => {
      plausible("showcaseClick", { props: { robot } });
    },
    [plausible]
  );
};
