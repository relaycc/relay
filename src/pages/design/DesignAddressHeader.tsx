import styled from "styled-components";
import { AddressHeader } from "@/lib/design/AddressHeader";
import Link from "next/link";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignAddressHeader () {
    return (
        <ComponentSection>
        <ComponentSectionHeader>
          <ComponentSectionTitle>AddressHeader</ComponentSectionTitle>
          <FigmaLink>
            Figma Link:{" "}
            <a
              href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/Receiver-Design-File?node-id=806%3A13629&t=3csLpeXKF1rhktk1-4"
              target={"_blank"}
            >
              address header
            </a>
          </FigmaLink>
        </ComponentSectionHeader>
        <Receiver>
          <AddressHeader isLoading={true} addressHeader={""} />
          <AddressHeader isLoading={false} addressHeader={EMPTY_TEXT} />
          <AddressHeader isLoading={false} addressHeader={SHORT_TEXT} />
          <AddressHeader isLoading={false} addressHeader={MEDIUM_TEXT} />
          <AddressHeader isLoading={false} addressHeader={VERY_LONG_TEXT} />
        </Receiver>
      </ComponentSection>
    )
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

const FigmaLink = styled.a``;

const CenteredFlexColumn = styled.div`
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;