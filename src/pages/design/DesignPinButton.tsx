import styled from "styled-components";
import Link from "next/link";
import { PinButton } from "@/lib/design/PinButton";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignPinButton() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Pin Button</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="" target={"_blank"}>
            <span>Pin Button</span>
          </Link>
        </FigmaLink>
      </ComponentSectionHeader>
      <Receiver>
        <span>Pinned = true</span>
        <br/>
        <PinButton pinned={true}/>
        <br />
        <span>Pinned = False</span>
        <br />
        <PinButton pinned={false}/>
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