import styled from "styled-components";
import Link from "next/link";
import { Checkbox } from "@/lib/design/Checkbox";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignCheckbox() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Checkbox</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/Receiver-Design-File?node-id=454%3A10851&t=B5T9zGUw4OVNoomZ-4" target={"_blank"}>
            <span>Checkbox</span>
          </Link>
        </FigmaLink>
        <h3>Colors</h3>
        <li>Primary/500</li>
      </ComponentSectionHeader>
      <Receiver>
        <span>Secected</span>
        <br />
        <Checkbox selected={true} />
        <br />
        <span>Unselected + hover</span>
        <br />
        <Checkbox selected={false} />
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