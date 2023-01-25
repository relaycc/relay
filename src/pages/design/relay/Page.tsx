import { FunctionComponent, ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Card } from "./Card";
import * as DirectoryHeader from "./DirectoryHeader";
import { Header } from "./Header";
import * as Showcase from "./Showcase"

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1440px;
`;

export interface Project {
  id: string;
  name: string;
  url: string;
  logo: string;
  handle: string | null;
  description: string;
  sort: number;
  category:
    | "general"
    | "new"
    | "venture"
    | "lens"
    | "identity"
    | "events"
    | "music"
    | "impactdao"
    | "defi"
    | "dao"
    | "zk"
    | "daotool"
    | "infrastructure";
};

export const Page: FunctionComponent<{
  children: ReactNode;
  navBar?: ReactNode;
  setCategory?: (category: Project["category"]) => unknown;
  category?: Project["category"];
}> = ({ children, navBar, setCategory, category }) => {
  const [width, setWidth] = useState(0);
  const showcaseRef = useRef();

  useEffect(()=>{
    showcaseRef.current && setWidth(showcaseRef.current.scrollWidth - showcaseRef.current.offsetWidth)
  }
);
  return (
    <Main>
      <Root>
        {navBar}
        <Header />
        <Showcase.Root ref={showcaseRef}>
          <Showcase.Slides
            drag='x'
            dragConstraints={{right: width , left: -width}}
          >
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </Showcase.Slides>
        </Showcase.Root>
        <DirectoryHeader.Root>
          <DirectoryHeader.Search.Search placeholder={"Search Directory"}/>
          <DirectoryHeader.Nav>
            <DirectoryHeader.Directories>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("general");
                }}
              >
                General
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("new");
                }}
              >
                New
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("venture");
                }}
              >
                Venture
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("lens");
                }}
              >
                Lens
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("music");
                }}
              >
                Music
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("events");
                }}
              >
                Events
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("infrastructure");
                }}
              >
                Infrastructure
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("impactdao");
                }}
              >
                ImpactDAO
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("identity");
                }}
              >
                Identity
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("dao");
                }}
              >
                DAO
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("defi");
                }}
              >
                DeFi
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("zk");
                }}
              >
                ZK
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  setCategory("daotool");
                }}
              >
                DAO Tools
              </DirectoryHeader.Directory>
            </DirectoryHeader.Directories>
          </DirectoryHeader.Nav>
        </DirectoryHeader.Root>
          {children}
      </Root>
    </Main>
  );
};
