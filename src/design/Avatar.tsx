import styled, { css } from 'styled-components';
import Blockies from 'react-blockies';
import { motion } from 'framer-motion';

const avatar = css`
  border-radius: 50%;
  overflow: hidden;
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

export const AvatarXl = styled(motion.img)`
  ${avatar};
  ${xl};
`;

export const AvatarLg = styled(motion.img)`
  ${avatar};
  ${lg};
`;

export const AvatarSm = styled(motion.img)`
  ${avatar};
  ${md};
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
