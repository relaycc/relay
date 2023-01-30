const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;

export const IS_PRODUCTION_DEPLOYMENT = VERCEL_ENV === "production";

export const DOMAIN = (() => {
  // if (typeof VERCEL_URL !== "string" && IS_PRODUCTION_DEPLOYMENT) {
  //   throw new Error(
  //     "VERCEL_URL is not defined but IS_PRODUCTION_DEPLOYMENT is true"
  //   );
  // } else {
  return VERCEL_URL || "localhost:3000";
  // }
})();
