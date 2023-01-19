import styled from "styled-components";
import Link from "next/link";
import { Badge } from "@/lib/design/Badge";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignBadge() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Badge</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/Receiver-Design-File?node-id=826%3A20866&t=na5BcWI9n0lemVeP-4" target={"_blank"}>
            <span>Badge</span>
          </Link>
        </FigmaLink>
        <h3>Colors</h3>
        <li>Gray/100</li>
        <li>Gray/700</li>
      </ComponentSectionHeader>
      <Receiver>
        <Badge isLoading={true} label="badge"/>
        <Badge isLoading={false} label={EMPTY_TEXT}/>
        <br />
        <Badge isLoading={false} label={SHORT_TEXT}/>
        <br />
        <Badge isLoading={false} label={MEDIUM_TEXT}/>
        <br />
        <br />
        <Badge isLoading={false} label={VERY_LONG_TEXT}/>
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