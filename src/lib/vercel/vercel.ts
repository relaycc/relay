export const PRODUCTION_DOMAIN = "relay.cc";

export const IS_PRODUCTION_DEPLOYMENT =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
