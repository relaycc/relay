import { FunctionComponent, useEffect } from "react";
import { ContactCard, Page, LoadingCard, ConnectCard } from "components";
import { Intercom, Window, useLaunch } from "@relaycc/receiver";
import { motion } from "framer-motion";
import {
  useRelay,
  useSetWallet,
  byMostRecentMessage,
  pickPeerAddress,
} from "@relaycc/receiver";
import { useSigner } from "wagmi";
import { NavBarConversations } from "../NavBarConversations";

export const Conversations: FunctionComponent = () => {
  const { data: signer } = useSigner();
  const dispatch = useRelay((state) => state.dispatch);
  const conversations = useRelay((state) => state.channels.conversationList);
  const client = useRelay((state) => state.client);
  const setWallet = useSetWallet();

  useEffect(() => {
    if (signer) {
      setWallet(signer);
    }
  }, [signer, setWallet]);

  useEffect(() => {
    if (client !== null) {
      dispatch({ id: "load conversation list" });
    }
  }, [dispatch, client]);

  return (
    <Page navBar={<NavBarConversations />}>
      {(() => {
        if (signer === null || signer === undefined) {
          return (
            <>
              <ConnectCard />
              {seeds.map((seed) => {
                return (
                  <div key={seed} className="opacity-25">
                    <ContactCard display="Connect Wallet" address={seed} />
                  </div>
                );
              })}
            </>
          );
        } else {
          if (client === null) {
            return (
              <>
                <ConnectCard />
                {seeds.map((seed) => {
                  return (
                    <div key={seed} className="opacity-25">
                      <ContactCard address={seed} display="Sign In" />
                    </div>
                  );
                })}
              </>
            );
          } else {
            if (conversations === undefined) {
              return seeds.map((seed) => {
                return (
                  <LoadingCard
                    key={seed}
                    shouldPulse={true}
                    topRightImgUrl={"/Relay.png"}
                  />
                );
              });
            } else {
              return byMostRecentMessage(conversations)
                .map((m) => m)
                .reverse()
                .map((m, i) => {
                  return (
                    <motion.div
                      key={pickPeerAddress(client.address, m)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <ContactCard
                        address={pickPeerAddress(client.address, m)}
                      />
                    </motion.div>
                  );
                });
            }
          }
        }
      })()}
      <Intercom>
        <Window />
      </Intercom>
    </Page>
  );
};

const seeds = [
  "0.9142365860355453",
  "0.5091300866313471",
  "0.5669975819868298",
  "0.6544793703108542",
  "0.6627294228904121",
  "0.48941787492002153",
  "0.8323082277448901",
  "0.09801651829318514",
  "0.54591204387399",
  "0.01140439674483451",
  "0.5925544462399306",
  "0.6939419950760668",
  "0.776608682611154",
  "0.543414525090065",
  "0.2759931051770037",
  "0.06812237471659288",
  "0.5946200305712659",
  "0.34586666807893063",
  "0.9294989486650427",
  "0.9233877917183064",
  "0.31400090434550076",
];
