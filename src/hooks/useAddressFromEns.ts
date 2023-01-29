import { useQuery } from "@tanstack/react-query";
import { alchemyProvider } from "@/lib/alchemyProvider";
import { isEnsName } from "@/lib/isEnsName";
import { getAddress } from "ethers/lib/utils.js";

export const useAddressFromEns = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  return useQuery(
    ["address from ens", handle],
    async () => {
      return fetchAddressFromEns(handle);
    },
    { enabled: wait !== false }
  );
};

export const fetchAddressFromEns = async (ensName?: string | null) => {
  if (!isEnsName(ensName)) {
    return null;
  } else {
    return alchemyProvider.resolveName(ensName);
  }
};
