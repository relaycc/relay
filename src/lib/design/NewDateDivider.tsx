import styled from "styled-components";
import { textXsRegular } from "@/lib/design/wip/typography";

const NewDateDividerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem
  `;

const Line = styled.div`
  width: 100%;
  border: 0.5px solid #D0D5DD;
`;

const Time = styled.div`
  ${textXsRegular};
  color: #D0D5DD;
  white-space: nowrap;

`

interface TimeProps {
  date: string;
}

export const NewDateDivider = ({date} : TimeProps) => {
  return (
    <NewDateDividerContainer>
      <Line/>
      <Time>{date}</Time>
      <Line/>
    </NewDateDividerContainer>

  );
};

