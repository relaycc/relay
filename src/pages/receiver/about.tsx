import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { FooterNav } from "@/components/FooterNav";
import { LogoRelay } from "@/design/LogoRelay";
import { LogoGithub } from "@/design/LogoGithub";
import { LogoTwitter } from "@/design/LogoTwitter";
import { LogoDiscord } from "@/design/LogoDiscord";
import { LogoMirror } from "@/design/LogoMirror";
import {
  textSmallBold,
  textSmallRegular,
  textXlSemibold,
} from "@/design/typography";
import { useRedirectWhenNotSignedIn } from "@/hooks/useRedirectWhenNotSignedInt";
import * as HeaderSimple from "@/design/HeaderSimple";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px;
  margin: 6rem auto;

  height: 43.75rem;
  width: 400px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 33.75rem;
`;

const AboutBox = styled.div`
  background: linear-gradient(
    66.06deg,
    rgba(69, 14, 129, 0.15) 1.79%,
    rgba(67, 15, 132, 0.15) 10.72%,
    rgba(61, 18, 140, 0.15) 19.64%,
    rgba(50, 23, 152, 0.15) 28.57%,
    rgba(35, 31, 165, 0.15) 37.5%,
    rgba(40, 63, 179, 0.15) 46.43%,
    rgba(51, 103, 192, 0.15) 55.36%,
    rgba(69, 142, 198, 0.15) 64.29%,
    rgba(90, 170, 197, 0.15) 73.21%,
    rgba(107, 187, 198, 0.15) 82.14%,
    rgba(117, 197, 199, 0.15) 91.07%,
    rgba(121, 199, 198, 0.15) 100%
  );
  border-radius: 8px;
  height: 15.125rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.div`
  ${textXlSemibold};
  font-size: 18px;
  line-height: 28px;
  color: ${receiverTheme.colors.primary["500"]};
  margin-bottom: 4px;
`;

const Text = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["700"]};
  text-align: center;
`;

const Subtitle = styled.div`
  ${textSmallBold};
  color: ${receiverTheme.colors.gray["900"]};
  margin: 1rem 0;
`;

const LogoContainer = styled.div`
  display: flex;
  column-gap: 1.125rem;
  height: 2.5rem;
  margin: 0 3rem;
`;

export default function Info() {
  useRedirectWhenNotSignedIn("/receiver/about");

  return (
    <Root>
      <HeaderSimple.Root>
        <HeaderSimple.Title>About</HeaderSimple.Title>
      </HeaderSimple.Root>
      <Main>
        <AboutBox>
          <Title>Join the Relay Community 🎉</Title>
          <Text>
            Whether you’re a developer, designer, or an early adopter, we’d love
            to have you. Let’s build the future of messaging together.{" "}
          </Text>
          <Subtitle>Stay in the loop with everything Relay</Subtitle>
          <LogoContainer>
            <a href="https://relay.cc" target="_blank" rel="noreferrer">
              <LogoRelay />
            </a>
            <a
              href="https://github.com/relaycc"
              target="_blank"
              rel="noreferrer"
            >
              <LogoGithub />
            </a>
            <a
              href="https://twitter.com/relay_eth"
              target="_blank"
              rel="noreferrer"
            >
              <LogoTwitter />
            </a>
            <a
              href="https://discord.gg/relaycc"
              target="_blank"
              rel="noreferrer"
            >
              <LogoDiscord />
            </a>
            <a
              href="https://mirror.xyz/relaycc.eth"
              target="_blank"
              rel="noreferrer"
            >
              <LogoMirror />
            </a>
          </LogoContainer>
        </AboutBox>
      </Main>
      <FooterNav />
    </Root>
  );
}
