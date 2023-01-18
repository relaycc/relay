import styled from "styled-components";
import { useState } from "react";
import { ChatIcon } from "./ChatIcon";
import { ProfileIcon } from "./ProfileIcon";
import { AboutIcon } from "./AboutIcon";

interface NavProps {
  onClickChat: () => unknown;
  onClickProfile: () => unknown;
  onClickAbout: () => unknown;
  activeSection: "chat" | "profile" | "about";
}

const Navbar = styled.nav`
  background-color: white;
  border-radius: 0px 0px 14px 14px;
  width: 100%;
  height: 80px;
  border-top: 0.5px solid #d0d5dd;
`;

const NavItems = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-block-start: 0em;
  margin-block-end: 0em;
  padding-inline-start: 0px;
  border-radius: 0px 0px 14px 14px;
  padding-left: 46px;
  padding-right: 46px;
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :first-of-type {
    border-bottom-left-radius: 14px;
  }

  :last-of-type {
    border-bottom-right-radius: 14px;
  }
`;

export const Nav = ({
  onClickAbout,
  onClickChat,
  onClickProfile,
  activeSection,
}: NavProps) => {
  const [activeIcon, setActiveIcon] = useState(activeSection);

  const handleChatClick = () => {
    setActiveIcon("chat");
    onClickChat();
  };

  const handleProfileClick = () => {
    setActiveIcon("profile");
    onClickProfile();
  };

  const handleAboutClick = () => {
    setActiveIcon("about");
    onClickAbout();
  };

  return (
    <Navbar>
      <NavItems>
        <NavItem onClick={handleChatClick}>
          <ChatIcon active={activeIcon === "chat"} />
        </NavItem>
        <NavItem onClick={handleProfileClick}>
          <ProfileIcon active={activeIcon === "profile"} />
        </NavItem>
        <NavItem onClick={handleAboutClick}>
          <AboutIcon active={activeIcon === "about"} />
        </NavItem>
      </NavItems>
    </Navbar>
  );
};
