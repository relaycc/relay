import styled from "styled-components";
import { ArrowUpCircle } from "@/design/ArrowUpCircle";
import { receiverTheme } from "@/design/receiverTheme";
import { textSmallRegular } from "@/design/typography";

const Root = styled.div`
  display: flex;

  width: 100%;
  //width: 360px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 0.625rem 1rem;
  border-radius: 1.5rem;
  background-color: ${receiverTheme.colors.gray["100"]};
  width: 100%;
`;

const Input = styled.input`
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

export const MsgBox = ({ active }: { active: boolean }) => {
  if (active) {
    return (
      <Root>
        <Wrapper>
          <Input placeholder={"Type a Message"} />
          <ArrowUpCircle active={active} />
        </Wrapper>
      </Root>
    );
  }
  return (
    <Root>
      <Wrapper>
        <Input placeholder={"Type a Message"} />
        <ArrowUpCircle active={active} />
      </Wrapper>
    </Root>
  );
};
