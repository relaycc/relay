import styled from "styled-components";
import Link from "next/link";
import { ENSName } from "@/lib/design/ENSName";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignENSName() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>ENS Name</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/Receiver-Design-File?node-id=806%3A13570&t=GRC3KY8ofLUVJUZP-4" target={"_blank"}>
            <span>ENS Name</span>
          </Link>
        </FigmaLink>
        <h3>Colors</h3>
        <li>Gray/900</li>
      </ComponentSectionHeader>
      <Receiver>
        <span>Loading LG</span>
        <ENSName size="lg" monoFont={true} isLoading={true} ENSname={"ENSName.eth"} />
        <span>Loading MD</span>
        <ENSName size="lg" monoFont={true} isLoading={true} ENSname={"ENSName.eth"} />
        <span>LG</span>
        <ENSName size="lg" monoFont={true} isLoading={false} ENSname={"ENSName.eth"} />
        <span>MD</span>
        <ENSName size="md" monoFont={true} isLoading={false} ENSname={"ENSName.eth"} />
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