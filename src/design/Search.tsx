import { useState, ComponentProps } from "react";
import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textSmallRegular } from "@/design/typography";
import { Magnifier } from "@/design/Magnifier";

export const Root = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  column-gap: 0.688rem;

  padding: 10px 8px;
  border-radius: 0.5rem;
  background-color: ${receiverTheme.colors.gray["100"]};
  width: 100%;
`;

export const Input = styled.input`
  ${textSmallRegular};
  background-color: ${receiverTheme.colors.gray["100"]};
  color: ${receiverTheme.colors.gray["900"]};
  border: hidden;

  :focus {
    outline: none;
  }

  ::placeholder {
    ${textSmallRegular};
    color: ${receiverTheme.colors.gray["400"]};
  }

  width: 94%;
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
