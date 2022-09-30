import { motion, AnimatePresence } from "framer-motion";
import React, { ReactNode, FunctionComponent, useState } from "react";

const VARIANTS = {
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
};

export interface HoverToggleProps {
  fadeIn: ReactNode;
  fadeOut: ReactNode;
}

export const HoverToggle: FunctionComponent<HoverToggleProps> = ({
  fadeIn,
  fadeOut,
}) => {
  const [showLogo, setShowLogo] = useState<boolean>(true);

  return (
    <motion.div
      onHoverStart={() => setShowLogo(false)}
      onHoverEnd={() => setShowLogo(true)}
      className="relative min-w-max"
      whileHover="hover"
    >
      <motion.div
        initial={VARIANTS.hide}
        variants={{ hover: VARIANTS.show }}
        exit={{ opacity: 0 }}
      >
        {fadeIn}
      </motion.div>
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={VARIANTS.hide}
            animate={VARIANTS.show}
            variants={{ hover: VARIANTS.hide }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0"
          >
            {fadeOut}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
