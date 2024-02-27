import React, {
  FunctionComponent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import * as ENSName from "@/design/ENSName";

export * as Time from "@/design/Time";
import * as DMHeader from "@/design/DMHeader";
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
import { CloseIcon } from "@/design/CloseIcon";
import { truncateAddress } from "@/lib/truncateAddress";
import * as MsgPreview from "@/design/MsgPreview";
import { textSmallRegular, textMdSemiBold } from "@/design/typography";
import * as Skeleton from "@/design/Skeleton";
import { useReceiverWindow } from "@/hooks/useReceiverWindow";
import {
  Conversation,
  useXmtpClient,
  useFetchPeerOnNetwork,
} from "@relaycc/xmtp-hooks";
import { useAccount } from "wagmi";
import { AuthMenu } from "./AuthMenu";
import { LoaderAnimGeneral } from "@/design/MsgBox";
import { useReadWriteValue } from "@/hooks/useReadWriteValue";
import Head from "next/head";
import { useEditor } from "../prosemirror/useEditor";
import { EditorView } from "prosemirror-view";
import { MarkdownRenderer } from "@/prosemirror/MarkdownRenderer";

export interface MessagesBucketProps {
  bucket: {
    peerAddress: string;
    messages: Message[];
  };
}

type MessageBucket = MessagesBucketProps["bucket"];

export const DirectMessagesPage: FunctionComponent<{
  conversation: Conversation;
}> = ({ conversation }) => {
  const viewRef = useRef<EditorView | null>(null);
  const { content, isEmpty, handleUploadAttachment, clearEditor } =
    useEditor(viewRef);

  const { address } = useAccount();
  const xmtpClient = useXmtpClient({
    clientAddress: address as EthAddress,
  });
  const isSignedIn =
    xmtpClient.data !== null &&
    xmtpClient.data !== undefined &&
    xmtpClient.data.address() === address;
  const [showAuthMenu, setShowAuthMenu] = useState(!isSignedIn);
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [messageIsSending, setMessageIsSending] = useState(false);
  const [lastMessageId, setLastMessageId] = useState("");

  const { page, setPage } = useReceiverWindow();
  const peerAddress = conversation.peerAddress as EthAddress;
  const { messages, sendMessage } = useDirectMessage({
    clientAddress: address as EthAddress,
    conversation,
  });
  const peerOnNetwork = useFetchPeerOnNetwork({
    clientAddress: address as EthAddress,
    peerAddress: conversation.peerAddress,
  });
  useEffect(() => {
    if (!messages?.data) {
      return;
    }
    const newId = messages.data[0]?.id;
    if (messageIsSending && newId !== lastMessageId) {
      setMessageIsSending(false);
    }
    setLastMessageId(newId);
  }, [messages, lastMessageId, messageIsSending]);

  const { acceptConversations, isAccepted } = useReadWriteValue({
    clientAddress: address as EthAddress,
  });

  const accepted = useMemo(() => {
    return isAccepted({ conversation: { peerAddress } });
  }, [isAccepted, peerAddress]);

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

  const toggleFailureToast = useCallback(() => {
    setShowFailureToast(!showFailureToast);
  }, [showFailureToast]);
  const toggleInputIsFocused = useCallback(() => {
    setInputIsFocused(!inputIsFocused);
  }, [inputIsFocused]);

  const msgInvalid = useMemo(() => {
    return content.length === 0 || content.trim().length === 0;
  }, [content]);

  const handleRichTextSend = useCallback(() => {
    if (content.length === 0 || content.trim().length === 0) {
      return;
    }
    setMessageIsSending(true);
    try {
      sendMessage.mutate({
        content,
        conversation,
      });
      !accepted && acceptConversations({ conversations: [conversation] });
      clearEditor();
    } catch (e) {
      toggleFailureToast();
      setMessageIsSending(false);
      return;
    }
  }, [content, messages, peerAddress, accepted, conversation]);

  const messageCount = useMemo(() => messages.data?.length, [messages]);
  const onEnter: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        handleRichTextSend();
      }
    },
    [handleRichTextSend]
  );
  useEffect(() => {
    const chat = document.getElementById("chatScroll");
    if (!chat) {
      return;
    }
    chat.scrollTop = chat.scrollHeight;
  }, [messages]);
  const navigateBack = useCallback(() => {
    setPage({ id: "messages" });
  }, [setPage]);

  const fileRef = useRef<HTMLInputElement>(null);
  const callFileInput = useCallback(() => {
    if (!fileRef.current) {
      return;
    }
    fileRef.current.click();
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://prosemirror.net/css/editor.css" />
      </Head>
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
          <CloseIcon onClick={() => setPage(null)} />
        </DMHeader.RightSide>
      </DMHeader.Root>

      <ScrollContainer id="chatScroll">
        {peerOnNetwork.data === false && (
          <NoResultText>
            <NoResultTitle>
              {"User hasn't joined the XMTP network."}
            </NoResultTitle>
            <NoResultSubtitle>
              Until they join the network, they cannot receive messages. Learn
              more{" "}
              <PurpleLink
                href="https://xmtp.org/docs/dev-concepts/account-signatures"
                target="_blank"
                rel="norefferer"
              >
                here
              </PurpleLink>
              .
            </NoResultSubtitle>
          </NoResultText>
        )}
        {peerOnNetwork.data !== null &&
          peerOnNetwork.data !== undefined &&
          messageCount !== undefined &&
          messageCount < 25 && (
            <HeadWrapper>
              <Avatar handle={peerAddress} onClick={() => null} size="xxxl" />
              <ENSName.EnsNameMd>{ensName}</ENSName.EnsNameMd>
              <Text>
                The very beginning of your end-to-end encrypted conversation
              </Text>
            </HeadWrapper>
          )}
        <MessagesWrapper>
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
      <MsgBox.Root>
        <MsgBox.IconContainer>
          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            accept="image/png, image/gif, image/jpeg"
            onChange={handleUploadAttachment}
          />
          <MsgBox.AttachmentIcon onClick={callFileInput} />
        </MsgBox.IconContainer>
        <MsgBox.ProsemirrorEditorInput
          onBlur={toggleInputIsFocused}
          onFocus={toggleInputIsFocused}
          viewRef={viewRef}
          isEmpty={isEmpty}
          onEnter={onEnter}
        />
        <MsgBox.IconContainer>
          {messageIsSending ? (
            <LoaderAnimGeneral />
          ) : (
            <MsgBox.ArrowUpCircle
              isActive={inputIsFocused && !msgInvalid}
              onClick={handleRichTextSend}
            />
          )}
        </MsgBox.IconContainer>
      </MsgBox.Root>
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
            <Toast.Failure.ExitIcon onClick={toggleFailureToast} />
          </Toast.Failure.Card>
        </ToastPosition>
      )}
      {showAuthMenu && <AuthMenu doClose={() => setShowAuthMenu(false)} />}
    </>
  );
};

