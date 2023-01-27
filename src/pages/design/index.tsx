import styled from "styled-components";
// import { AddressHeader } from "@/design/AddressHeader";
import { ButtonView } from "@/design/ButtonView";
import * as MenuLinkMobile from "../../design/relay/MenuLinkMobile";
("Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.");
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";
import { NavLink } from "../../design/relay/LinkProducts";
import { DropDownMenuMobile } from "../../design/relay/DropdownMenuMobile";

export default function Design() {
  return (
    <CenteredFlexColumn>
      <h1>Relay Design System</h1>
      <ComponentSection>
        <ComponentSectionHeader>
          <ComponentSectionTitle>AddressHeader</ComponentSectionTitle>
          <FigmaLink>Link Here</FigmaLink>
        </ComponentSectionHeader>
        <Receiver>
          <DropDownMenuMobile />
        </Receiver>
      </ComponentSection>
      <ComponentSection>
        <MenuLinkMobile.Github />
      </ComponentSection>
    </CenteredFlexColumn>
  );
}

const Receiver = styled.div`
  height: 700px;
  width: 360px;
  border: 4px solid black;
  border-radius: 4px;
`;

const ComponentSection = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding: 6rem;
`;

const ComponentSectionHeader = styled.div`
  margin-right: 6rem;
  min-width: 20rem;
`;

const ComponentSectionTitle = styled.h1``;

const FigmaLink = styled.a``;

const CenteredFlexColumn = styled.div`
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
