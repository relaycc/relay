import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {StatusIcon} from "@/lib/design/StatusIcon";
import {AddressHeader} from "@/lib/design/AddressHeader";
import {Badge} from "@/lib/design/Badge";
import {Copy} from "@/lib/design/Copy";
import {LinkIcon} from "@/lib/design/LinkIcon";
import {textXsMedium} from "@/lib/design/wip/typography";
import {ENSName} from "@/lib/design/ENSName";


const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${receiverTheme.colors.success["50"]};
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  height: 5.375rem;
  //width: 100%;
  width: 380px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const Signal = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${receiverTheme.colors.success["500"]};
`;
const HeaderText = styled.div`
  ${textXsMedium};
  color: ${receiverTheme.colors.success["500"]};
`;


const ConnectionContent = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;


  width: 100%;
`;

const StatusIconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 2.5rem;
  height: 2.5rem;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 0.5rem;
  height: 2.5rem;
  width: 100%;
`;

const RightSide = styled(LeftSide)`
  row-gap: 0.2rem;
  justify-content: flex-end;
  align-items: center;
  height: 3.8rem;

`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ENSID = ({profileScreen, isLoading}: { profileScreen: boolean, isLoading: boolean }) => {

    return (
        <Root>
            <LeftSide>
                <Header>
                    <Signal/>
                    <HeaderText>Connected as: </HeaderText>
                </Header>
                <ConnectionContent>
                    <StatusIconContainer>
                        <StatusIcon size={"lg"} isLoading={isLoading}
                                    src={"https://pyxis.nymag.com/v1/imgs/f47/788/caac0f6d9bc8edc26a8c8b17d69a41e447-02-sherlock.rsquare.w330.jpg"}/>
                    </StatusIconContainer>
                    <UserDetails>
                        <ENSName size={"md"} monoFont={false} isLoading={isLoading} ENSname={"oswidan.eth"}/>
                        <AddressHeader isLoading={isLoading} addressHeader={"4J5bd74H7jgGy2hKL"}/>
                    </UserDetails>
                </ConnectionContent>
            </LeftSide>
            <RightSide>
                <Badge isLoading={isLoading} label={"ETH Network"}/>

                {isLoading ?
                    <IconContainer>
                        <Copy hoverText={""} onCopy={() => {
                            return ("0")
                        }} isLoading={false}/>
                        <LinkIcon/>
                    </IconContainer>
                    : profileScreen &&
                    <IconContainer>
                        <Copy hoverText={""} onCopy={() => {
                            return ("0")
                        }} isLoading={false}/>
                        <LinkIcon/>
                    </IconContainer>
                }
            </RightSide>
        </Root>
    )
}
