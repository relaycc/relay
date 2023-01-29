import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as Card from "@/design/relay/Card";
import * as DirectoryHeader from "@/design/relay/DirectoryHeader";
import { Header } from "@/design/relay/Header";
import * as Chevron from "@/design/relay/Chevron";
import Footer from "@/design/relay/Footer";
import { CardsWrapper, DirectoryCard } from "@/design/relay/DirectoryCard";
import { Logo } from "@/design/relay/Logo";
import { IconGithub } from "@/design/relay/IconGithub";
import * as Nav from "@/design/relay/Nav";
import * as Showcase from "@/design/relay/Showcase";
import { client } from "@/lib/supabase/client";
import { isProject, Project, CATEGORIES } from "@/lib/supabase/project";
import * as MenuMobile from "@/design/relay/MenuMobile";
import Image from "next/image";
import { ConnectButton } from "@/components/ConnectButton";
import { useRouter } from "next/router";
import { ReceiverWindow } from "@/components/ReceiverWindow";
import { useGoToDm, useReceiverWindow } from "@/hooks/useReceiverWindow";
import { ROBOT_ADDRESSES } from "@/lib/robot-addresses";

export const FullWidthPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
`;

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: calc(252px * 5 + 64px);
  flex-grow: 1;
`;

const ContentColumnNarrow = styled.div`
  max-width: 1376px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 330px;
  margin-bottom: 3rem;
`;
const FlexWrapRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  min-width: 100%;
`;

const DropdownRoot = styled.div`
  position: relative;
`;

const DropdownCardHidden = styled(Nav.DropdownCard)`
  position: absolute;
  display: none;
  height: 200px;
  :hover {
    display: flex;
  }
