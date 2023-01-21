import styled from "styled-components";
import Link from "next/link";
import { NewMsgInput } from "@/lib/design/NewMsgInput";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignNewMsgInput() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>New Msg Input</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/ReceiverV0-Design-File?node-id=454%3A12858&t=a9ldmQpYDRiWSZ6K-4" target={"_blank"}>
            <span>New Msg Input</span>
          </Link>
        </FigmaLink>
      </ComponentSectionHeader>
      <Receiver>
        <span>loading</span>
        <NewMsgInput isLoading={true} active={true} value={'loading'} />
        <span>Empty</span>
        <NewMsgInput isLoading={false} active={true} value={EMPTY_TEXT} />
        <span>Short, also showing active = false</span>
        <NewMsgInput isLoading={false} active={false} value={SHORT_TEXT} />
        <span>Medium</span>
        <NewMsgInput isLoading={false} active={true} value={MEDIUM_TEXT} />
        <span>Very Long</span>
        <NewMsgInput isLoading={false} active={true} value={VERY_LONG_TEXT} />
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