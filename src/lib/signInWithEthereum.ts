import { Signer } from "ethers";
import { getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";
import { Chain } from "wagmi";

export const signInWithEthereum = async (signer: Signer, chain: Chain) => {
  try {
    const callbackUrl = "/protected";
    const message = new SiweMessage({
      domain: window.location.host,
      address: await signer.getAddress(),
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId: chain?.id,
      nonce: await getCsrfToken(),
    });
    const signature = await signer.signMessage(message.prepareMessage());
    signIn("credentials", {
      message: JSON.stringify(message),
      redirect: false,
      signature,
      callbackUrl,
    });
  } catch (error) {
    // TODO Handle this error.
    console.error(error);
  }
};
