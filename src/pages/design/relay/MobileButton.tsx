import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";


export const MobileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 28px;
  gap: 8px;
  width: 20.5rem;
  height: 3.75rem;
  font-size: 16px;
  border: 1px solid #4236C7;
  cursor: pointer;
  background: ${receiverTheme.colors.primary[500]};
  color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  
  :active {
    background-color: ${receiverTheme.colors.primary[700]};
    border: 1px solid #1C0F90;
  }
`;