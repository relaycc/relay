import styled from "styled-components";

const NewDateDividerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem
  `;

const Line = styled.div`
  width: 10.188rem;
  height: 0;
  border: 0.5px solid #D0D5DD;
`;

const Time = styled.div`
  color: #D0D5DD;
`

export const NewDateDivider = () => {
  return (
    <NewDateDividerContainer>
      <Line/>
      <Time>Today</Time>
      <Line/>
    </NewDateDividerContainer>

  );
};

