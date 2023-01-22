import styled from "styled-components";
import Image from "next/image";
import { textXsMedium, textMdSemiBold, textSmallRegular } from "./typography";

export const Requests = () => {
  return (
    <Row>
      <ImageMarginRight
        src="/message-requests.png"
        alt="message requests"
        width={40}
        height={40}
      />
      <Column>
        <Title>Message Requests</Title>
        <Subtitle>From xyz.eth, faris.eth...</Subtitle>
      </Column>
      <Unread>3 Unread</Unread>
    </Row>
  );
};

const ImageMarginRight = styled(Image)`
  margin-right: 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.gray["25"]};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  padding: 0;
`;

const Title = styled.h4`
  ${textMdSemiBold}
  color: ${(props) => props.theme.colors.gray["900"]};
  margin: 0;
  padding: 0;
`;

const Subtitle = styled.h5`
  ${textSmallRegular}
  color: ${(props) => props.theme.colors.gray["500"]};
  margin: 0;
  padding: 0;
`;

const Unread = styled.h6`
  ${textXsMedium}
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.gray["100"]};
  color: ${(props) => props.theme.colors.gray["700"]};
`;
