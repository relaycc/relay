import { FunctionComponent, ReactNode, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
export * from "./RobotIcons";

const Root = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 352px;
  min-width: 252px;
  height: 330px;
  cursor: pointer;
  background-color: grey;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
  position: relative;
`;

interface CardProps {
  handleClick?: () => void;
  icon: ReactNode;
  initialBgColor: string;
  animateBgColor: string;
}

export const Card: FunctionComponent<CardProps> = ({
  handleClick,
  icon,
  initialBgColor,
  animateBgColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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
      {isOpen && (
        <RobotIcon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          🤖
        </RobotIcon>
      )}
      {icon && icon}
    </Root>
  );
};

const RobotIcon = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  line-height: 2rem;
  top: 1rem;
  right: 1rem;
`;
