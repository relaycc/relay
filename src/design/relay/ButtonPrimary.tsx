import styled from "styled-components";

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
  background: ${(p) => p.theme.colors.primary[500]};
  color: #ffffff;
  border-radius: 8px;

  :active {
    background-color: ${(p) => p.theme.colors.primary[700]};
  }

  :disabled {
    background-color: ${(p) => p.theme.colors.gray[300]};
  }
`;
