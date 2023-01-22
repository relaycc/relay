import { Signer } from "ethers";

const getSignatureFromLocalStorage = (message: string): string | undefined => {
  if (typeof window === "undefined") return undefined;

  try {
    const cachedJson = window.localStorage.getItem(
      `signature-cache-${message}`
    );
    if (cachedJson === null) {
      throw new Error("Signature cache missed!");
    } else {
      return JSON.parse(cachedJson);
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
const setCachedSignature = (message: string, signature: string) => {
  if (typeof window === "undefined") return undefined;
  window.localStorage.setItem(
    `signature-cache-${message}`,
    JSON.stringify(signature)
  );
};

export const createCachedSigner = (
  signer: Signer
): Signer & {
  signMessage: (message: string, skipCache?: boolean) => Promise<string>;
} => {
  const handler = {
    get(target: Signer, prop: keyof Signer) {
      if (prop === "signMessage" && typeof window !== undefined) {
        return async function (message: string) {
          const cachedSignature = getSignatureFromLocalStorage(message);
          if (cachedSignature) {
            return cachedSignature;
          } else {
            const signature = await target.signMessage(message);
            setCachedSignature(message, signature);
            return signature;
          }
        };
      } else {
        return target[prop];
      }
    },
  };

  return new Proxy(signer, handler);
};
