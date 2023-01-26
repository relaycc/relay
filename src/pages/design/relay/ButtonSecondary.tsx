import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";


export const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 138px;
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 16px;
  gap: 8px;
  cursor: pointer;
  background: #FFFFFF;
  color: ${receiverTheme.colors.primary[500]};
  border: 2px solid #4236C7;
  border-radius: 8px;
  
  :active {
    background-color: ${receiverTheme.colors.primary[100]};
  }
`;