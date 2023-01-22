import { useQuery } from "@tanstack/react-query";
import { isEthAddress } from "@relaycc/xmtp-hooks";
import { alchemyProvider } from "@/lib/alchemyProvider";
import { isEnsName } from "@/lib/isEnsName";

export const useEnsAvatar = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  return useQuery(
    ["ens avatar", handle],
    async () => {
      if (!isEthAddress(handle) && !isEnsName(handle)) {
        return null;
      } else {
        return alchemyProvider.getAvatar(handle);
      }
    },
    { enabled: wait !== false }
  );
};
