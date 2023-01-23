import {NewMessageHeader} from "@/design/NewMessageHeader";
import {NewMsgInput} from "@/design/NewMsgInput";
import {MsgBox} from "@/design/MsgBox";
import * as Toast from "@/design/Toast";
import styled from "styled-components";
import {useCallback, useState} from "react";
import {textMdSemiBold, textSmallRegular} from "@/design/typography";
import {receiverTheme} from "@/design/receiverTheme";

const Root = styled.div`
  display: flex;
  align-self: flex-end;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px 14px 8px 8px;
  padding: 0 0 16px;
  background: #FFFFFF;

  height: 42.5rem;
  width: 400px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${receiverTheme.colors.gray["200"]};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${receiverTheme.colors.gray["200"]};

  height: 32rem;
  width: 100%;
`;

const NoResultText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 4px;

  margin-top: 3.125rem;
  width: 17.563rem;
  height: 3rem;
`;

const NoResultTitle = styled.div`
  ${textMdSemiBold};
  color: ${receiverTheme.colors.gray["900"]};
  text-align: center;
`;

const NoResultSubtitle = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["400"]};
  text-align: center;
`;

const MsgBoxWrapper = styled.div`
  padding: 8px 0 0;
  width: 92%;
`;

const ToastPosition = styled.div`
  position: absolute;
  bottom: 4.5rem;
  left: 1rem;
`;


export default function NewMessage({
                                       isAddressValid
                                   }: { isAddressValid: boolean }) {

    const [showFailureToast, setShowFailureToast] = useState<boolean>(false);

    const triggerFailureToast = useCallback(() => {
        setShowFailureToast(true);

        setTimeout(() => {
            setShowFailureToast(false);
        }, 3000);
    }, []);

    const clearFailureToast = useCallback(() => {
        setShowFailureToast(false);
    }, [setShowFailureToast]);

    return (
        <Root>
            <HeaderWrapper>
                <NewMessageHeader handleCloseClick={() => {
                }}/>
            </HeaderWrapper>
            <NewMsgInput handleAddingAddress={() => {
            }} placeholder={"search ENS, Lens or Address"}/>
            <Main>

                {!isAddressValid && <NoResultText>
                    <NoResultTitle>No result found</NoResultTitle>
                    <NoResultSubtitle>Please enter a valid ENS, Lens, or Address</NoResultSubtitle>
                </NoResultText>}
            </Main>
            <MsgBoxWrapper>
                <MsgBox handleSendIcon={() => {
                }}/>
            </MsgBoxWrapper>


            {showFailureToast && (
                <ToastPosition>
                    <Toast.Failure.Card
                        initial={{opacity: 0.2}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.2}}
                    >
                        <Toast.Failure.AlertIcon/>
                        <Toast.Failure.Column>
                            <Toast.Failure.Title>Failed to Send Message</Toast.Failure.Title>
                            <Toast.Failure.Subtitle>Check connection and try again.</Toast.Failure.Subtitle>
                        </Toast.Failure.Column>
                        <Toast.Failure.ExitIcon onClick={clearFailureToast}/>
                    </Toast.Failure.Card>
                </ToastPosition>
            )}
        </Root>
    )
}