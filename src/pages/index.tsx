import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useSigner } from "wagmi";
import { useXmtpClient } from "@relaycc/xmtp-hooks";

export default function Home() {
  return (
    <>
      <Head>
        <title>Relay</title>
        <meta name="description" content="the Relay App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
