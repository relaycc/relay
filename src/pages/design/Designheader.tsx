import styled from "styled-components";
import Link from "next/link";
import { DMHeader } from "@/lib/design/DMHeader";
import testicon from './testicon.png'

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignHeader() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>DM Header</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="" target={"_blank"}>
            <span>title goes here</span>
          </Link>
        </FigmaLink>
        <h3>States</h3>
        <li>Loading: true</li>
        <li>has lens: false, pinned true</li>
        <li>has lens: true, pinned false</li>
        <li>short ens pinned = true</li>
        <li>There seems to be an error in a component which is placing <br /> a loading circle where the pin icon should be</li>
      </ComponentSectionHeader>
      <Receiver>
        <DMHeader  hasLENSicon={true} pinned={true} addressHeader="0x7643B3E34039ADE2db0f64C9Be4907B2FcE63B2A" ENSname="brianschafer.eth" hasLoaded={false} src={testicon.src}/>
        <DMHeader  hasLENSicon={true} pinned={true} addressHeader="0x7643B3E34039ADE2db0f64C9Be4907B2FcE63B2A" ENSname="brianschafer.eth" hasLoaded={true} src={testicon.src}/>
        <DMHeader  hasLENSicon={false} pinned={true} addressHeader="0x7643B3E34039ADE2db0f64C9Be4907B2FcE63B2A" ENSname="brianschafer.eth" hasLoaded={true} src={testicon.src}/>
        <DMHeader  hasLENSicon={true} pinned={false} addressHeader="0x7643B3E34039ADE2db0f64C9Be4907B2FcE63B2A" ENSname="brianschafer.eth" hasLoaded={true} src={testicon.src}/>
        <DMHeader  hasLENSicon={true} pinned={true} addressHeader="0x7643B3E34039ADE2db0f64C9Be4907B2FcE63B2A" ENSname="vdp.eth" hasLoaded={true} src={testicon.src}/>
        <DMHeader  hasLENSicon={false} pinned={true} addressHeader="0x7643B3E34039ADE2db0f64C9Be4907B2FcE63B2A" ENSname="vdp.eth" hasLoaded={true} src={testicon.src}/>
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