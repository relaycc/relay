import { FunctionComponent, ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as Card from "./Card";
import * as DirectoryHeader from "./DirectoryHeader";
import { Header } from "./Header";
import * as Showcase from "./Showcase";
import * as Chevron from "./Chevron";
import { RobotLensIcon } from "./RobotLensIcon";
import { CardLens } from "./CardLens";
import Footer from "./Footer";
import { Logomark } from "./Logo";
import { CardsWrapper, DirectoryCard } from "./DirectoryCard";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  overflow: hidden;
`;

const ShowcaseWrapper = styled.div`
  position: absolute;
  top: 336px;
`

const ShowcaseInnerWrapper = styled.div`
  position: relative;
  z-index: 0;
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
    showcaseRef?.current && setWidth(showcaseRef.current.scrollWidth - showcaseRef.current.offsetWidth)
  }, []);

  return (
    <Main>
      <Root>
        {navBar}
        <Header />
        <ShowcaseWrapper>
          <ShowcaseInnerWrapper>
            <Showcase.Root>
              <Chevron.ChevronLeftActive />
              <Showcase.MotionRoot ref={showcaseRef}>
                <Showcase.Slides
                  drag='x'
                  dragConstraints={{right: 0 , left: -width}}
                >
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                  <CardLens/>
                </Showcase.Slides>
              </Showcase.MotionRoot>
              <Chevron.ChevronRightActive />
            </Showcase.Root>
            <Showcase.Ellipse/>
          </ShowcaseInnerWrapper>
        </ShowcaseWrapper>
        <DirectoryHeader.Root>
          <DirectoryHeader.Title>
            Directory
          </DirectoryHeader.Title>
          <DirectoryHeader.Search.Search placeholder={"Search Directory"}/>
          <DirectoryHeader.Nav>
            <DirectoryHeader.Directories>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("general");
                }}
              >
                General
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("new");
                }}
              >
                New
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("venture");
                }}
              >
                Venture
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("lens");
                }}
              >
                Lens
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("music");
                }}
              >
                Music
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("events");
                }}
              >
                Events
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("infrastructure");
                }}
              >
                Infrastructure
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("impactdao");
                }}
              >
                ImpactDAO
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("identity");
                }}
              >
                Identity
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("dao");
                }}
              >
                DAO
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("defi");
                }}
              >
                DeFi
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("zk");
                }}
              >
                ZK
              </DirectoryHeader.Directory>
              <DirectoryHeader.Directory
                onClick={() => {
                  //setCategory("daotool");
                }}
              >
                DAO Tools
              </DirectoryHeader.Directory>
            </DirectoryHeader.Directories>
          </DirectoryHeader.Nav>

          {/* Cards starting here */}
          <CardsWrapper>
            <DirectoryCard/>
          </CardsWrapper>
        </DirectoryHeader.Root>
          {children}
        <Footer/>
      </Root>
    </Main>
  );
};
