import Head from "next/head";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import * as Card from "@/design/relay/Card";
import * as DirectoryHeader from "@/design/relay/DirectoryHeader";
import Footer from "@/design/relay/Footer";
import { DirectoryCard } from "@/design/relay/DirectoryCard";
import { Logo } from "@/design/relay/Logo";
import { IconGithub } from "@/design/relay/IconGithub";
import * as Nav from "@/design/relay/Nav";
import * as Showcase from "@/design/relay/Showcase";
import { client } from "@/lib/supabase/client";
import {
  isProject,
  Project,
  CATEGORIES,
  ProjectCategory,
  isProjectCategory,
} from "@/lib/supabase/project";
import * as MenuMobile from "@/design/relay/MenuMobile";
import Image from "next/image";
import { ConnectButton } from "@/components/ConnectButton";
import { NextRouter, useRouter } from "next/router";
import { ReceiverWindow } from "@/components/ReceiverWindow";
import { useGoToDm } from "@/hooks/useReceiverWindow";
import { DropdownItem } from "@/design/relay/DropdownItem";
import { Sidebar } from "@/design/relay/Sidebar";
import { useShowcaseClick } from "@/lib/plausible/useShowcaseClick";
import * as Chevron from "@/design/relay/Chevron";
import { usePriorityRobotCards } from "@/hooks/usePriorityRobotCards";
import { EthAddress, isEthAddress } from "@relaycc/xmtp-hooks";
import { isEnsName } from "@/lib/isEnsName";
import { fetchAddressFromEns } from "@/hooks/useAddressFromEns";
import { ChatIcon, ChatIconBlack } from "@/design/relay/ChatIcon";
import { CloseIcon } from "@/design/NewMessageHeader";
import { MobileLogo } from "@/design/MobileLogo";

