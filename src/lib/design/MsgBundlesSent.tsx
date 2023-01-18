import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {spaceMonoMdBold, textSmallRegular, textXsRegular} from "@/lib/design/wip/typography";

const Root = styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 0.5rem;
  background-color: #FFFFFF;
  padding: 0 1rem;
  margin-top: 1.4rem;
  
  //width: 100%;
  width: 360px;
  min-height: 2.75rem;
  
  :hover{
    background-color: ${receiverTheme.colors.gray["100"]};
  }
`;

const StatusIconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
`;

/**/
const Img= styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
`;

const EnsName = styled.div`
  ${spaceMonoMdBold};
  font-size: 14px;
  line-height: 20px;
  color: ${receiverTheme.colors.primary["500"]};
`;

const Date = styled.div`
  ${textXsRegular};
  color: ${receiverTheme.colors.gray["400"]};
`;

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Msg = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["900"]};
`;

export const MsgBundlesSent = (
    {
        ensName,
        message,
        statusIcon,
        date
    }: {
        ensName:string,
        message:Array<string>,
        statusIcon:string,
        date:string
    }) => {

    return (
        <Root>
            <StatusIconContainer>
                <Img src={statusIcon} />
            </StatusIconContainer>
            <MainContainer>
                <NameAndDate>
                    <EnsName>{ensName}</EnsName>
                    <Date>{date}</Date>
                </NameAndDate>
                <MsgContainer>
                    {message.map((i, index) => (
                    <Msg key={index}>{i}</Msg>
                    ))}
                </MsgContainer>
            </MainContainer>
        </Root>

    )
}