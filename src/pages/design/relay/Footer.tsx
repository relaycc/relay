import styled from "styled-components";
import {receiverTheme} from "@/design/receiverTheme";
import {FooterBackground} from "@/pages/design/relay/FooterBackground";
import {FooterLink} from "@/pages/design/relay/FooterLink";
import * as Logo from "@/pages/design/relay/Logo"
import * as LogoSocialMedia from "@/pages/design/relay/LogoSocialMedia"

export const Root = styled.div`
  display: flex;
  justify-content: center;
  height: 23.438rem;

  width: 100%;
  //width: 1440px;
`;
export const Wrapper = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 23.438rem;
  padding-top: 3rem;

  width: 86.7%;
  //width: 1249px;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;

  height: 13.188rem;
`;

export const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const CommunityLinkItems = styled(LinkColumn)`
  row-gap: 0;
`;

export const LinkTitle = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 27px;

  color: #ffffff;
  margin-bottom: 0.5rem;
`;

export const SignOff = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${receiverTheme.colors.gray["500"]};

  height: 5.75rem;
`;
export const Copyright = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 27px;

  color: #ffffff;
`;

export const Footer = () => {
    return (
        <Root>
            <FooterBackground/>
            <Wrapper>

                <LinkContainer>
                    <LinkColumn>
                        <LinkTitle>Products</LinkTitle>
                        <FooterLink>Receiver</FooterLink>
                        <FooterLink>Robot</FooterLink>
                        <FooterLink>Directory</FooterLink>
                    </LinkColumn>
                    <LinkColumn>
                        <LinkTitle>Resources</LinkTitle>
                        <FooterLink>XMTP</FooterLink>
                        <FooterLink>Docs</FooterLink>
                    </LinkColumn>
                    <LinkColumn>
                        <LinkTitle>About</LinkTitle>
                        <FooterLink>Careers</FooterLink>
                    </LinkColumn>

                    <LinkColumn>
                        <LinkTitle>Join the Community</LinkTitle>

                        <CommunityLinkItems>
                            <LogoSocialMedia.Logowrap>
                                <LogoSocialMedia.Discord/>
                                <LogoSocialMedia.Label>Discord</LogoSocialMedia.Label>
                            </LogoSocialMedia.Logowrap>
                            <LogoSocialMedia.Logowrap>
                                <LogoSocialMedia.Twitter/>
                                <LogoSocialMedia.Label>Twitter</LogoSocialMedia.Label>
                            </LogoSocialMedia.Logowrap>
                            <LogoSocialMedia.Logowrap>
                                <LogoSocialMedia.Github/>
                                <LogoSocialMedia.Label>Github</LogoSocialMedia.Label>
                            </LogoSocialMedia.Logowrap>
                            <LogoSocialMedia.Logowrap>
                                <LogoSocialMedia.Mirror/>
                                <LogoSocialMedia.Label>Mirror</LogoSocialMedia.Label>
                            </LogoSocialMedia.Logowrap>
                        </CommunityLinkItems>

                    </LinkColumn>
                </LinkContainer>

                <SignOff>
                    <Logo.Logowrap>
                        <Logo.LogomarkWhite/>
                        <Logo.LogotypeWhite/>
                    </Logo.Logowrap>
                    <Copyright>Copyright © 2022</Copyright>
                </SignOff>

            </Wrapper>
        </Root>
    )
}