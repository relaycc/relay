import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ButtonPrimary } from "./ButtonPrimary";
import { ButtonSecondary } from "./ButtonSecondary";
import { ChatIcon } from "./ChatIcon";
import { ExternalLinkIcon } from "./ExternalLinkIcon";
import Image from "next/image";
import { textXsMedium, textSmallRegular } from "../typography";
import { type } from "os";
import { isEnsName } from "@/lib/isEnsName";
import { EthAddress, isEthAddress } from "@relaycc/xmtp-hooks";
import { useRelayId } from "@/hooks/useRelayId";
import { useGoToDm, useReceiverWindow } from "@/hooks/useReceiverWindow";
import { useInView } from "@/hooks/useInView";

const Description = styled(motion.p)`
  display: flex;
  ${textSmallRegular}
  color: ${(p) => p.theme.colors.gray["500"]};
  margin-top: 1rem;
`;

const CardTitle = styled(motion.div)`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-align: left;
  line-height: 29px;
  color: ${(props) => props.theme.colors.gray["900"]};
`;

export const CardsWrapper = styled(motion.div)`
  width: 100%;
  gap: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DescriptionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Category = styled.div`
  ${textXsMedium}
  background-color: ${(p) => p.theme.colors.primary["100"]};
  color: ${(p) => p.theme.colors.primary["700"]};
  border-radius: 1rem;
  height: 22px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-self: flex-end;
`;

export const DirectoryCard = ({
  logo,
  delay,
  name,
  description,
  category,
  url,
  handle,
}: {
  name: string;
  logo: string;
  delay?: number;
  description?: string;
  category: string;
  url: string;
  handle?: string | null;
}) => {
  const goToDm = useGoToDm();
  const ref = useRef<HTMLDivElement>(null);
  const id = useRelayId({ handle });

  return (
    <Root
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay || 0 }}
    >
      <DescriptionRoot
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <DescriptionHeader>
          <CardTitle>{name}</CardTitle>
          <Image
            src={sanitizeLogo(logo)}
            width={64}
            height={64}
            alt="logo"
            style={{ borderRadius: "4px" }}
          />
        </DescriptionHeader>
        <Category>{category}</Category>
        <Description>{description}</Description>
        <FlexRow style={{ marginTop: "auto" }}>
          <ButtonSecondary
            as="a"
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ marginRight: "11px", width: "91px" }}
          >
            <ExternalLinkIcon />
            Visit
          </ButtonSecondary>
          <ButtonPrimary
            onClick={() => {
              goToDm({ peerAddress: id.address.data as EthAddress });
            }}
            disabled={typeof id.address.data !== "string"}
          >
            <ChatIcon />
            Message
          </ButtonPrimary>
        </FlexRow>
      </DescriptionRoot>
    </Root>
  );
};

const Root = styled(motion.div)`
  width: 252px;
  height: 330px;
  padding: 14px;
  background: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.gray["200"]};
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  position: relative;
`;

const DescriptionRoot = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const sanitizeLogo = (logo: string) => {
  if (logo.startsWith("/")) {
    return logo;
  } else {
    return "/" + logo;
  }
};

const isLensName = (name: unknown) => {
  if (typeof name !== "string") {
    return false;
  }
  return name.endsWith(".lens") && name.length > 10;
};
