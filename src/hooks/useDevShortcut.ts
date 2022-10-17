import { Wallet } from "ethers";
import { useLaunch, useClient, useWallet } from "@relaycc/receiver";
import { useEffect } from "react";

const wallet =
  process.env.NODE_ENV === "development" &&
  typeof process.env.NEXT_PUBLIC_TEST_PK === "string"
    ? new Wallet(process.env.NEXT_PUBLIC_TEST_PK)
    : undefined;

const launchTarget = process.env.NEXT_PUBLIC_LAUNCH_TARGET || undefined;

let launchedOnce = false;

export const useDevShortcut = () => {
  const [recWallet, setWallet] = useWallet();
  const [signIn, client] = useClient();
  const launch = useLaunch();

  useEffect(() => {
    if (wallet !== undefined && wallet !== null) {
      console.log("Setting wallet in dev shortcut");
      setWallet(wallet);
    }
  }, [setWallet]);

  useEffect(() => {
    if (
      launchedOnce === false &&
      client.data !== null &&
      client.data !== undefined
    ) {
      console.log("Launching in dev shortcut");
      launchedOnce = true;
      launch();
    }
  }, [client, launch]);

  useEffect(() => {
    if (recWallet !== undefined && recWallet !== null) {
      console.log("Signing in in dev shortcut");
      signIn();
    }
  }, [recWallet, signIn]);
};
