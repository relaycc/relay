import styled from "styled-components";
import Link from "next/link";
import { AlertCircle } from "@/lib/design/AlertCircle";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignAlertCircle() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Alert Circle</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/EZOEJ9JRgoJObOEQsf6NqV/Relay's-Design-System?node-id=1027%3A7346&t=PFbOK4kvXwVofl36-0" target={'_blank'}><span>Alert Circle</span></Link>
          <br />
          Figma Link in Component:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/Receiver-Design-File?node-id=544%3A14314&t=uihIk28UOF7pgZee-4" target={"_blank"}><span>Alert Circle In Component</span></Link>
        </FigmaLink>
        <h3>Colors used</h3>
        <li>Error/700</li>
      </ComponentSectionHeader>
      <Receiver>
        <AlertCircle />
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
