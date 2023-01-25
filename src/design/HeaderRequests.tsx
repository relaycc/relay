import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { displayXsBold } from "@/design/typography";


export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 5.5rem;
  border-bottom: 1px solid ${receiverTheme.colors.gray["200"]};
  background-color: #ffffff;

  width: 100%;
`;

export const Title = styled.div`
  ${displayXsBold};
  color: ${receiverTheme.colors.gray["900"]};
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;