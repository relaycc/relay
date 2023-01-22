import styled from "styled-components";
import { textXsRegular } from "@/design/typography";

const NewDateDividerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

const Line = styled.div`
  width: 100%;
  border: 0.5px solid #d0d5dd;
`;

const Time = styled.div`
  ${textXsRegular};
  color: #d0d5dd;
  white-space: nowrap;
`;

interface TimeProps {
  date: string;
}

export const NewDateDivider = ({ date }: TimeProps) => {
  return (
    <NewDateDividerContainer>
      <Line />
      <Time>{date}</Time>
      <Line />
    </NewDateDividerContainer>
  );
};
