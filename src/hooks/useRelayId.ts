import { useMemo } from "react";
import { isEnsName } from "@/lib/isEnsName";
import { isEthAddress } from "@relaycc/xmtp-hooks";
import { useAddressFromEns } from "./useAddressFromEns";
import { useEnsName } from "./useEnsName";

export const useRelayId = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  const addressFromEns = useAddressFromEns({ handle, wait });
  const ensNameFromAddress = useEnsName({ handle, wait });

  const address = useMemo(() => {
    if (isEthAddress(handle)) {
      return {
        isLoading: false,
        isError: false,
        isFetching: false,
        data: handle,
      };
    } else if (isEnsName(handle)) {
      return addressFromEns;
    } else {
      return {
        isError: true,
        isLoading: false,
        isFetching: false,
        data: undefined,
      };
    }
  }, [addressFromEns, handle]);

  const ens = useMemo(() => {
    if (isEthAddress(handle)) {
      return ensNameFromAddress;
    } else if (isEnsName(handle)) {
      return {
        ...addressFromEns,
        data: addressFromEns.data === undefined ? undefined : handle,
      };
    } else {
      return {
        isError: true,
        isLoading: false,
        isFetching: false,
        data: undefined,
      };
    }
  }, [addressFromEns, ensNameFromAddress, handle]);

  return {
    ens,
    address,
  };
};
