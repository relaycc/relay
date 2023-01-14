import Head from "next/head";
import { Receiver } from "@/components/Receiver";

export default function Home() {
  return (
    <>
      <Head>
        <title>Relay</title>
        <meta name="description" content="the Relay App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Receiver />
      </main>
    </>
  );
}
