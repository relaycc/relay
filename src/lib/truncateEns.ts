export const truncateEns = (ens: string) => {
  const prefix = ens.slice(0, ens.length - 4);
  const truncated = (() => {
    if (prefix.length < 16) {
      return prefix;
    } else {
      return prefix.slice(0, 12) + "...";
    }
  })();
  return `${truncated}.eth`;
};
