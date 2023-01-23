import styled from "styled-components";
import Link from "next/link";
import { Toast } from "@/lib/design/Toast";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignToast() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Toast</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/ReceiverV0-Design-File?node-id=544%3A14285&t=mnRaWKb6v7jQr6Nt-4" target={"_blank"}>
            <span>Toast</span>
          </Link>
        </FigmaLink>
        <h3>States</h3>
        <li>success</li>
        <li>error</li>
        <li>warning</li>
        <li>info</li>
        <li>empty text</li>
        <li>short text</li>
        <li>medium text</li>
        <li>very long text</li>
      </ComponentSectionHeader>
      <Receiver>
        <Toast variant="success" message="Toast Message" />
        <Toast variant="error" message="Toast Message" />
        <Toast variant="warning" message="Toast Message" />
        <Toast variant="info" message="Toast Message" />
        <Toast variant="info" message={EMPTY_TEXT}/>
        <Toast variant="info" message={SHORT_TEXT} />
        <Toast variant="info" message={MEDIUM_TEXT} />
        <Toast variant="info" message={VERY_LONG_TEXT} />
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