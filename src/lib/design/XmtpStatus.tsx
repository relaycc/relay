import styled, { css } from "styled-components";
import { XmtpIcon } from "@/lib/design/XmtpIcon";
import { spaceMonoXsRegular, textMdSemiBold } from "@/lib/design/wip/typography";
import { LogoutIcon } from "@/lib/design/LogoutIcon";
import { Badge } from "@/lib/design/Badge";

const ComponentRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem 1rem;
  border-radius: ${(props) => props.theme.radius.m};
  background-color: ${(props) => props.theme.colors.primary["100"]};
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
`

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`

const RowItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`

const XmtpTitleWrapper = styled.div<{loaded: boolean}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
  
  ${({loaded}) => !loaded && css`
    ${XmtpTitle} {
      background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
      mix-blend-mode: multiply;
      border-radius: 6px;
      width: 8rem;
      height: 1.5rem;
    }
    ${XmtpVersion} {
      background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
      mix-blend-mode: multiply;
      border-radius: 6px;
      width: 5rem;
      height: 1rem;
    }
  `}
`

const XmtpTitle = styled.div`
  ${textMdSemiBold};
`

const XmtpVersion = styled.div`
  ${spaceMonoXsRegular};
  color: ${(props) => props.theme.colors.gray["500"]};
`

export const XmtpStatus = ({hasPageDataLoaded} : {hasPageDataLoaded: boolean}) => {
  return (
    <ComponentRoot>
      <Row>
        <XmtpIcon/>
        <RowItem>
          <XmtpTitleWrapper loaded={hasPageDataLoaded}>
            <XmtpTitle>
              {hasPageDataLoaded ? "XMTP signed in" : ""}
            </XmtpTitle>
            <XmtpVersion>
              {hasPageDataLoaded ? "xmtp-js x7.7.1" : ""}
            </XmtpVersion>
          </XmtpTitleWrapper>
          <Badge isLoading={hasPageDataLoaded} label={"DEV"}/>
        </RowItem>
        <IconWrapper>
          <LogoutIcon />
        </IconWrapper>
      </Row>
    </ComponentRoot>
  )
}
