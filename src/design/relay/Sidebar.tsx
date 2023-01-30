import React, { FunctionComponent } from "react";
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
  height: 100%;
  width: 220px;
  height: 100vh;
  padding: 1rem;
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

export const Sidebar: FunctionComponent<{
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  activeCategory: string;
  setActiveCategory: (category: Project["category"]) => void;
}> = ({ sidebar, setSidebar, activeCategory, setActiveCategory }) => {
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
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
            <Header>
              <Title>Categories</Title>
              <CloseIcon onClick={() => setSidebar(false)} />
            </Header>
            <DirectoryWrapper>
              {CATEGORIES.map((category) => {
                if (category === activeCategory) {
                  return (
                    <DirectoryHeader.MobileActive
                      onClick={() => setActiveCategory(category)}>
                      {category}
                    </DirectoryHeader.MobileActive>
                  );
                } else {
                  return (
                    <DirectoryHeader.MobileInactive
                      onClick={() => setActiveCategory(category)}>
                      {category}
                    </DirectoryHeader.MobileInactive>
                  );
                }
              })}
            </DirectoryWrapper>
          </Root>
        </>
      )}
    </AnimatePresence>
  );
};
