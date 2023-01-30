import { FunctionComponent, ReactNode } from "react";
import BasePlausibleProvider from "next-plausible";
import { IS_PRODUCTION_DEPLOYMENT, DOMAIN } from "@/lib/vercel";

export const PlausibleProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  console.log("ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);
  console.log("URL", process.env.NEXT_PUBLIC_VERCEL_URL);
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
