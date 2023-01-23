export const isEnsName = (handle?: string | null): handle is string => {
  return (
    typeof handle === "string" && handle.length > 7 && handle.endsWith(".eth")
  );
};
