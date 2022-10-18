import { FunctionComponent, useEffect, useMemo } from "react";
import { ContactCard, Page, LoadingCard, ConnectCard } from "components";
import { Intercom, Window, useLaunch } from "@relaycc/receiver";
import { motion } from "framer-motion";
import {
  useWallet,
  useConversations,
  usePinnedAddresses,
  useConversationsPreviews,
  useClient,
} from "@relaycc/receiver";
import { Message } from "@relaycc/xmtp-js";
import { useSigner } from "wagmi";
import { NavBarConversations } from "../NavBarConversations";
import { useDevShortcut } from "hooks/useDevShortcut";

export interface Conversation {
  peerAddress: string;
  messages: Message[];
}

export const Conversations = () => {
  const pinnedAddresses = usePinnedAddresses();
  const conversations = useConversations();
  const pinnedPreviews = useConversationsPreviews(pinnedAddresses.data || []);
  const listedPreviews = useConversationsPreviews(
    conversations.data ? conversations.data.map((c) => c.peerAddress) : []
  );
  const pinnedIsLoading =
    pinnedAddresses.isLoading ||
    Boolean(pinnedPreviews.find((pq) => pq.isLoading));
  const isLoading =
    conversations.isLoading ||
    Boolean(listedPreviews.find((lq) => lq.isLoading));

  const conversationsProps: Conversation[] = useMemo(() => {
    const dataToProcess = (() => {
      if (isLoading === false) {
        return listedPreviews;
      } else if (pinnedIsLoading === false) {
        return pinnedPreviews;
      } else {
        return [];
      }
    })();

    return dataToProcess
      .filter((cp) => cp.data && cp.data.messages.length > 0)
      .map((cp) => cp.data)
      .sort((a, b) => {
        if (a === undefined) return 1;
        if (b === undefined) return -1;
        if (a.messages[0] === undefined) return 1;
        if (b.messages[0] === undefined) return -1;
        if (a.messages[0].sent === undefined) return 1;
        if (b.messages[0].sent === undefined) return 1;
        return a.messages[0].sent.getTime() < b.messages[0].sent.getTime()
          ? 1
          : -1;
      }) as Conversation[];
  }, [isLoading, pinnedIsLoading, pinnedPreviews, listedPreviews]);

  return (
    <ConversationsView
      isLoading={isLoading && (pinnedIsLoading || pinnedPreviews.length === 0)}
      isLoadingMore={isLoading && !pinnedIsLoading}
      conversations={conversationsProps}
    />
  );
};

export const ConversationsView: FunctionComponent<{
  isLoading: boolean;
  isLoadingMore: boolean;
  conversations: Conversation[];
}> = ({ isLoading, isLoadingMore, conversations }) => {
  const { data: signer } = useSigner();
  const [, { data: client }] = useClient();

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
          if (client === null || client === undefined) {
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
            if (isLoading) {
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
              return conversations.map((m, i) => {
                return (
                  <motion.div
                    key={m.peerAddress}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <ContactCard address={m.peerAddress} />
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
