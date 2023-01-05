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
import { Intercom, Receiver, useLaunch, Launcher } from "@relaycc/receiver";
import { motion } from "framer-motion";
import {
  useWallet,
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
  return <ConversationsView handle={handle} />;
};

export const ConversationsView: FunctionComponent<{
  handle: any;
}> = ({ handle }) => {
  const { data: signer } = useSigner();
  const [category, setCategory] = useState(popular);
  const router = useRouter();
  const [addressToMessage, setAddressToMessage] = useState("seanwbren.eth");
  const launch = useLaunch();

  const onClickSendMessage = () => {
    if (isEthAddress(addressToMessage)) {
      return () => launch(addressToMessage);
    } else return;
  };

  const handleAddressSearch = (e: string) => {
    setAddressToMessage(e);
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
      navBar={<NavBarConversations handleAddressSearch={handleAddressSearch} />}
    >
      {(() => {
        if (signer === null || signer === undefined) {
          return (
            <>
              {category.map((seed, index) => {
                return (
                  <motion.div
                    key={seed.name + category + index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.025 * index }}
                  >
                    <AppCard
                      title={seed.name}
                      logo={seed.logo}
                      url={seed.url}
                      description={seed.description}
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
          return (
            <>
              {category.map((seed, index) => {
                return (
                  <motion.div
                    key={seed.name + category + index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.025 * index }}
                  >
                    <AppCard
                      description={seed.description}
                      title={seed.name}
                      logo={seed.logo}
                      url={seed.url}
                      handle={seed.handle}
                      logoAlt="ENS Logo"
                      onClickLogo={openInNewTab(seed.url)}
                      logoClassName="scale-125"
                      linkOutText={seed.name}
                      setAddressToMessage={setAddressToMessage}
                      onClickSendMessage={onClickSendMessage()}
                    />
                  </motion.div>
                );
              })}
            </>
          );
        }
      })()}
      <Launcher peerAddress={addressToMessage} />
      <Intercom>
        <Receiver />
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
