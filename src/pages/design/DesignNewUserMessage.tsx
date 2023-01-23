import styled from "styled-components";
import Link from "next/link";
import { NewUserMessage } from "@/lib/design/NewUserMessage";
import { useState } from "react";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignNewUserMessage() {
  const [viewComponents, setViewComponents] = useState(true)
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>New user Message</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/ReceiverV0-Design-File?node-id=972%3A19948&t=M4qOyakBMcj7cbAU-4" target={"_blank"}>
            <span>New User Message</span>
          </Link>
        </FigmaLink>
      </ComponentSectionHeader>
      <Receiver>
        <button onClick={() => setViewComponents(!viewComponents)}>Click To view because component lasts for 3 seconds</button>
        {viewComponents &&  <><span>isNewUser=true</span>
        <NewUserMessage isNewUser={true}/>
        <span>isNewUser=False should be invisible</span>
        <NewUserMessage isNewUser={false}/> </>}
        {viewComponents ||  <><span>isNewUser=true</span>
        <NewUserMessage isNewUser={true}/>
        <span>isNewUser=False should be invisible</span>
        <NewUserMessage isNewUser={false}/> </>}

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