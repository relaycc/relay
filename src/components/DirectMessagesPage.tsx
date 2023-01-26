import React, {
  FunctionComponent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import styled from "styled-components";
import * as ENSName from "@/design/ENSName";

export * as Time from "@/design/Time";
import * as Nav from "@/design/Nav";
import * as DMHeader from "@/design/DMHeader";
import { FooterNav } from "./FooterNav";
import { useRouter } from "next/router";
import { useRedirectWhenNotSignedIn } from "@/hooks/useRedirectWhenNotSignedInt";
import { useConnectedWallet } from "@/hooks/useConnectedWallet";
import { EthAddress, Message, useDirectMessage } from "@relaycc/xmtp-hooks";
import * as MsgBundles from "@/design/MsgBundles";
import { useRelayId } from "@/hooks/useRelayId";
import { isEnsName } from "@/lib/isEnsName";
import * as MsgBox from "@/design/MsgBox";
import { Avatar } from "./Avatar";
import { getDisplayDate } from "@/lib/getDisplayDate";
import * as Toast from "@/design/Toast";
import { BackIcon } from "@/design/BackIcon";
import { UserDetails } from "@/design/DMHeader";
import { ButtonMinimize } from "@/design/ButtonMinimize";
import { CloseIcon } from "@/design/CloseIcon";
import { truncateAddress } from "@/lib/truncateAddress";
import * as MsgPreview from "@/design/MsgPreview";
import { Pinned, Unpinned } from "@/design/PinIcon";
import { textSmallRegular } from "@/design/typography";
import * as Skeleton from "@/design/Skeleton";

export interface MessagesBucketProps {
  bucket: {
    peerAddress: string;
    messages: Message[];
  };
}

type MessageBucket = MessagesBucketProps["bucket"];


export const DirectMessagesPage: FunctionComponent<{}> = () => {
  useRedirectWhenNotSignedIn("/receiver/messages");
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [msgValue, setMsgValue] = useState<string>("");
  const router = useRouter();
  const peerAddress = router.query.handle as EthAddress;
  const connectedWallet = useConnectedWallet((s) => s.connectedWallet);
  const { messages, sendMessage } = useDirectMessage({
    clientAddress: connectedWallet?.address as EthAddress,
    conversation: { peerAddress }
  });

  const relayId = useRelayId({ handle: peerAddress });
  const ensName = useMemo(() => {
    if (isEnsName(relayId.ens.data)) {
      return relayId.ens.data;
    } else if (relayId.ens.isLoading) {
      return "Loading...";
    } else {
      return peerAddress;
    }
  }, [peerAddress, relayId]);

  const messageBuckets = useMemo(() => {
    if (!messages.data) {
      return [];
    }
    return getMessageBuckets(messages.data);
  }, [messages]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMsgValue(event.target.value);
    },
    []
  );
  const toggleFailureToast = useCallback(() => {
    setShowFailureToast(!showFailureToast);
  }, [showFailureToast]);
  const toggleInputIsFocused = useCallback(() => {
    setInputIsFocused(!inputIsFocused);
  }, [inputIsFocused]);
  const handleSend = useCallback(() => {
    if (
      !messages?.data ||
      !messages.data.length ||
      msgValue.length === 0 ||
      msgValue.trim().length === 0
    ) {
      return;
    }
    try {
      sendMessage.mutate({
        content: msgValue,
        conversation: messages.data[0].conversation
      });
    } catch (e) {
      toggleFailureToast();
      console.log(e);
      return;
    }
    setMsgValue("");
  }, [msgValue, messages]);
  const messageCount = useMemo(() => messages.data?.length, [messages]);
  const onEnter: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSend();
      }
    },
    [handleSend]
  );
  useEffect(() => {
    const chat = document.getElementById("chatScroll");
    if (!chat) {
      return;
    }
    chat.scrollTop = chat.scrollHeight;
  }, [messages]);
  const navigateBack = useCallback(() => {
    router.push(`/receiver/messages`);
  }, [router]);
  return (
    <Root>
      <DMHeader.Root>
        <DMHeader.LeftSide>
          <BackIcon onClick={navigateBack} />
          <Avatar handle={peerAddress} onClick={() => null} size="md" />
          <UserDetails>
            <DMHeader.NameAndIcon>
              <ENSName.EnsNameMd>{ensName}</ENSName.EnsNameMd>
            </DMHeader.NameAndIcon>
            <DMHeader.AddressHeader.Root>
              {!peerAddress ? (
                <DMHeader.AddressHeader.LoadingDiv />
              ) : (
                <DMHeader.AddressHeader.Container>
                  {truncateAddress(peerAddress)}
                </DMHeader.AddressHeader.Container>
              )}
            </DMHeader.AddressHeader.Root>
          </UserDetails>
        </DMHeader.LeftSide>
        <DMHeader.RightSide>
          {/* TODO Pinned for later implementation */}
          {/*<PinWrapper>{pinned ? <Pinned /> : <Unpinned />}</PinWrapper>*/}
          <ButtonMinimize />
          <CloseIcon />
        </DMHeader.RightSide>
      </DMHeader.Root>

      <ScrollContainer id="chatScroll">
        {messageCount && messageCount < 25 && <HeadWrapper>
          <Avatar handle={peerAddress} onClick={() => null} size="xxxl" />
          <ENSName.EnsNameMd>{ensName}</ENSName.EnsNameMd>
          <Text>
            The very beginning of your end-to-end encrypted conversation
          </Text>
        </HeadWrapper>
        }<MessagesWrapper>
        {messages.isLoading || !messageBuckets ? (
          <>
            <Loading />
            <Loading />
          </>
        ) : (
          messageBuckets.map((bucket, idx) => {
            return (
              <ListMessages
                key={`${bucket.peerAddress}_${idx}`}
                peerAddress={peerAddress}
                bucket={bucket}
              />
            );
          })
        )}
      </MessagesWrapper>
      </ScrollContainer>
      <MsgBoxWrapper>
        <MsgBox.Root>
          <MsgBox.MessageInput
            onChange={handleChange}
            value={msgValue}
            placeholder={"Type a Message"}
            onKeyDown={onEnter}
            onFocus={toggleInputIsFocused} onBlur={toggleInputIsFocused}
          />
          <MsgBox.IconContainer>
            <MsgBox.ArrowUpCircle active={inputIsFocused} onClick={handleSend} />
          </MsgBox.IconContainer>
        </MsgBox.Root>
      </MsgBoxWrapper>
      <FooterNav />
      {showFailureToast && (
        <ToastPosition>
          <Toast.Failure.Card
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}>
            <Toast.Failure.AlertIcon />
            <Toast.Failure.Column>
              <Toast.Failure.Title>Failed to Send Message</Toast.Failure.Title>
              <Toast.Failure.Subtitle>
                Check connection and try again.
              </Toast.Failure.Subtitle>
            </Toast.Failure.Column>
            <Toast.Failure.ExitIcon onClick={toggleFailureToast} />
          </Toast.Failure.Card>
        </ToastPosition>
      )}
    </Root>
  );
};

