import styled from "styled-components";
import { receiverTheme } from "@/lib/design/wip/receiverTheme";
import { displayXsBold } from "@/lib/design/wip/typography";
import { BackIcon } from "@/lib/design/BackIcon";
import { Edit } from "@/lib/design/Edit";


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 5.5rem;
  border-bottom: 1px solid ${receiverTheme.colors.gray["200"]};
  background-color: #FFFFFF;

  width: 100%;
`;

const Title = styled.div`
  ${displayXsBold};
  color: ${receiverTheme.colors.gray["900"]};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const HeaderRequests = () => {
  return (
    <Container>
      <TitleContainer>
        <BackIcon/>
        <Title>Requests</Title>
      </TitleContainer>
      <Edit/>
    </Container>
  );
};

