import styled from "styled-components";
import Link from "next/link";
import { Chat } from "@/lib/design/Chat";
import testicon from './testicon.png'

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignChat() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Chat</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/ReceiverV0-Design-File?node-id=806%3A13094&t=mnRaWKb6v7jQr6Nt-4" target={"_blank"}>
            <span>Chat</span>
          </Link>
        </FigmaLink>
        <h3>States</h3>
        <li>loading</li>
        <li>has Lens + short text</li>
        <li>no Lens + medium text</li>
        <li>has Lens + very long text</li>
      </ComponentSectionHeader>
      <Receiver>
       <Chat ENSname="brianschafer.eth" statusIcon={testicon.src} messageDetails={[{message:"hi", time: '12:00am'}]} hasLoaded={false} isPinned={false} hasLENS={true}/>
       <Chat ENSname="brianschafer.eth" statusIcon={testicon.src} messageDetails={[{message:SHORT_TEXT, time: '12:00am'}]} hasLoaded={true} isPinned={false} hasLENS={true}/>
       <Chat ENSname="brianschafer.eth" statusIcon={testicon.src} messageDetails={[{message:MEDIUM_TEXT, time: '12:00am'}]} hasLoaded={true} isPinned={false} hasLENS={false}/>
       <Chat ENSname="brianschafer.eth" statusIcon={testicon.src} messageDetails={[{message:VERY_LONG_TEXT, time: '12:00am'}]} hasLoaded={true} isPinned={false} hasLENS={true}/>
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