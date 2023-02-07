import { FunctionComponent, useEffect, useRef } from "react";
import * as MenuMobile from "@/design/relay/MenuMobile";
import Image from "next/image";
import styled from "styled-components";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const MobileMenuComponent: FunctionComponent<{
  setShowMenu: (value: boolean) => void;
}> = ({ setShowMenu }) => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    // @ts-ignore
    disableBodyScroll(ref.current);

    // @ts-ignore
    return enableBodyScroll(ref.current);
  }, []);
  return (
    <MenuMobile.Overlay>
      <MenuMobile.Root
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={ref}
      >
        <FlexRowSpaceBetween style={{ padding: "0.5rem" }}>
          <MenuMobile.Logo />
          <Image
            onClick={() => {
              setShowMenu(false);
            }}
            src="/exit.svg"
            width={24}
            height={24}
            alt="close"
          />
        </FlexRowSpaceBetween>
        <MenuMobile.Products>Integrations</MenuMobile.Products>
        <MenuMobile.ProductButton
          as="a"
          href="https://airtable.com/shrD6Xv70iq7WDwoj"
          target="_blank"
          rel="noreferrer"
        >
          Join the Waitlist
        </MenuMobile.ProductButton>
        <MenuMobile.Products>Community</MenuMobile.Products>
        <MenuMobile.SocialItem
          as="a"
          href="https://discord.gg/relaycc"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </MenuMobile.SocialItem>
        <MenuMobile.SocialItem
          as="a"
          href="https://twitter.com/relay_eth"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </MenuMobile.SocialItem>
        <MenuMobile.SocialItem
          as="a"
          href="https://lenster.xyz/u/relay"
          target="_blank"
          rel="noreferrer"
        >
          Lens
        </MenuMobile.SocialItem>
        <MenuMobile.SocialItem
          as="a"
          href="https://mirror.xyz/relaycc.eth"
          target="_blank"
          rel="noreferrer"
        >
          Mirror
        </MenuMobile.SocialItem>
        <MenuMobile.SocialItem
          as="a"
          href="https://github.com/relaycc"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </MenuMobile.SocialItem>
        <MenuMobile.ConnectButton>Connect Wallet</MenuMobile.ConnectButton>
      </MenuMobile.Root>
    </MenuMobile.Overlay>
  );
};
const FlexRowSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export default MobileMenuComponent;
