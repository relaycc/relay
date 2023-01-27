import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";

export const ButtonPrimary = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 16px;
  height: 40px;
  gap: 8px;
  border: none;
  cursor: pointer;
  background: ${receiverTheme.colors.primary[500]};
  color: #ffffff;
  border-radius: 8px;

  :active {
    background-color: ${receiverTheme.colors.primary[700]};
  }
`;
