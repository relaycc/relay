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
      return fetchEnsName(handle);
    },
    { enabled: wait !== false }
  );
};

export const fetchEnsName = async (handle?: string | null) => {
  if (!isEthAddress(handle)) {
    return null;
  } else {
    return alchemyProvider.lookupAddress(handle);
  }
};
