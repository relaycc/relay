import styled from "styled-components";
import {ArrowUpCircle} from "@/design/ArrowUpCircle";
import {receiverTheme} from "@/design/receiverTheme";
import {textSmallRegular} from "@/design/typography";
import {useState} from "react";
import {LoaderAnimGeneral} from "@/design/LoaderAnimGeneral";
import {IconContainer} from "@/design/NewMsgInput";


const Root = styled.div`
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

const SendIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const MsgBox = ({handleSendIcon}: { handleSendIcon: () => unknown }) => {

    const [message, setMessage] = useState("");
    const [iconActive, setIconActive] = useState(false);
    const [loading, setLoading] = useState(false);

// setLoading(true) is used when message is being sent

    if (loading) {
        return (
            <Root>
                <Input defaultValue={message}/>
                <IconContainer>
                    <LoaderAnimGeneral/>
                </IconContainer>
            </Root>
        );
    }
    return (
        <Root>
            <Input defaultValue={""} placeholder={"Type a Message"}
                   onChange={() => {
                       (e: any) => setMessage(e.target.value);
                       setIconActive(true);
                   }}/>
            <SendIconWrapper onClick={() => handleSendIcon}>
                <ArrowUpCircle active={iconActive}/>
            </SendIconWrapper>
        </Root>
    );
};

