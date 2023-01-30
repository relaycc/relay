import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import * as MsgBox from "@/design/MsgBox";
import * as NewMsgInput from "@/design/NewMsgInput";
import * as NewMessageHeader from "@/design/NewMessageHeader";
import { textMdSemiBold, textSmallRegular } from "@/design/typography";
import { receiverTheme } from "@/design/receiverTheme";
import { motion } from "framer-motion";
import { EthAddress, isEthAddress, useSendMessage } from "@relaycc/xmtp-hooks";
import { isEnsName } from "@/lib/isEnsName";
import { fetchAddressFromEns } from "@/hooks/useAddressFromEns";
import { useGoToDm } from "@/hooks/useReceiverWindow";
import { Avatar } from "./Avatar";
import { truncateAddress } from "@/lib/truncateAddress";

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
  margin-top: 4rem;
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

const PushDown = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type States =
  | {
      id: "waiting for input";
    }
  | {
      id: "invalid input";
    }
  | {
      id: "loading";
    }
  | {
      id: "input has address";
      peerAddress: string;
    }
  | {
      id: "input does not have an address";
    }
  | {
      id: "address is on network";
    };

export const NewMessage = ({
  doClose,
  clientAddress,
}: {
  doClose: () => unknown;
  clientAddress: EthAddress;
}) => {
  const goToDm = useGoToDm();
  const [state, setState] = useState<States>({ id: "waiting for input" });
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);

  const [messageInputIsFocused, setMessageInputIsFocused] =
    useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const sendMessage = useSendMessage({ clientAddress });

  const send = useCallback(async () => {
    if (state.id !== "input has address") {
      return;
    } else {
      sendMessage.mutate({
        conversation: {
          peerAddress: state.peerAddress as EthAddress,
        },
        content: inputMessage,
      });
      goToDm({ peerAddress: state.peerAddress as EthAddress });
    }
  }, [goToDm, inputMessage, sendMessage, state.id]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        send();
      }
    },
    [send]
  );

  return (
    <Root
      key="newMessage"
      initial={{ maxHeight: "0" }}
      animate={{ top: "1rem", maxHeight: "100vh" }}
      exit={{ top: "100%" }}
      transition={{ duration: 0.3 }}
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
        onSubmit={async (e) => {
          e.preventDefault();
          if (!isEnsName(inputValue) && !isEthAddress(inputValue)) {
            setState({ id: "invalid input" });
            return;
          } else {
            if (isEthAddress(inputValue)) {
              setState({ id: "input has address", peerAddress: inputValue });
              return;
            } else {
              setState({ id: "loading" });
              const peerAddress = await fetchAddressFromEns(inputValue);
              if (peerAddress === null) {
                setState({ id: "input does not have an address" });
                return;
              } else {
                setState({ id: "input has address", peerAddress });
                if (inputRef.current === null) {
                  console.warn("inputRef.current is null");
                } else {
                  inputRef.current.focus();
                }
                return;
              }
            }
          }
        }}
      >
        <NewMsgInput.Root
          isError={state.id === "invalid input"}
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
        >
          <NewMsgInput.To>To: </NewMsgInput.To>

          <NewMsgInput.TextInput
            onChange={(e) => {
              setState({ id: "waiting for input" });
              setInputValue(e.target.value);
            }}
            autoFocus={true}
            value={inputValue || ""}
            placeholder="Enter ENS name or address"
          />
          <NewMsgInput.IconContainer
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => null}
          >
            {(() => {
              if (state.id === "loading") {
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
        {state.id === "input does not have an address" && (
          <NoResultText>
            <NoResultTitle>No result found</NoResultTitle>
            <NoResultSubtitle>
              {/* TODO Dont forget to update this text when we support Lens as well, design says enter "ENS, Lens or Address"*/}
              Please enter a valid ENS or Address
            </NoResultSubtitle>
          </NoResultText>
        )}
        {state.id === "input has address" && (
          <PushDown>
            <Avatar size="xxxl" handle={inputValue} onClick={() => null} />
            <p>{truncateAddress(state.peerAddress, 20)}</p>
          </PushDown>
        )}
      </Main>
      <MsgBoxWrapper>
        <MsgBox.Root
          onFocus={() => setMessageInputIsFocused(true)}
          onBlur={() => setMessageInputIsFocused(false)}
        >
          <MsgBox.MessageInput
            disabled={state.id !== "input has address"}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            autoFocus={true}
            value={inputMessage}
            placeholder={(() => {
              if (state.id !== "input has address") {
                return "...";
              } else {
                return `Send a message to ${truncateAddress(
                  state.peerAddress,
                  6
                )}`;
              }
            })()}
          />
          <MsgBox.IconContainer onClick={send}>
            {(() => {
              if (sendMessage.isLoading) {
                return <MsgBox.LoaderAnimGeneral />;
              } else {
                return (
                  <MsgBox.ArrowUpCircle isActive={messageInputIsFocused} />
                );
              }
            })()}
          </MsgBox.IconContainer>
        </MsgBox.Root>
      </MsgBoxWrapper>
    </Root>
  );
};
