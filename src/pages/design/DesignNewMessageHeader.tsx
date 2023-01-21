import styled from "styled-components";
import Link from "next/link";
import { NewMessageHeader } from "@/lib/design/NewMessageHeader";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignNewMessageHeader() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>New Message Header</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link
            href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/ReceiverV0-Design-File?node-id=520%3A10704&t=RZ1euDmpA4uG9b6b-4"
            target={"_blank"}
          >
            <span>New Message Header</span>
          </Link>
        </FigmaLink>
      </ComponentSectionHeader>
      <Receiver>
        <NewMessageHeader handleCloseClick={() => null} />
      </Receiver>
    </ComponentSection>
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

const FigmaLink = styled.div``;
