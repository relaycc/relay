import { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  ContactCard,
  Page,
  LoadingCard,
  ConnectCard,
  HoverToggle,
  LogoCard,
  AppCard,
} from "components";
import { Intercom, Window, useLaunch, Launcher } from "@relaycc/receiver";
import { motion } from "framer-motion";
import {
  useWallet,
  useConversations,
  usePinnedAddresses,
  useConversationsPreviews,
  useClient,
  useEnsName,
  isEnsName,
  isEthAddress,
  useEnsAddress,
  useLensProfiles,
  useLensProfile,
  isLensName,
} from "@relaycc/receiver";
import { Message } from "@relaycc/xmtp-js";
import { useSigner, useAccount } from "wagmi";
import { NavBarConversations } from "../NavBarConversations";
import { popular } from "../../../public/popular";
import { sendRenderResult } from "next/dist/server/send-payload";
export interface Conversation {
  peerAddress: string;
  messages: Message[];
}
import { useRouter } from "next/router";

export const CardContainer = ({ handle }: { handle?: any }) => {
  const account = useAccount();
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
      handle={handle}
    />
  );
};

export const ConversationsView: FunctionComponent<{
  isLoading: boolean;
  isLoadingMore: boolean;
  conversations: Conversation[];
  handle: any;
}> = ({ isLoading, isLoadingMore, conversations, handle }) => {
  const { data: signer } = useSigner();
  const [, { data: client }] = useClient();
  const [category, setCategory] = useState(popular);
  const router = useRouter();
  const [addressToMessage, setAddressToMessage] = useState("seanwbren.eth");
  const launch = useLaunch();

  const onClickSendMessage = () => {
    if (isEthAddress(addressToMessage)) {
      console.log('clicked')
      console.log(addressToMessage)
      return () => launch(addressToMessage);
    } else {
      console.log(addressToMessage)

      console.log('clicked2')

      undefined;
    }
  };

  const account = useAccount();

  const ensAddress = useEnsAddress({
    handle,
  });

  const lensProfile = useLensProfile({
    handle,
  });

  const address = isEthAddress(handle)
    ? handle
    : isEthAddress(ensAddress.data)
    ? ensAddress.data
    : isEthAddress(lensProfile.data?.ownedBy)
    ? lensProfile.data?.ownedBy
    : undefined;
  const lensProfiles = useLensProfiles({
    handle: address,
  });
  const ensName = useEnsName({
    handle: isEthAddress(address) ? address : null,
  });
  const openInNewTab = (url: string) => {
    return () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };
  };
  const { data, isError } = useEnsName({
    handle: account.address,
  });

  return (
    <Page
      setCategory={setCategory}
      category={category}
      navBar={<NavBarConversations />}
    >
      {(() => {
        if (signer === null || signer === undefined) {
          return (
            <>
              {/* <ConnectCard /> */}
              {/* <div>First</div> */}
              {/* <button onClick={() => console.log(handle)}>click me</button>  */}
              {category.map((seed, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    {/* <HoverToggle
                      fadeOut={
                        <LogoCard
                          title={
                            seed.name === "ENS" && handle
                              ? handle
                              : seed.name === "Lens" && lensProfile.data
                              ? lensProfile.data
                              : seed.name
                          }
                          logo={seed.logo}
                          logoClassName={"scale-150 pt-4"}
                        />
                      } */}
                    {/* fadeIn={ */}
                    <AppCard
                      title={seed.name}
                      logo={seed.logo}
                      url={seed.url}
                      logoAlt="ENS Logo"
                      onClickLogo={openInNewTab(seed.url)}
                      logoClassName="scale-125"
                      linkOutText={seed.name}
                      handle={seed.handle}
                      setAddressToMessage={setAddressToMessage}
                      onClickSendMessage={onClickSendMessage}
                    />
                    {/* }
                    /> */}
                  </motion.div>
                );
              })}
            </>
          );
        } else {
          if (client === null || client === undefined) {
            return (
              <>
                {/* <button onClick={() => console.log(category[3].logo)}>
                  Click me
                </button>
                <div>Second</div> */}
                {/* <ConnectCard /> */}
                {category.map((seed, index) => {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {/* <HoverToggle
                        fadeOut={
                          <LogoCard
                            title={seed.name}
                            logo={seed.logo}
                            logoClassName={"scale-150 pt-4"}
                          />
                        } */}
                      {/* fadeIn={ */}
                      <AppCard
                        title={seed.name}
                        logo={seed.logo}
                        url={seed.url}
                        logoAlt="ENS Logo"
                        linkOutText={seed.name}
                        onClickLinkOut={
                          isEnsName(ensName.data)
                            ? openInNewTab(
                                "https://app.ens.domains/name/" + ensName.data
                              )
                            : undefined
                        }
                        onClickLogo={openInNewTab(seed.url)}
                        logoClassName="scale-125"
                        handle={seed.handle}
                        setAddressToMessage={setAddressToMessage}
                        onClickSendMessage={onClickSendMessage()}
                      />
                      {/* }
                      /> */}
                    </motion.div>
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
            } else
              return (
                <>
                  {/* <div>Third</div>
                <button onClick={() => console.log(lensProfile.data)}>
                    {ensName.data} click me
                  </button> */}
                  {category.map((seed, index) => {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {/* <HoverToggle
                          fadeOut={
                            <LogoCard
                              title={seed.name}
                              logo={seed.logo}
                              logoClassName={"scale-150 pt-4"}
                            />
                          }
                          fadeIn={ */}
                        <AppCard
                          title={seed.name}
                          logo={seed.logo}
                          url={seed.url}
                          handle={seed.handle}
                          logoAlt="ENS Logo"
                          // onClickLinkOut={
                          //   isEnsName(ensName.data)
                          //     ? openInNewTab(
                          //         "https://app.ens.domains/name/" +
                          //           ensName.data
                          //       )
                          //     : undefined
                          // }
                          onClickLogo={openInNewTab(seed.url)}
                          logoClassName="scale-125"
                          linkOutText={seed.name}
                          setAddressToMessage={setAddressToMessage}
                          onClickSendMessage={onClickSendMessage()}
                        />
                        {/* }
                        /> */}
                      </motion.div>
                    );
                  })}
                </>
              );
          }
        }
      })()}
      <Launcher peerAddress={addressToMessage} />
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
