import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

export const LoaderAnimInitialization = () => {
  return (
    <FixedSizeDiv
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        repeatDelay: 0,
        ease: "linear",
      }}
    >
      <Spinner src="/loader-green.png" alt="loader" width={24} height={24} />
    </FixedSizeDiv>
  );
};

const FixedSizeDiv = styled(motion.div)`
  height: 24px;
  width: 24px;
  padding: 0;
`;

const Spinner = styled(Image)`
  height: 24px;
  width: 24px;
`;
