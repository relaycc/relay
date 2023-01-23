import styled from "styled-components";
import Link from "next/link";
import { LogoCompany } from "@/lib/design/LogoCompany";
import { LogoDiscord } from "@/lib/design/LogoDiscord";
import { LogoGithub } from "@/lib/design/LogoGithub";
import { LogoMirror } from "@/lib/design/LogoMirror";
import { LogoPicture } from "@/lib/design/LogoPicture";
import { LogoRelay } from "@/lib/design/LogoRelay";
import { LogoTwitter } from "@/lib/design/LogoTwitter";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignLogoSocials() {
  return (
    <ComponentSection>
      <ComponentSectionHeader>
        <ComponentSectionTitle>Logos</ComponentSectionTitle>
        <FigmaLink>
          Figma Link:{" "}
          <Link href="https://www.figma.com/file/oeHqO9qLCkz7SYb73J5Qx4/ReceiverV0-Design-File?node-id=1131%3A23931&t=mnRaWKb6v7jQr6Nt-4" target={"_blank"}>
            <span>logos</span>
          </Link>
        </FigmaLink>
      </ComponentSectionHeader>
      <Receiver>
        <LogoDiscord onClick={() => null} />
        <LogoGithub onClick={() => null} />
        <LogoTwitter onClick={() => null} />
        <LogoMirror onClick={() => null} />
        <LogoRelay onClick={() => null} />
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