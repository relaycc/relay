import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";

export const MenuButtonMobile = () => {
  return (
    <Button>
      Receiver
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 16px;
  padding: 13px 0px;
  border: none;
  cursor: pointer;
  background: ${receiverTheme.colors.primary[100]};
  color: ${receiverTheme.colors.primary[500]};
  border-radius: 8px;
  
  :hover {
    background-color: ${receiverTheme.colors.primary[300]};
  }
`;