const ListMessagesComponent: FunctionComponent<
  MessagesBucketProps & { peerAddress: string }
> = ({ bucket, peerAddress }) => {
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

  const filteredBucket = useMemo(
    (): {
      peerAddress: string;
      messages: Message[];
    } => ({
      peerAddress: bucket.peerAddress,
      messages: bucket.messages.filter(
        (mes) => typeof mes.content === "string"
      ),
    }),
    [bucket]
  );

  if (!filteredBucket.messages.length) {
    return null;
  }

  if (peerAddress === filteredBucket.messages[0].senderAddress) {
    return (
      <MsgBundles.Root>
        <MsgBundles.FirstMsgContainer>
          <MsgBundles.StatusIconContainer>
            <Avatar
              handle={[...filteredBucket.messages].reverse()[0].senderAddress}
              onClick={() => console.log}
              size={"md"}
            />
          </MsgBundles.StatusIconContainer>
          <MsgBundles.UserAndMessage>
            <MsgBundles.NameAndDate>
              <ENSName.EnsNameMonofontLg>{ensName}</ENSName.EnsNameMonofontLg>

              <MsgBundles.Time.Root>
                {getDisplayDate([...filteredBucket.messages].reverse()[0].sent)}
              </MsgBundles.Time.Root>
            </MsgBundles.NameAndDate>
            <MsgBundles.MsgContainer>
              {!filteredBucket.messages ? (
                <MsgPreview.MsgContainer>
                  <MsgPreview.MsgLoading />
                </MsgPreview.MsgContainer>
              ) : (
                <MsgPreview.MsgContainer>
                  <MarkdownRenderer
                    content={
                      [...filteredBucket.messages].reverse()[0]
                        .content as string
                    }
                  />
                </MsgPreview.MsgContainer>
              )}
            </MsgBundles.MsgContainer>
          </MsgBundles.UserAndMessage>
        </MsgBundles.FirstMsgContainer>

        {[...filteredBucket.messages]
          .reverse()
          .slice(1)
          .map((i, index) => (
            <Messages
              key={index}
              i={i}
              index={index}
              messages={filteredBucket.messages}
            />
          ))}
      </MsgBundles.Root>
    );
  }

  return (
    <MsgBundles.Root>
      <MsgBundles.FirstMsgContainer>
        <MsgBundles.StatusIconContainer>
          <Avatar
            handle={[...filteredBucket.messages].reverse()[0].senderAddress}
            onClick={() => console.log}
            size={"md"}
          />
        </MsgBundles.StatusIconContainer>
        <MsgBundles.UserAndMessage>
          <MsgBundles.NameAndDate>
            <ENSName.EnsNameMonofontLgColored>
              {ensName}
            </ENSName.EnsNameMonofontLgColored>

            <MsgBundles.Time.Root>
              {getDisplayDate([...filteredBucket.messages].reverse()[0].sent)}
            </MsgBundles.Time.Root>
          </MsgBundles.NameAndDate>
          <MsgBundles.MsgContainer>
            {!filteredBucket.messages ? (
              <MsgPreview.MsgContainer>
                <MsgPreview.MsgLoading />
              </MsgPreview.MsgContainer>
            ) : (
              <MsgPreview.MsgContainer>
                <MarkdownRenderer
                  content={
                    [...filteredBucket.messages].reverse()[0].content as string
                  }
                />
              </MsgPreview.MsgContainer>
            )}
          </MsgBundles.MsgContainer>
        </MsgBundles.UserAndMessage>
      </MsgBundles.FirstMsgContainer>

      {[...filteredBucket.messages]
        .reverse()
        .slice(1)
        .map((i, index) => (
          <Messages
            key={index}
            i={i}
            index={index}
            messages={filteredBucket.messages}
          />
        ))}
    </MsgBundles.Root>
  );
};

