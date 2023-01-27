import { FunctionComponent, ReactNode, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import * as Icon from "./RobotIcons";

const Root = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 310px;
  height: 352px;
  cursor: grab;
  background-color: grey;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);

  position: relative;
`;

const CardLabel = styled.label`
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 27px;
  color: ${(props) => props.theme.colors.gray["900"]};
`;

const CardLabelWrapper = styled(motion.div)<{ textColor: string }>`
  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid ${(props) => props.textColor};
  margin-bottom: 1rem;

  ${CardLabel} {
    color: ${(props) => props.textColor};
  }
`;

interface CardProps {
  handleClick?: () => void;
  icon: ReactNode;
  initialBgColor: string;
  animateBgColor: string;
  textColor: string;
  company: string;
}

const Card: FunctionComponent<CardProps> = ({
  handleClick,
  icon,
  initialBgColor,
  animateBgColor,
  textColor,
  company,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Root
      onClick={handleClick}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      initial={{ backgroundColor: initialBgColor }}
      animate={
        isOpen
          ? {
              backgroundColor: initialBgColor,
            }
          : { backgroundColor: animateBgColor }
      }
    >
      {icon && icon}
      {isOpen && (
        <CardLabelWrapper
          textColor={textColor}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <CardLabel>
            {`Message the ${company}`}
            <span style={{ fontSize: "2rem" }}> 🤖</span>
          </CardLabel>
        </CardLabelWrapper>
      )}
    </Root>
  );
};

export const Lens = () => (
  <Card
    icon={<Icon.LensIcon />}
    company="Lens"
    textColor="#101828"
    initialBgColor="#ABFD2C"
    animateBgColor="#EFFFD6"
  />
);

export const Opensea = () => (
  <Card
    icon={<Icon.OpenseaIcon />}
    company="Opensea"
    textColor="#FFFFFF"
    initialBgColor="#2081E2"
    animateBgColor="#DCE3F9"
  />
);

export const Ens = () => (
  <Card
    icon={<Icon.Ens />}
    company="Ens"
    textColor="#FFFFFF"
    initialBgColor="#689EF6"
    animateBgColor="#D8DFFD"
  />
);

export const Poap = () => (
  <Card
    icon={<Icon.Poap />}
    company="Poap"
    textColor="#FFFFFF"
    initialBgColor="#9E6EF6"
    animateBgColor="#DDD6FF"
  />
);

export const Xmtp = () => (
  <Card
    icon={<Icon.Xmtp />}
    company="Xmtp"
    textColor="#FFFFFF"
    initialBgColor="#5A2895"
    animateBgColor="#E9D6FF"
  />
);

export const Lit = () => (
  <Card
    icon={<Icon.Lit />}
    company="Lit"
    textColor="#101828"
    initialBgColor="#ECA368"
    animateBgColor="#FBE9DB"
  />
);

export const Uniswap = () => (
  <Card
    icon={<Icon.Uniswap />}
    company="Uniswap"
    textColor="#FFFFFF"
    initialBgColor="#FE007A"
    animateBgColor="#FFD6EA"
  />
);

export const Alchemy = () => (
  <Card
    icon={<Icon.Alchemy />}
    company="Alchemy"
    textColor="#FFFFFF"
    initialBgColor="#4609FA"
    animateBgColor="#E1D7FE"
  />
);

export const Metamask = () => (
  <Card
    icon={<Icon.Metamask />}
    company="Metamask"
    textColor="#FFFFFF"
    initialBgColor="#233447"
    animateBgColor="#E4EAF2"
  />
);

export const Gitcoin = () => (
  <Card
    icon={<Icon.Gitcoin />}
    company="Gitcoin"
    textColor="#101828"
    initialBgColor="#63DCA2"
    animateBgColor="#DEF7EB"
  />
);

export const SushiSwap = () => (
  <Card
    icon={<Icon.SushiSwap />}
    company="SushiSwap"
    textColor="#FFFFFF"
    initialBgColor="#0E0F23"
    animateBgColor="#E2E3F3"
  />
);
