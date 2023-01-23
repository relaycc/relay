import styled, {css} from "styled-components";
import {receiverTheme} from "@/design/receiverTheme";
import {LoaderAnimGeneral} from "@/design/LoaderAnimGeneral";
import {textMdRegular} from "@/design/typography";

const Root = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 0.5px solid ${receiverTheme.colors.gray["300"]};

  background: #ffffff;
  width: 100%;
  //width: 360px;
`;

const To = styled.div`
  ${textMdRegular};
  color: ${receiverTheme.colors.gray["400"]};

  width: 6%;
`;

export const TextInput = styled.input<{ isLoading: boolean }>`
  ${textMdRegular};
  border: hidden;
  color: ${receiverTheme.colors.gray["900"]};

  ${({isLoading}) =>
          isLoading &&
          css`
            color: ${receiverTheme.colors.gray["400"]};
          `};

  :focus {
    outline: none;
  }

  width: 75%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.25rem;
  height: 1.25rem;
`;

const AddIcon = styled.div<{ active: boolean }>`
  display: flex;
  align-self: center;
  justify-content: center;

  ${textMdRegular};
  font-size: 1.5rem;
  color: ${receiverTheme.colors.gray["400"]};

  ${({active}) =>
          active &&
          css`
            color: ${receiverTheme.colors.gray["900"]};
          `};
`;

export const NewMsgInput = ({
                                active,
                                isLoading,
                                value,
                            }: {
    active: boolean;
    isLoading: boolean;
    value: string;
}) => {
    if (isLoading) {
        return (
            <Root>
                <To>To: </To>
                <TextInput value={value} isLoading={isLoading}/>
                <IconContainer>
                    <LoaderAnimGeneral/>
                </IconContainer>
            </Root>
        );
    }
    return (
        <Root>
            <To>To: </To>
            <TextInput value={value} isLoading={isLoading}/>
            <IconContainer>
                <AddIcon active={active}>+</AddIcon>
            </IconContainer>
        </Root>
    );
};
