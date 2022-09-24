import { FunctionComponent } from "react";
import { Page } from "./Page";
import { ProfileCardRelay } from "./ProfileCardRelay";
import { Window, useIsOpen } from "@relaycc/receiver";
import { motion } from "framer-motion";
import { ProfileCardLoading } from "components";

export interface PageDynamicProps {
  isLoading?: boolean;
  addresses: string[];
}
export const PageDynamic: FunctionComponent<PageDynamicProps> = ({
  isLoading,
  addresses,
}) => {
  const isOpen = useIsOpen();
  return (
    <Page>
      {isLoading &&
        mappable(20).map((n) => {
          return (
            <ProfileCardLoading
              key={n}
              shouldPulse={true}
              topRightImgUrl={"/Relay.png"}
            />
          );
        })}
      {isLoading ||
        addresses.map((address, i) => {
          return (
            <motion.div
              key={address}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              <ProfileCardRelay address={address} />
            </motion.div>
          );
        })}
      {isOpen && (
        <motion.div
          drag
          dragMomentum={false}
          className="absolute bottom-[300px] right-0 rounded-3xl overflow-hidden border-[4px] border-black"
        >
          <Window />
        </motion.div>
      )}
    </Page>
  );
};

const mappable = (n: number): number[] => {
  const result = [];
  for (; result.length <= n; result.push(result.length));
  return result;
};
