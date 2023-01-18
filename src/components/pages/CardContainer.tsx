import { FunctionComponent, useState } from "react";
import { Page, AppCard } from "components";
import { Intercom, Receiver, useLaunch, Launcher } from "@relaycc/receiver";
import { motion } from "framer-motion";
import { useEnsName, isEthAddress } from "@relaycc/receiver";
import { Message } from "@relaycc/xmtp-js";
import { useAccount } from "wagmi";
import { NavBarConversations } from "../NavBarConversations";
import { Project } from "lib";
import { useRouter } from "next/router";
export interface Conversation {
  peerAddress: string;
  messages: Message[];
}

export const CardContainer: FunctionComponent<{
  projects: Project[];
}> = ({ projects }) => {
  const router = useRouter();
  const category = (router.query.category || "general") as Project["category"];
  const setCategory = (category: Project["category"]) =>
    router.push(`/${category}`);
  const projectsToDisplay = projects.filter(
    (project) => project.category === category
  );
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
      {projectsToDisplay.map((seed, index) => {
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
              handle={seed.handle || ""}
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
      <Launcher peerAddress={addressToMessage} />
      <Intercom>
        <Receiver />
      </Intercom>
    </Page>
  );
};
