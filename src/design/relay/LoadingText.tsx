import styled from "styled-components";
import React from "react";
import { motion } from "framer-motion";

export const LoadingText = () => {
  return (
    <FlexRow>
      <LoadingCircle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 1.6,
          repeatType: "reverse",
        }}
      />
      <LoadingCircle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 1.2,
          repeatType: "reverse",
        }}
      />
      <LoadingCircle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 0.8,
          repeatType: "reverse",
        }}
      />
      <LoadingCircle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.6,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 0.4,
          repeatType: "reverse",
        }}
      />
      <LoadingCircle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 0,
          repeatType: "reverse",
        }}
      />
    </FlexRow>
  );
};

const FlexRow = styled.div`
  display: flex;
  height: 20px;
  align-items: flex-end;
`;

const LoadingCircle = styled(motion.div)`
  color: white;
  height: 5px;
  width: 5px;
  background: #c3c2c2;
  border-radius: 50%;
  margin-right: 2px;
`;
