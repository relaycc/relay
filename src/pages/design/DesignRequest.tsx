import styled from "styled-components";
import Link from "next/link";
import { Request } from "@/lib/design/Request";
import testicon from "./testicon.png";
const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignRequest() {
  return (
    <ComponentSection>
        <ComponentSectionHeader>
          <ComponentSectionTitle>Request</ComponentSectionTitle>
          <FigmaLink>
            Figma Link:{" "}
            <Link
              href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/ReceiverV0-Design-File?node-id=814%3A14380&t=mnRaWKb6v7jQr6Nt-4"
              target={"_blank"}
            >
              <span>Request</span>
            </Link>
          </FigmaLink>
          <h3>ENS Names being used</h3>
          <li>vdp.eth</li>
          <li>brians111.eth</li>
          <li>brianschafer.eth</li>
          <h3>Sections</h3>
          <li>Loading</li>
          <li>isEditing=true</li>
          <li>empty text</li>
          <li>short text</li>
          <li>medium text</li>
          <li>Very long text text</li>
        </ComponentSectionHeader>
        <Receiver>
        <div style={{height: "696px", overflowY: 'scroll'}}>
          <Request
            messageDetails={[{ message: "hello", time: "12:00" }]}
            hasLoaded={false}
            isEditing={false}
            ENSname="brians111.eth"
            statusIcon={testicon.src}
          />
          <Request
            messageDetails={[{ message: "is editing true", time: "12:00" }]}
            hasLoaded={true}
            isEditing={true}
            ENSname="brians111.eth"
            statusIcon={testicon.src}
          />
          <Request
            messageDetails={[{ message: "", time: "12:00" }]}
            hasLoaded={true}
            isEditing={false}
            ENSname="vdp.eth"
            statusIcon={testicon.src}
          />
          <Request
            messageDetails={[{ message: "Short text", time: "12:00" }]}
            hasLoaded={true}
            isEditing={false}
            ENSname="brianschafer.eth"
            statusIcon={testicon.src}
          />
          <Request
            messageDetails={[
              {
                message: "Medium text that might be truncated.",
                time: "12:00",
              },
            ]}
            hasLoaded={true}
            isEditing={false}
            ENSname="brians111.eth"
            statusIcon={testicon.src}
          />
          <br />
          <br />
          <Request
            messageDetails={[
              {
                message:
                  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.",
                time: "12:00",
              },
            ]}
            hasLoaded={true}
            isEditing={false}
            ENSname="brians111.eth"
            statusIcon={testicon.src}
          />
    </div>
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
