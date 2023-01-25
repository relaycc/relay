import { useQuery } from '@tanstack/react-query';
import { alchemyProvider } from '@/lib/alchemyProvider';
import { isEnsName } from '@/lib/isEnsName';
import { getAddress } from 'ethers/lib/utils.js';

export const useAddressFromEns = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  return useQuery(
    ['address from ens', handle],
    async () => {
      if (!isEnsName(handle)) {
        return null;
      } else {
        const fetchedAddress = await alchemyProvider.resolveName(handle);
        if (fetchedAddress === null) {
          return null;
        } else {
          return getAddress(fetchedAddress);
        }
      }
    },
    { enabled: wait !== false }
  );
};
