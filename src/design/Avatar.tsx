import styled, { css } from "styled-components";
import Blockies from "react-blockies";
import { motion } from "framer-motion";

const avatar = css`
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const sm = css`
  height: 25px;
  width: 25px;
`;

const md = css`
  height: 40px;
  width: 40px;
`;

const lg = css`
  height: 50px;
  width: 50px;
`;

const xl = css`
  border-radius: 1rem;
  height: 75px;
  width: 75px;
`;

const xxxl = css`
  height: 120px;
  width: 120px;
`;

export const AvatarXl = styled(motion.img)`
  ${avatar};
  ${xl};
`;

export const Avatar3Xl = styled(motion.img)`
  ${avatar};
  ${xxxl};
`;

export const AvatarLg = styled(motion.img)`
  ${avatar};
  ${lg};
`;

export const AvatarSm = styled(motion.img)`
  ${avatar};
  ${sm};
`;

export const AvatarMd = styled(motion.img)`
  ${avatar};
  ${md};
`;

export const BlockieSm = styled(Blockies)`
  ${avatar};
  ${md};
`;

export const BlockieMd = styled(Blockies)`
  ${avatar};
  ${md};
`;

export const BlockieLg = styled(Blockies)`
  ${avatar};
  ${lg};
`;

export const BlockieXl = styled(Blockies)`
  ${avatar};
  ${xl};
`;

export const Blockie3Xl = styled(Blockies)`
  ${avatar};
  ${xxxl};
`;
