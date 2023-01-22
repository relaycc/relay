import { useQuery } from "@tanstack/react-query";
import { isEthAddress } from "@relaycc/xmtp-hooks";
import { alchemyProvider } from "@/lib/alchemyProvider";

export const useEnsName = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  return useQuery(
    ["ens name", handle],
    async () => {
      if (!isEthAddress(handle)) {
        return null;
      } else {
        return alchemyProvider.lookupAddress(handle);
      }
    },
    { enabled: wait !== false }
  );
};
