import { FunctionComponent, ReactNode } from "react";
import PlausibleProvider from "next-plausible";
import { IS_PRODUCTION_DEPLOYMENT, PRODUCTION_DOMAIN } from "lib/vercel";

export const Provider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  console.log("IS_PRODUCTION_DEPLOYMENT", IS_PRODUCTION_DEPLOYMENT);
  return (
    <PlausibleProvider
      domain={PRODUCTION_DOMAIN}
      enabled={IS_PRODUCTION_DEPLOYMENT}
      trackOutboundLinks={true}
    >
      {children}
    </PlausibleProvider>
  );
};
