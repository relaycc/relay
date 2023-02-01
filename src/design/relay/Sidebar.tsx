import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { CATEGORIES, Project } from "@/lib/supabase/project";
import { CloseIcon } from "../CloseIcon";
import * as DirectoryHeader from "@/design/relay/DirectoryHeader";

const Root = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  background: #fff;
  height: 100vh;
  overflow-y: scroll;
  width: 220px;
  height: 100vh;
  padding: 1rem;
  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 21.6px;
`;

const DirectoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1;
`;

export const Sidebar: FunctionComponent<{
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  activeCategory: string;
  setActiveCategory: (category: Project["category"]) => void;
}> = ({ sidebar, setSidebar, activeCategory, setActiveCategory }) => {
  const closeSidebar = useCallback(() => {
    setSidebar(false);
  }, []);

  return (
    <AnimatePresence>
      {sidebar && (
        <>
          <Root
            initial={{ x: "100%" }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <Header>
              <Title>Categories</Title>
              <CloseIcon onClick={closeSidebar} />
            </Header>
            <DirectoryWrapper>
              {CATEGORIES.map((category) => {
                if (category === activeCategory) {
                  return (
                    <DirectoryHeader.MobileActive
                      key={category}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </DirectoryHeader.MobileActive>
                  );
                } else {
                  return (
                    <DirectoryHeader.MobileInactive
                      key={category}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </DirectoryHeader.MobileInactive>
                  );
                }
              })}
            </DirectoryWrapper>
          </Root>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            onClick={closeSidebar}
          />
        </>
      )}
    </AnimatePresence>
  );
};