const ListMessages: FunctionComponent<MessagesBucketProps & { peerAddress: string } & {}> = ({
                                                                                               bucket,
                                                                                               peerAddress
                                                                                             }) => {
  const handle = useMemo(() => {
    if (!bucket || !bucket.messages.length) {
      return "";
    }
    return bucket.messages[0].senderAddress as string;
  }, [bucket]);
  const relayId = useRelayId({ handle });

  const ensName = useMemo(() => {
    if (isEnsName(relayId.ens.data)) {
      return relayId.ens.data;
    } else if (relayId.ens.isLoading) {
      return "Loading...";
    } else {
      return handle;
    }
  }, [handle, relayId]);
  if (peerAddress === bucket.messages[0].senderAddress) {
    return (
      <MsgBundles.Root>
        <MsgBundles.FirstMsgContainer>
          <MsgBundles.StatusIconContainer>
            <Avatar
              handle={[...bucket.messages].reverse()[0].senderAddress}
              onClick={() => {
              }}
              size={"md"}
            />
          </MsgBundles.StatusIconContainer>
          <MsgBundles.UserAndMessage>
            <MsgBundles.NameAndDate>
              <ENSName.EnsNameMonofontLg>{ensName}</ENSName.EnsNameMonofontLg>

              <MsgBundles.Time.Root>
                {getDisplayDate([...bucket.messages].reverse()[0].sent)}
              </MsgBundles.Time.Root>
            </MsgBundles.NameAndDate>
            <MsgBundles.MsgContainer>
              {!bucket.messages ? (
                <MsgPreview.MsgContainer>
                  <MsgPreview.MsgLoading />
                </MsgPreview.MsgContainer>
              ) : (
                <MsgPreview.MsgContainer>
                  {[...bucket.messages].reverse()[0].content as String}
                </MsgPreview.MsgContainer>
              )}
            </MsgBundles.MsgContainer>
          </MsgBundles.UserAndMessage>
        </MsgBundles.FirstMsgContainer>

        {[...bucket.messages]
          .reverse()
          .slice(1)
          .map((i, index) => (
            <MsgBundles.RestOfTheMessages key={index}>
              <MsgBundles.HoveredTimeContainer>
                <MsgBundles.XxsSizedTime>
                  {getDisplayDate(i.sent)}
                </MsgBundles.XxsSizedTime>
              </MsgBundles.HoveredTimeContainer>
              {!bucket.messages ? (
                <MsgPreview.MsgContainer>
                  <MsgPreview.MsgLoading />
                </MsgPreview.MsgContainer>
              ) : (
                <MsgPreview.MsgContainer>
                  {i.content as String}
                </MsgPreview.MsgContainer>
              )}
            </MsgBundles.RestOfTheMessages>
          ))}
      </MsgBundles.Root>
    );
  }
  return (
    <MsgBundles.Root>
      <MsgBundles.FirstMsgContainer>
        <MsgBundles.StatusIconContainer>
          <Avatar
            handle={[...bucket.messages].reverse()[0].senderAddress}
            onClick={() => {
            }}
            size={"md"}
          />
        </MsgBundles.StatusIconContainer>
        <MsgBundles.UserAndMessage>
          <MsgBundles.NameAndDate>
            <ENSName.EnsNameMonofontLgColored>
              {ensName}
            </ENSName.EnsNameMonofontLgColored>

            <MsgBundles.Time.Root>
              {getDisplayDate([...bucket.messages].reverse()[0].sent)}
            </MsgBundles.Time.Root>
          </MsgBundles.NameAndDate>
          <MsgBundles.MsgContainer>
            {!bucket.messages ? (
              <MsgPreview.MsgContainer>
                <MsgPreview.MsgLoading />
              </MsgPreview.MsgContainer>
            ) : (
              <MsgPreview.MsgContainer>
                {[...bucket.messages].reverse()[0].content as String}
              </MsgPreview.MsgContainer>
            )}
          </MsgBundles.MsgContainer>
        </MsgBundles.UserAndMessage>
      </MsgBundles.FirstMsgContainer>

      {[...bucket.messages]
        .reverse()
        .slice(1)
        .map((i, index) => (
          <MsgBundles.RestOfTheMessages key={index}>
            <MsgBundles.HoveredTimeContainer>
              <MsgBundles.XxsSizedTime>
                {getDisplayDate(i.sent)}
              </MsgBundles.XxsSizedTime>
            </MsgBundles.HoveredTimeContainer>
            {!bucket.messages ? (
              <MsgPreview.MsgContainer>
                <MsgPreview.MsgLoading />
              </MsgPreview.MsgContainer>
            ) : (
              <MsgPreview.MsgContainer>
                {i.content as String}
              </MsgPreview.MsgContainer>
            )}
          </MsgBundles.RestOfTheMessages>
        ))}
    </MsgBundles.Root>
  );
};

