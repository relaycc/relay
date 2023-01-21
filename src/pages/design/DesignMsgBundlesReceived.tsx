import styled from "styled-components";
import Link from "next/link";
import { MsgBundlesReceived } from "@/lib/design/MsgBundlesReceived";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignMsgBundleReceived() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Msg Bundle Received</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/ReceiverV0-Design-File?node-id=806%3A13094&t=XRS5z4vSnxRPTqnC-4" target={"_blank"}>
            <span>Msg Bundle Received</span>
          </Link>
        </FigmaLink>
      </ComponentSectionHeader>
      <Receiver>
        <span>Loading</span>
        <MsgBundlesReceived ensName="myensname.eth" isLoading={true} messages={[{time: "234", message: "hello"}]}/>
        <span>empty text</span>
        <MsgBundlesReceived ensName="myensname.eth" isLoading={false} messages={[{time:EMPTY_TEXT, message: EMPTY_TEXT}]}/>
        <span>short text</span>
        <MsgBundlesReceived ensName="myensname.eth" isLoading={false} messages={[{time: SHORT_TEXT, message: SHORT_TEXT}]}/>
        <span>medium text</span>
        <MsgBundlesReceived ensName="myensname.eth" isLoading={false} messages={[{time: MEDIUM_TEXT, message: MEDIUM_TEXT}]}/>
        <span>very long text</span>
        <MsgBundlesReceived ensName="myensname.eth" isLoading={false} messages={[{time: VERY_LONG_TEXT, message: VERY_LONG_TEXT}]}/>
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