import { motion } from "framer-motion";
import styled from "styled-components";

export const Root = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1392px;
  padding: 24px 48px;
  border-radius: 16px;
  justify-content: center;
  position: relative;
`;

export const Slides = styled(motion.div)`
  display: flex;
  gap: 18px;
`;
