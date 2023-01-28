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

export const FullWidthPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-image: url("/gradients.png");
  background-size: 100% 400px;
  background-repeat: no-repeat;
  background-position: top 80px left 0;
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
  const [width, setWidth] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] =
    useState<Project["category"]>("general");
  const [searchInput, setSearchInput] = useState<string | null>(null);

  useEffect(() => {
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

            <ContentColumnNarrow>
              <FlexWrapRow>
                {filteredProjects.map((project, i) => (
                  <DirectoryCard
                    url={project.url}
                    name={project.name}
                    delay={i * 0.05}
                    key={project.id}
                    logo={project.logo}
                    description={project.description}
                    category={activeCategory}
                  />
                ))}
              </FlexWrapRow>
            </ContentColumnNarrow>
          </DirectoryHeader.Root>
        </ContentColumn>
        <Footer />
      </FullWidthPage>
    </>
  );
}

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