const isFiveMinuteDifference = (a: Date, b: Date): boolean => {
  return Math.abs(a.getTime() - b.getTime()) > 300000;
};

const getMessageBuckets = (messages: Message[]): MessageBucket[] => {
  const buckets: MessageBucket[] = [];
  const currentBucket = () => buckets[0];
  const currentSender = () => currentBucket()?.peerAddress;
  const currentMessage = () => currentBucket()?.messages[0];
  const currentSent = () => currentMessage()?.sent;

  for (const message of messages) {
    const shouldStartNewBucket = () => {
      if (currentBucket() === undefined) {
        return true;
      }
      if (currentSender() !== message.senderAddress) {
        return true;
      }
      if (currentSent()) {
        if (isFiveMinuteDifference(currentSent(), message.sent)) {
          return true;
        }
      }
    };

    if (shouldStartNewBucket()) {
      buckets.unshift({
        peerAddress: message.senderAddress,
        messages: [message]
      });
    } else {
      buckets[0].messages.push(message);
    }
  }

  return buckets;
};

const Loading = () => (
  <Skeleton.LoadingRootDirect>
    <Skeleton.LoadingCircle />
    <Skeleton.LoadingColumn>
      <Skeleton.LoadingRow>
        <Skeleton.LoadingTitle />
        <Skeleton.LoadingTime />
      </Skeleton.LoadingRow>
      <Skeleton.LoadingSubtitle />
    </Skeleton.LoadingColumn>
  </Skeleton.LoadingRootDirect>
);
const Root = styled.div`
  height: 700px;
  width: 400px;
  margin: 6rem auto;
  box-shadow: 0px 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px;
  position: relative;
  display: flex;
  flex-direction: column;

  ${Nav.Root} {
    margin-top: auto;
  }
`;

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const MsgBoxWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  ${ENSName.EnsNameMd} {
    margin-top: 0.5rem;
  }
`;

const Text = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.gray["500"]};
  text-align: center;
  max-width: 251px;
  ${textSmallRegular};
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray["200"]};

  &::-webkit-scrollbar {
    display: none;
  }
`;
const ToastPosition = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 1rem;
`;
const PinWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;
