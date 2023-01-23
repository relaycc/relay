import styled from "styled-components";
import Link from "next/link";
import { ArrowUpCircle } from "@/lib/design/ArrowUpCircle";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignArrowUpCircle() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>ArrowUpCircle</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link
            href="https://www.figma.com/file/EZOEJ9JRgoJObOEQsf6NqV/Relay's-Design-System?node-id=1027%3A7202&t=PFbOK4kvXwVofl36-4"
            target={"_blank"}
          >
            <span>Arrow Up Circle</span>
          </Link>
          <br />
          Figma Link: {" "}
          <Link
            href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/Receiver-Design-File?node-id=972%3A22833&t=1Rmqo807JXXZGYYJ-4"
            target={"_blank"}
          >
            <span>Arrow Up Circle In Component</span>
          </Link>
        </FigmaLink>
        <h3>Colors used</h3>
        <li>Gray/600</li>
      </ComponentSectionHeader>
      <Receiver>
        <span>Active</span>
        <br />
        <ArrowUpCircle active={true} />
        <br />
        <span>Inactive</span>
        <br/>
        <ArrowUpCircle active={false} />
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
