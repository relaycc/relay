import Head from "next/head";
import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import * as Card from "@/design/relay/Card";
import * as DirectoryHeader from "@/design/relay/DirectoryHeader";
import { Header } from "@/design/relay/Header";
import * as Chevron from "@/design/relay/Chevron";
import Footer from "@/design/relay/Footer";
import { CardsWrapper, DirectoryCard } from "@/design/relay/DirectoryCard";
import { Logo } from "@/design/relay/Logo";
import { NavLink } from "@/design/relay/LinkProducts";
import { LinkCommunity } from "@/design/relay/LinkCommunity";
import { IconGithub } from "@/design/relay/IconGithub";
import * as Nav from "@/design/relay/Nav";
import * as Showcase from "@/design/relay/Showcase";

export const FullWidthPage = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  position: relative;
  overflow: hidden;
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

export default function Relay() {
  const [width, setWidth] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    showcaseRef?.current &&
      setWidth(
        showcaseRef.current.scrollWidth - showcaseRef.current.offsetWidth
      );
  }, []);

  return (
    <>
      <Head>
        <title>Relay</title>
        <meta name="description" content="the Relay App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FullWidthPage>
        <ContentColumn>
          <Nav.Root>
            <Logo />
            <Nav.NavLink style={{ marginLeft: "auto", marginRight: "1.5rem" }}>
              Products
              <Nav.ChevronDownActive />
            </Nav.NavLink>
            <Nav.NavLink>
              Community
              <Nav.ChevronDownActive />
            </Nav.NavLink>
            <a
              href="https://github.com/relaycc"
              target="_blank"
              rel="noreferrer"
            >
              <IconGithub
                style={{ height: "2rem", width: "2rem", margin: "1.5rem" }}
              />
            </a>
            <Nav.ButtonPrimary>Connect Wallet</Nav.ButtonPrimary>
          </Nav.Root>
          <Header />
          <Showcase.Wrapper>
            <Showcase.InnerWrapper>
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
                <Chevron.ChevronRightActive
                  onClick={() => {
                    showcaseRef?.current?.scrollBy({
                      left: 310,
                      behavior: "smooth",
                    });
                  }}
                />
              </Showcase.Root>
              <Showcase.Ellipse />
            </Showcase.InnerWrapper>
          </Showcase.Wrapper>
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
          <Footer />
        </ContentColumn>
      </FullWidthPage>
    </>
  );
}
