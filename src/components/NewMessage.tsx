import { MsgBox } from "@/design/MsgBox";
import * as NewMsgInput from "@/design/NewMsgInput";
import * as Toast from "@/design/Toast";
import * as NewMessageHeader from "@/design/NewMessageHeader";
import styled from "styled-components";
import { useCallback, useState } from "react";
import { textMdSemiBold, textSmallRegular } from "@/design/typography";
import { receiverTheme } from "@/design/receiverTheme";
import { motion } from "framer-motion";

const Root = styled(motion.div)`
  display: flex;
  align-self: flex-end;
  flex-grow: 1;
  flex-direction: column;
  box-shadow: 0 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px 14px 8px 8px;
  padding: 0 0 16px;
  background: #ffffff;
  height: 42.5rem;
  width: 400px;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const UnstyledForm = styled.form`
  margin: 0;
  padding: 0;
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
  padding: 1rem 0.5rem 0 0.5rem;
`;

const ToastPosition = styled.div`
  position: absolute;
  bottom: 4.5rem;
  left: 1rem;
`;

export const NewMessage = ({ doClose }: { doClose: () => unknown }) => {
  const [showFailureToast, setShowFailureToast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [isAddressValid, setIsAddressValid] = useState<boolean | null>(null);

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
    <Root
      initial={{ maxHeight: 0 }}
      animate={{ maxHeight: "100vh" }}
      transition={{ duration: 0.5 }}
    >
      <HeaderWrapper>
        <NewMessageHeader.Root>
          <NewMessageHeader.Title>New Message</NewMessageHeader.Title>
          <NewMessageHeader.Button>
            <NewMessageHeader.CloseIcon onClick={doClose} />
          </NewMessageHeader.Button>
        </NewMessageHeader.Root>
      </HeaderWrapper>
      <UnstyledForm
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          setTimeout(() => {
            setIsAddressValid(false);
            setIsLoading(false);
          }, 3000);
        }}
      >
        <NewMsgInput.Root
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
        >
          <NewMsgInput.To>To: </NewMsgInput.To>
          <NewMsgInput.TextInput
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsAddressValid(null);
              clearFailureToast();
            }}
            autoFocus={true}
            value={inputValue || ""}
            placeholder="Enter ENS name or address"
          />
          <NewMsgInput.IconContainer>
            {(() => {
              if (isLoading) {
                return <NewMsgInput.LoaderAnimGeneral />;
              } else if (inputIsFocused) {
                return <NewMsgInput.AddIconActive>+</NewMsgInput.AddIconActive>;
              } else {
                return <NewMsgInput.AddIcon>+</NewMsgInput.AddIcon>;
              }
            })()}
          </NewMsgInput.IconContainer>
        </NewMsgInput.Root>
      </UnstyledForm>
      <Main>
        {isAddressValid === false && (
          <NoResultText>
            <NoResultTitle>No result found</NoResultTitle>
            <NoResultSubtitle>
              Please enter a valid ENS, Lens, or Address
            </NoResultSubtitle>
          </NoResultText>
        )}
      </Main>
      <MsgBoxWrapper>
        <MsgBox active={false} />
      </MsgBoxWrapper>

      {showFailureToast && (
        <ToastPosition>
          <Toast.Failure.Card
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Toast.Failure.AlertIcon />
            <Toast.Failure.Column>
              <Toast.Failure.Title>Failed to Send Message</Toast.Failure.Title>
              <Toast.Failure.Subtitle>
                Check connection and try again.
              </Toast.Failure.Subtitle>
            </Toast.Failure.Column>
            <Toast.Failure.ExitIcon onClick={clearFailureToast} />
          </Toast.Failure.Card>
        </ToastPosition>
      )}
    </Root>
  );
};