export default function Relay({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const goToDm = useGoToDm();
  const robotCards = usePriorityRobotCards();
  const queryCategory = (() => {
    if (!isProjectCategory(router.query.category)) {
      return null;
    } else {
      return router.query.category;
    }
  })();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(
    queryCategory || "general"
  );
  const [width, setWidth] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [messageInputIsError, setMessageInputIsError] = useState(false);
  const [messageInputIsLoading, setMessageInputIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
  const toggleProducts = useCallback(() => {
    setShowProducts(!showProducts);
    setShowCommunity(false);
  }, [showProducts]);
  const toggleCommunity = useCallback(() => {
    setShowCommunity(!showCommunity);
    setShowProducts(false);
  }, [showCommunity]);
  const toggleMobileSearch = useCallback(() => {
    console.log({ showMobileSearch });
    setShowMobileSearch(!showMobileSearch);
  }, [showMobileSearch]);
  const [sidebar, setSidebar] = useState<boolean>(false);

  const showcaseClick = useShowcaseClick();
  const directoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (queryCategory === null || directoryRef.current === null) {
      return;
    } else {
      directoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [queryCategory]);

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

  const scrollAmount = useCallback(
    (left?: boolean) => {
      if (left && showcaseRef && showcaseRef.current) {
        return -showcaseRef.current.clientWidth - 14;
      } else if (showcaseRef && showcaseRef.current) {
        return showcaseRef.current.clientWidth + 14;
      }
      if (left) {
        return -270;
      }
      return 270;
    },
    [showcaseRef, window]
  );

  const scrollRight = useCallback(() => {
    showcaseRef?.current?.scrollBy({
      left: scrollAmount(),
      behavior: "smooth",
    });
  }, [showcaseRef]);
  const scrollLeft = useCallback(() => {
    showcaseRef?.current?.scrollBy({
      left: scrollAmount(true),
      behavior: "smooth",
    });
  }, [showcaseRef]);

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
            <Nav.Message
              isError={messageInputIsError}
              isLoading={messageInputIsLoading}
              placeholder={"Message ENS, Lens, or 0xAddress"}
              onChange={(e: any) => {
                setMessageInputIsError(false);
              }}
              onKeyPress={async (e: any) => {
                if (e.key === "Enter") {
                  if (
                    !isEnsName(e.currentTarget.value) &&
                    !isEthAddress(e.currentTarget.value)
                  ) {
                    setMessageInputIsError(true);
                  } else {
                    if (isEnsName(e.currentTarget.value)) {
                      setMessageInputIsLoading(true);
                      const address = await fetchAddressFromEns(
                        e.currentTarget.value
                      );
                      setMessageInputIsLoading(false);
                      if (typeof address === "string") {
                        goToDm({ peerAddress: address as EthAddress });
                        setMessageInputIsError(false);
                      } else {
                        setMessageInputIsError(true);
                      }
                    } else {
                      goToDm({ peerAddress: e.currentTarget.value });
                      setMessageInputIsError(false);
                    }
                  }
                }
              }}
            />
            {showProducts ? (
              <ProductsDropdown
                toggleDropdown={toggleProducts}
                router={router}
              />
            ) : (
              <Nav.NavLink
                style={{ marginLeft: "auto", marginRight: "1.5rem" }}
                onClick={toggleProducts}
              >
                Products
                <Nav.ChevronDownActive />
              </Nav.NavLink>
            )}
            {showCommunity ? (
              <CommunityDropdown
                toggleDropdown={toggleCommunity}
                router={router}
              />
            ) : (
              <Nav.NavLink onClick={toggleCommunity}>
                Community
                <Nav.ChevronDownActive />
              </Nav.NavLink>
            )}

            <Nav.LogoAndNameWrapper>
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
            </Nav.LogoAndNameWrapper>
            <Nav.MobileMenuButtonWrapper>
              <MenuMobile.MenuIcon onClick={() => setShowMenu(true)} />
            </Nav.MobileMenuButtonWrapper>
          </Nav.RootDesktop>
          <Nav.RootMobile>
            {showMobileSearch ? (
              <>
                <Nav.Message
                  isError={messageInputIsError}
                  isLoading={messageInputIsLoading}
                  placeholder={"Message ENS, Lens, or 0xAddress"}
                  onChange={(e: any) => {
                    setMessageInputIsError(false);
                  }}
                  style={{ margin: "0" }}
                  onKeyPress={async (e: any) => {
                    if (e.key === "Enter") {
                      if (
                        !isEnsName(e.currentTarget.value) &&
                        !isEthAddress(e.currentTarget.value)
                      ) {
                        setMessageInputIsError(true);
                      } else {
                        if (isEnsName(e.currentTarget.value)) {
                          setMessageInputIsLoading(true);
                          const address = await fetchAddressFromEns(
                            e.currentTarget.value
                          );
                          setMessageInputIsLoading(false);
                          if (typeof address === "string") {
                            goToDm({ peerAddress: address as EthAddress });
                            setMessageInputIsError(false);
                          } else {
                            setMessageInputIsError(true);
                          }
                        } else {
                          goToDm({ peerAddress: e.currentTarget.value });
                          setMessageInputIsError(false);
                        }
                      }
                    }
                  }}
                />
                <CloseIcon onClick={toggleMobileSearch} />
              </>
            ) : (
              <>
                <MobileLogo />
                <MenuMobile.RightWrapper>
                  <ChatIconBlack onClick={toggleMobileSearch} />
                  <MenuMobile.MenuIcon onClick={() => setShowMenu(true)} />
                </MenuMobile.RightWrapper>
              </>
            )}
          </Nav.RootMobile>
          <DirectoryHeader.Root
            style={{ maxWidth: "max-content", marginTop: "3rem" }}
          >
            <DirectoryHeader.Title>Try ChatGPT for Web3</DirectoryHeader.Title>
          </DirectoryHeader.Root>
          <Showcase.Wrapper>
            <Showcase.InnerWrapper>
              <Showcase.Root>
                <Chevron.ChevronLeftActive onClick={scrollLeft} />
                <Showcase.MotionRoot ref={showcaseRef}>
                  <Showcase.Slides
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                  >
                    {robotCards.map((robot) => (
                      <Card.Card
                        key={robot.peerAddress}
                        handleClick={() => {
                          showcaseClick(robot.peerAddress);
                          goToDm({
                            peerAddress: robot.peerAddress as EthAddress,
                          });
                        }}
                        icon={<robot.icon />}
                        initialBgColor={robot.initialBgColor}
                        animateBgColor={robot.animateBgColor}
                      />
                    ))}
                  </Showcase.Slides>
                </Showcase.MotionRoot>
                <Chevron.ChevronRightActive onClick={scrollRight} />
              </Showcase.Root>
              <Showcase.Ellipse />
            </Showcase.InnerWrapper>
          </Showcase.Wrapper>
          <DirectoryHeader.Root style={{ maxWidth: "100%" }}>
            <DirectoryHeader.Title
              ref={directoryRef}
              style={{ marginTop: "4rem" }}
            >
              Explore Web3 on Relay
            </DirectoryHeader.Title>
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
          <DirectoryHeader.MobileRoot style={{ maxWidth: "100%" }}>
            <DirectoryHeader.Title>Directory</DirectoryHeader.Title>
            <DirectoryHeader.SearchWrapper>
              <DirectoryHeader.Search.Search
                onChange={(e: any) => {
                  setSearchInput(e.target.value);
                }}
                value={searchInput || ""}
                placeholder={"Search for projects..."}
              />
              <DirectoryHeader.MenuIcon onClick={() => setSidebar(true)} />
            </DirectoryHeader.SearchWrapper>
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
          </DirectoryHeader.MobileRoot>
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
        <Sidebar
          {...{ sidebar, setSidebar, activeCategory, setActiveCategory }}
        />
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

const ProductsDropdown: FunctionComponent<{
  toggleDropdown: () => void;
  router: NextRouter;
}> = ({ toggleDropdown, router }) => {
  const handleNav = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, toggleDropdown]);
  // TODO Use handle nav with appropriate links

  return (
    <ProductsRoot ref={ref}>
      <Nav.NavLinkActive onClick={toggleDropdown}>
        Products <Nav.ChevronDownColored />
      </Nav.NavLinkActive>
      <ProductsCard>
        <DropdownItem
          onClick={() => {
            alert("add link in code");
          }}
        >
          Receiver
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            alert("add link in code");
          }}
        >
          Directory
        </DropdownItem>
      </ProductsCard>
    </ProductsRoot>
  );
};
const CommunityDropdown: FunctionComponent<{
  toggleDropdown: () => void;
  router: NextRouter;
}> = ({ toggleDropdown, router }) => {
  const handleNav = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, toggleDropdown]);
  // TODO Use handle nav with appropriate links
  return (
    <CommunityRoot ref={ref}>
      <Nav.NavLink onClick={toggleDropdown}>
        Community <Nav.ChevronDownColored />
      </Nav.NavLink>
      <CommunityCard>
        <DropdownItem
          onClick={() => {
            alert("add link in code");
          }}
        >
          Discord
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            alert("add link in code");
          }}
        >
          Twitter
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            alert("add link in code");
          }}
        >
          Lens
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            alert("add link in code");
          }}
        >
          Mirror
        </DropdownItem>
      </CommunityCard>
    </CommunityRoot>
  );
};

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
  padding-bottom: 3rem;
  background: ${({ theme }) => theme.colors.gray["200"]};

  @media screen and (min-width: 400px) {
    background: initial;
  }
`;
const FlexWrapRow = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  width: 100%;
  max-width: 1344px;
  height: auto;
  padding: 0 1rem;
  grid-template-columns: initial;
  grid-gap: 0.5rem;

  @media screen and (min-width: 400px) {
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 250px));
    padding: 0 2rem;
  }

  @media screen and (min-width: 1400px) {
    padding: 0;
  }
`;

const CommunityRoot = styled.div`
  position: relative;
`;
const ProductsRoot = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 1.5rem;
`;

const CommunityCard = styled(Nav.DropdownCard)`
  position: absolute;
  left: -17px;
  z-index: 1;
`;
const ProductsCard = styled(Nav.DropdownCard)`
  position: absolute;
  left: -26px;
  z-index: 1;
`;
