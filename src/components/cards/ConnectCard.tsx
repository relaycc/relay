import { Card } from "./Card";
import { Header } from "./Header";
import { FunctionComponent } from "react";
import { DataRow } from "./DataRow";
import { useSigner } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useLaunch } from "@relaycc/receiver";
import { useRouter } from "next/router";

export const ConnectCard: FunctionComponent = () => {
  const { data: signer } = useSigner();
  const launch = useLaunch();
  const connect = useConnectModal();
  const router = useRouter();
  const isConnected = Boolean(signer);

  return (
    <Card>
      <Header text="Relay">
        <button
          onClick={() => router.push("/")}
          className="btn btn-ghost flex justify-center items-center p-2 bg-white w-[5rem] h-[5rem] rounded-md"
        >
          {/* eslint-disable-next-line */}
          <img
            src={"/Relay.png"}
            alt={"Relay Logo"}
            className={`h-[4rem] w-[4rem]`}
          />
        </button>
      </Header>
      <DataRow
        className={`mt-auto ${isConnected ? "btn-disabled" : "bg-secondary"}`}
        onClick={
          connect.openConnectModal ? connect.openConnectModal : undefined
        }
      >
        Connect a Wallet
      </DataRow>
      <DataRow
        className={`${!isConnected ? "btn-disabled" : "bg-secondary"}`}
        onClick={!isConnected ? undefined : launch}
      >
        Sign In To XMTP
      </DataRow>
    </Card>
  );
};
