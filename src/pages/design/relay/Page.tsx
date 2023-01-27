import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import * as Card from "./Card";
import * as DirectoryHeader from "./DirectoryHeader";
import { Header } from "./Header";
import * as Showcase from "./Showcase";
import * as Chevron from "./Chevron";
import Footer from "./Footer";
import { CardsWrapper, DirectoryCard } from "./DirectoryCard";
import { Logo } from "@/pages/design/relay/Logo";
import { NavLink } from "@/pages/design/relay/LinkProducts";
import { LinkCommunity } from "@/pages/design/relay/LinkCommunity";
import { IconGithub } from "@/pages/design/relay/IconGithub";
import { PrimaryButton } from "@/pages/design/relay/ButtonPrimary";

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
  position: relative;
  overflow: hidden;
`;

const ShowcaseWrapper = styled.div`
  position: absolute;
  left: 2%;
  right: 2%;
  top: 336px;
`;

const ShowcaseInnerWrapper = styled.div`
  position: relative;
  z-index: 0;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
`;

const NavInnerWrapper = styled.div`
  display: flex;
  gap: 24px;
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
}

export const Page: FunctionComponent<{
  children: ReactNode;
  navBar?: ReactNode;
  setCategory?: (category: Project["category"]) => unknown;
  category?: Project["category"];
}> = ({ children, navBar, setCategory, category }) => {
  const [width, setWidth] = useState(0);
  const showcaseRef = useRef();

  useEffect(() => {
    showcaseRef?.current &&
      setWidth(
        showcaseRef.current.scrollWidth - showcaseRef.current.offsetWidth
      );
  }, []);

  return (
    <Main>
      <Root>
        {navBar}
        <NavWrapper>
          <Logo />
          <NavInnerWrapper>
            <NavLink />
            <LinkCommunity />
            <IconGithub />
            <PrimaryButton>Address</PrimaryButton>
          </NavInnerWrapper>
        </NavWrapper>
        <Header />
        <ShowcaseWrapper>
          <ShowcaseInnerWrapper>
            <Showcase.Root>
              <Chevron.ChevronLeftActive />
              <Showcase.MotionRoot ref={showcaseRef}>
                <Showcase.Slides
                  drag="x"
                  dragConstraints={{ right: 0, left: -width }}
                >
                  <Card.Lens />
                  <Card.Opensea />
                  <Card.Ens />
                  <Card.Poap />
                  <Card.Xmtp />
                  <Card.Lit />
                  <Card.Uniswap />
                  <Card.Alchemy />
                  <Card.Metamask />
                  <Card.Gitcoin />
                  <Card.SushiSwap />
                </Showcase.Slides>
              </Showcase.MotionRoot>
              <Chevron.ChevronRightActive />
            </Showcase.Root>
            <Showcase.Ellipse />
          </ShowcaseInnerWrapper>
        </ShowcaseWrapper>
        <DirectoryHeader.Root>
          <DirectoryHeader.Title>Directory</DirectoryHeader.Title>
          <DirectoryHeader.Search.Search placeholder={"Search Directory"} />
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
            <DirectoryCard />
          </CardsWrapper>
        </DirectoryHeader.Root>
        {children}
        <Footer />
      </Root>
    </Main>
  );
};
