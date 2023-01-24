import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
export { LoaderAnimGeneral } from "@/design/LoaderAnimGeneral";
import { textMdRegular } from "@/design/typography";
import styled, {css} from "styled-components";
import {receiverTheme} from "@/design/receiverTheme";
import {LoaderAnimGeneral} from "@/design/LoaderAnimGeneral";
import {textMdRegular} from "@/design/typography";
import {useState} from "react";

export const Root = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 0.5px solid ${receiverTheme.colors.gray["300"]};
  background: #ffffff;
`;

export const To = styled.div`
  ${textMdRegular};
  color: ${receiverTheme.colors.gray["400"]};
  width: 6%;
`;

export const TextInput = styled.input`
export const TextInput = styled.input<{ loading: boolean }>`
  ${textMdRegular};
  border: hidden;
  color: ${receiverTheme.colors.gray["900"]};

  ${({loading}) =>
          loading &&
          css`
            color: ${receiverTheme.colors.gray["400"]};
          `};

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${receiverTheme.colors.gray["300"]};
    caret-color: auto;
  }

  width: 75%;

  ::placeholder {
    color: ${receiverTheme.colors.gray["300"]};
  }
`;

export const TextInputLoading = styled(TextInput)`
  color: ${receiverTheme.colors.gray["400"]};
`;

export const IconContainer = styled.div`
export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: 1.25rem;
  height: 1.25rem;
`;

export const AddIcon = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;

  ${textMdRegular};
  font-size: 1.5rem;
  color: ${receiverTheme.colors.gray["400"]};
`;

export const AddIconActive = styled(AddIcon)`
  color: ${receiverTheme.colors.gray["900"]};
  ${({active}) =>
          active &&
          css`
            color: ${receiverTheme.colors.gray["900"]};
          `};
`;

export const NewMsgInput = ({
                                handleAddingAddress,
                                placeholder
                            }: {
    placeholder: string;
    handleAddingAddress: () => unknown;
}) => {

    const [to, setTo] = useState("");
    const [iconActive, setIconActive] = useState(false);
    const [loading, setLoading] = useState(false);

    // setIconActive(true) is used when the ENS/Lens/address is found (or chosen from list?)

    if (loading) {
        return (
            <Root>
                <To>To: </To>
                <TextInput defaultValue={to} loading={loading}/>
                <IconContainer>
                    <LoaderAnimGeneral/>
                </IconContainer>
            </Root>
        );
    }

    return (
        <Root>
            <To>To: </To>
            <TextInput defaultValue={to} onChange={() => {
                (e: any) => setTo(e.target.value);
                setLoading(true);
            }
            } loading={loading} placeholder={placeholder}/>
            <IconContainer>
                <AddIcon active={iconActive} onClick={handleAddingAddress}>+</AddIcon>
            </IconContainer>
        </Root>
    );
}