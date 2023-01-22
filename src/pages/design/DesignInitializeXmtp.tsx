import styled from "styled-components";
import Link from "next/link";
import { InitializeXmtp } from "@/lib/design/InitializeXmtp";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignInitializeXmtp() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Initialize XMTP</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/Receiver-Design-File?node-id=814%3A15481&t=GRC3KY8ofLUVJUZP-4" target={"_blank"}>
            <span>Initialize XMTP</span>
          </Link>
        </FigmaLink>
      </ComponentSectionHeader>
      <Receiver>
        <div style={{height: '696px', overflow: "scroll"}}>
        <InitializeXmtp handleSignin={() => null} hasConnected={false} isLoading={true} isWalletConnected={false} />
        <InitializeXmtp handleSignin={() => null} hasConnected={true} isLoading={false} isWalletConnected={false} />
        <InitializeXmtp handleSignin={() => null} hasConnected={false} isLoading={false} isWalletConnected={false} />
        <InitializeXmtp handleSignin={() => null} hasConnected={false} isLoading={false} isWalletConnected={true} />
        <InitializeXmtp handleSignin={() => null} hasConnected={true} isLoading={false} isWalletConnected={true} />
        </div>
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