import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";


export const PrimaryButton = styled.button`
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
  border: none;
  cursor: pointer;
  background: ${receiverTheme.colors.primary[500]};
  color: #FFFFFF;
  border-radius: 8px;
  
  :active {
    background-color: ${receiverTheme.colors.primary[700]};
  }
`;