import styled from "styled-components";
import Link from "next/link";
import { BackIcon } from "@/lib/design/BackIcon";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignBackIcon() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Back Icon</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/EZOEJ9JRgoJObOEQsf6NqV/Relay's-Design-System?node-id=1027%3A7310&t=pAdRLNEpmoxBRNhF-4" target={"_blank"}>
            <span>Back Icon</span>
          </Link>
          <br />
          Figma Link in component:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/Receiver-Design-File?node-id=972%3A22833&t=xCvzLSvI0DaKMbDF-4" target={"_blank"}>
            <span>Back Icon</span>
          </Link>
        </FigmaLink>
        <h3>Colors</h3>
        <li>Gray/900</li>
      </ComponentSectionHeader>
      <Receiver>
        <BackIcon />
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