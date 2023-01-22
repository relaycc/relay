import styled from "styled-components";
import Link from "next/link";
import { Time } from "@/lib/design/Time";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignTime() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Time</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/ReceiverV0-Design-File?node-id=814%3A14124&t=mnRaWKb6v7jQr6Nt-4" target={"_blank"}>
            <span>Time</span>
          </Link>
        </FigmaLink>
        <h3>States</h3>
        <li>Loading</li>
        <li>An actual time</li>
        <li>empty text</li>
        <li>short text</li>
        <li>Medium Text</li>
        <li>Very Long text</li>
      </ComponentSectionHeader>
      <Receiver>
        <Time isLoading={true} time="12:00" />
        <Time isLoading={false} time="12:00am" />
        <Time isLoading={false} time={EMPTY_TEXT} />
        <Time isLoading={false} time={SHORT_TEXT} />
        <Time isLoading={false} time={MEDIUM_TEXT} />
        <Time isLoading={false} time={VERY_LONG_TEXT} />
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