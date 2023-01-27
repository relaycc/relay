import { motion } from "framer-motion";
import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  align-items: center;
  max-width: 1392px;
  padding: 24px 0;
  border-radius: 16px;
  justify-content: center;
  background: ${(props) => props.theme.colors.gray["25"]};
  margin-top: 3rem;
  margin-bottom: 3rem;
  overflow: hidden;

  svg {
    min-width: 40px;
  }
`;

export const MotionRoot = styled(motion.div)`
  overflow: hidden;
`;

export const Slides = styled(motion.div)`
  display: flex;
  gap: 18px;
  background: ${(props) => props.theme.colors.gray["25"]};
  overflow: visible;
`;

export const Wrapper = styled.div`
  position: absolute;
  left: 2%;
  right: 2%;
  top: 336px;
`;

export const InnerWrapper = styled.div`
  position: relative;
  z-index: 0;
`;

export const Ellipse = styled.div`
  position: absolute;
  width: 1416px;
  height: 374px;
  top: 12.03%;
  bottom: -5.76%;
  background: linear-gradient(
    87.55deg,
    rgba(69, 14, 129, 0.8) 1.77%,
    rgba(67, 15, 132, 0.8) 10.93%,
    rgba(61, 18, 140, 0.8) 20.1%,
    rgba(50, 23, 152, 0.8) 29.27%,
    rgba(35, 31, 165, 0.8) 38.43%,
    rgba(40, 63, 179, 0.8) 47.6%,
    rgba(51, 103, 192, 0.8) 56.77%,
    rgba(69, 142, 198, 0.8) 65.93%,
    rgba(90, 170, 197, 0.8) 75.1%,
    rgba(107, 187, 198, 0.8) 84.27%,
    rgba(117, 197, 199, 0.8) 93.43%,
    rgba(121, 199, 198, 0.8) 102.6%
  );
  filter: blur(100px);
  z-index: -1;
`;