const ListMessages = React.memo(ListMessagesComponent, (prev, next) => {
  return prev.bucket.messages.length === next.bucket.messages.length;
});

const MessagesComponent: FunctionComponent<{
  messages: Message[];
  i: Message;
  index: number;
}> = ({ messages, i, index }) => (
  <MsgBundles.RestOfTheMessages key={index}>
    <MsgBundles.HoveredTimeContainer>
      <MsgBundles.XxsSizedTime>
        {getDisplayDate(i.sent, true)}
      </MsgBundles.XxsSizedTime>
    </MsgBundles.HoveredTimeContainer>
    {!messages ? (
      <MsgPreview.MsgContainer>
        <MsgPreview.MsgLoading />
      </MsgPreview.MsgContainer>
    ) : (
      <MsgPreview.MsgContainer>
        <MarkdownRenderer content={i.content as string} />
      </MsgPreview.MsgContainer>
    )}
  </MsgBundles.RestOfTheMessages>
);

const Messages = React.memo(MessagesComponent, (prev, next) => {
  return prev.i.content === next.i.content;
});

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
        messages: [message],
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

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

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
  color: ${(p) => p.theme.colors.gray["900"]};
  text-align: center;
`;

const NoResultSubtitle = styled.div`
  ${textSmallRegular};
  color: ${(p) => p.theme.colors.gray["400"]};
  text-align: center;
`;

const PurpleLink = styled.a`
  color: ${(props) => props.theme.colors.primary["700"]};
  font-weight: bold;
`;