`;

const Dropdown = () => {
  return (
    <DropdownRoot>
      <Nav.NavLink>Community</Nav.NavLink>
      <DropdownCardHidden>hey</DropdownCardHidden>
    </DropdownRoot>
  );
};

export default function Relay({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const goToDm = useGoToDm();
  const activeCategory = (router.query.category ||
    "general") as Project["category"];
  const setActiveCategory = (category: Project["category"]) =>
    router.push(`/${category}`);
  const [width, setWidth] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const { setPage } = useReceiverWindow();

  useEffect(() => {
    setPage({ id: "sign" });
    showcaseRef?.current &&
      setWidth(
        showcaseRef.current.scrollWidth - showcaseRef.current.offsetWidth
      );
  }, []);

  const filteredProjects = projects.filter((project) => {
    return (
      project.category === activeCategory &&
      (() => {
        if (searchInput === null) {
          return true;
        } else {
          return project.name.toLowerCase().includes(searchInput.toLowerCase());
        }
      })()
    );
  });

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
          <Nav.RootDesktop>
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
            <ConnectButton />
          </Nav.RootDesktop>
          <Nav.RootMobile>
            <Logo />
            <MenuMobile.MenuIcon onClick={() => setShowMenu(true)} />
          </Nav.RootMobile>
          <DirectoryHeader.Root
            style={{ maxWidth: "max-content", marginTop: "3rem" }}
          >
            <DirectoryHeader.Title>Try ChatGPT for Web3</DirectoryHeader.Title>
          </DirectoryHeader.Root>
          <Showcase.Wrapper>
            <Showcase.InnerWrapper>
              <Showcase.Root>
                <Showcase.MotionRoot ref={showcaseRef}>
                  <Showcase.Slides
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                  >
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.lens)}
                      icon={<Card.LensIcon />}
                      initialBgColor="#ABFD2C"
                      animateBgColor="#EFFFD6"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.opensea)}
                      icon={<Card.OpenseaIcon />}
                      initialBgColor="#2081E2"
                      animateBgColor="#DCE3F9"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.ens)}
                      icon={<Card.Ens />}
                      initialBgColor="#689EF6"
                      animateBgColor="#D8DFFD"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.poap)}
                      icon={<Card.Poap />}
                      initialBgColor="#9E6EF6"
                      animateBgColor="#DDD6FF"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.xmtp)}
                      icon={<Card.Xmtp />}
                      initialBgColor="#5A2895"
                      animateBgColor="#E9D6FF"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.litprotocol)}
                      icon={<Card.Lit />}
                      initialBgColor="#ECA368"
                      animateBgColor="#FBE9DB"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.uniswap)}
                      icon={<Card.Uniswap />}
                      initialBgColor="#FE007A"
                      animateBgColor="#FFD6EA"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.alchemy)}
                      icon={<Card.Alchemy />}
                      initialBgColor="#4609FA"
                      animateBgColor="#E1D7FE"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.metamask)}
                      icon={<Card.Metamask />}
                      initialBgColor="#233447"
                      animateBgColor="#E4EAF2"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.gitcoin)}
                      icon={<Card.Gitcoin />}
                      initialBgColor="#63DCA2"
                      animateBgColor="#DEF7EB"
                    />
                    <Card.Card
                      handleClick={() => goToDm(ROBOT_ADDRESSES.sushiswap)}
                      icon={<Card.SushiSwap />}
                      initialBgColor="#0E0F23"
                      animateBgColor="#E2E3F3"
                    />
                  </Showcase.Slides>
                </Showcase.MotionRoot>
              </Showcase.Root>
              <Showcase.Ellipse />
            </Showcase.InnerWrapper>
          </Showcase.Wrapper>
          <DirectoryHeader.Root style={{ maxWidth: "max-content" }}>
            <DirectoryHeader.Title>Explore Web3 on Relay</DirectoryHeader.Title>
            <DirectoryHeader.Search.Search
              onChange={(e: any) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput || ""}
              placeholder={"Search for projects..."}
            />
            <DirectoryHeader.Nav>
              <DirectoryHeader.Directories>
                {CATEGORIES.map((category) => {
                  return (
                    <DirectoryHeaderItem
                      key={category}
                      category={category}
                      isActive={category === activeCategory}
                      onClick={() => setActiveCategory(category)}
                    />
                  );
                })}
              </DirectoryHeader.Directories>
            </DirectoryHeader.Nav>
          </DirectoryHeader.Root>
          <ContentColumnNarrow style={{ minHeight: "100vh" }}>
            <FlexWrapRow>
              {filteredProjects.map((project, i) => (
                <DirectoryCard
                  url={project.url}
                  name={project.name}
                  delay={i * 0.05}
                  key={project.name + project.category}
                  logo={project.logo}
                  description={project.description}
                  category={activeCategory}
                  handle={project.handle}
                />
              ))}
            </FlexWrapRow>
          </ContentColumnNarrow>
        </ContentColumn>
        <Footer />
        {showMenu && (
          <MenuMobile.Overlay>
            <MenuMobile.Root initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FlexRowSpaceBetween style={{ padding: "0.5rem" }}>
                <MenuMobile.Logo />
                <Image
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  src="/exit.svg"
                  width={24}
                  height={24}
                  alt="close"
                />
              </FlexRowSpaceBetween>
              <MenuMobile.Products>Products</MenuMobile.Products>
              <MenuMobile.ProductButton>Receiver</MenuMobile.ProductButton>
              <MenuMobile.ProductButton>Directory</MenuMobile.ProductButton>
              <MenuMobile.ProductButton>Robot</MenuMobile.ProductButton>
              <MenuMobile.Products>Community</MenuMobile.Products>
              <MenuMobile.SocialItem>Discord</MenuMobile.SocialItem>
              <MenuMobile.SocialItem>Twitter</MenuMobile.SocialItem>
              <MenuMobile.SocialItem>Lens</MenuMobile.SocialItem>
              <MenuMobile.SocialItem>Mirror</MenuMobile.SocialItem>
              <MenuMobile.SocialItem>GitHub</MenuMobile.SocialItem>
              <MenuMobile.ConnectButton>
                Connect Wallet
              </MenuMobile.ConnectButton>
            </MenuMobile.Root>
          </MenuMobile.Overlay>
        )}
        <ReceiverWindow />
      </FullWidthPage>
    </>
  );
}

const FlexRowSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const getServerSideProps = async (): Promise<{
  props: {
    projects: Project[];
  };
}> => {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("sort", { ascending: true });

  const processed = (() => {
    if (data === null) {
      console.warn('Data fetched for projects is null, returning empty array"');
      return [];
    } else if (error !== null) {
      console.error("Error fetching projects", error);
      return [];
    } else {
      return data.filter(isProject);
    }
  })();

  return {
    props: {
      projects: processed,
    },
  };
};

const DirectoryHeaderItem = ({
  isActive,
  onClick,
  category,
}: {
  isActive: boolean;
  onClick: () => unknown;
  category: string;
}) => {
  if (isActive) {
    return (
      <DirectoryHeader.Active onClick={onClick}>
        {category}
      </DirectoryHeader.Active>
    );
  } else {
    return (
      <DirectoryHeader.Inactive onClick={onClick}>
        {category}
      </DirectoryHeader.Inactive>
    );
  }
};
