import styled from "styled-components";
import { receiverTheme } from "@/lib/design/wip/receiverTheme";
import { displayXsBold } from "@/lib/design/wip/typography";

const Container = styled.div`
  display: flex;
  align-items: center;
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

export const HeaderAbout = () => {
  return (
    <Container>
      <Title>About</Title>
    </Container>

  );
};