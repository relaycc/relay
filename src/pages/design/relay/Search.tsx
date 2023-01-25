import { useState, ComponentProps } from "react";
import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textSmallRegular } from "@/design/typography";
import { Magnifier } from "@/design/Magnifier";

const Root = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 700px;
  min-height: 40px;
  max-height: 40px;
  padding: 8px 16px;
  gap: 10px;
  border-radius: 0.5rem;
  background: #FFFFFF;
  border: 1px solid #D0D5DD;
`;

const Input = styled.input`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  background: #FFFFFF;
  color: ${receiverTheme.colors.gray["900"]};
  border: hidden;
  width: 100%;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${receiverTheme.colors.gray["400"]};
  }

`;

export const Search = (props: ComponentProps<typeof Input>) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <Root onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
      {active || <Magnifier />}
      <Input {...props} />
    </Root>
  );
};
