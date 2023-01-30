import { FunctionComponent, ReactNode } from "react";
import BasePlausibleProvider from "next-plausible";
import { IS_PRODUCTION_DEPLOYMENT, DOMAIN } from "@/lib/vercel";

export const PlausibleProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <BasePlausibleProvider
      domain={DOMAIN}
      enabled={IS_PRODUCTION_DEPLOYMENT}
      trackOutboundLinks={true}
    >
      {children}
    </BasePlausibleProvider>
  );
};
