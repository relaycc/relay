import styled from "styled-components";
import { PlusCircle } from "@/design/PlusCircle";
import { textSmallRegular } from "@/design/typography";
import { useEffect, useState } from "react";

const Container = styled.div<{ isNewUser: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 203px;
  padding: 1rem;
  border-radius: ${(props) => props.theme.radius.m};
  background-color: ${(props) => props.theme.colors.primary["100"]};
  pointer-events: none;

  opacity: ${({ isNewUser }) => (!isNewUser ? "0" : "1")};
  transition: all 1s;
  visibility: ${({ isNewUser }) => (!isNewUser ? "hidden" : "visible")};
`;

const Label = styled.div`
  ${textSmallRegular}; //needs to be changed textSmallSemiBold, once its created
  font-weight: 600;

  gap: 0.25rem;
  text-align: center;

  svg {
    vertical-align: text-bottom;
  }
`;

export const NewUserMessage = ({ isNewUser }: { isNewUser: boolean }) => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setTimeout(() => setHidden(true), 3000);
  }, []);

  return (
    <Container isNewUser={isNewUser && !hidden}>
      <Label>
        {"To start a new chat press the  "}
        {<PlusCircle />}
        {"  icon"}
      </Label>
    </Container>
  );
};
