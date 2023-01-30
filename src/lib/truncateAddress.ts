export const truncateAddress = (address: string, prefixLength?: number) =>
  address.slice(0, prefixLength || 6) + "..." + address.slice(-4);
