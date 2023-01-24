import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
export { LoaderAnimGeneral } from "@/design/LoaderAnimGeneral";
import { textMdRegular } from "@/design/typography";

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
  ${textMdRegular};
  border: hidden;
  color: ${receiverTheme.colors.gray["900"]};
  :focus {
    outline: none;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
`;
