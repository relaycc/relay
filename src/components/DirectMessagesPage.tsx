import React, {
  FunctionComponent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { format } from "date-fns";
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
import { MsgBundlesSent } from "@/design/MsgBundlesSent";
import { Avatar } from "./Avatar";
import { getDisplayDate } from "@/lib/getDisplayDate";
import * as Toast from "@/design/Toast";
import { ToastPosition } from "@/pages/receiver/profile";
import { BackIcon } from "@/design/BackIcon";
import { UserDetails } from "@/design/DMHeader";
import { PinIcon } from "@/design/PinIcon";
import { ButtonMinimize } from "@/design/ButtonMinimize";
import { CloseIcon } from "@/design/CloseIcon";
import { getShortenedAddress } from "@/lib/getShortenedAddress";
import { MessageInput } from "@/design/MsgBox";
// import * as MsgBundles from "@/design/MsgBundles";
import { MsgPreview } from "@/design/MsgPreview";

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
  const [sending, setSending] = useState(false);
  const [msgValue, setMsgValue] = useState<string>("");
  const router = useRouter();
  const peerAddress = router.query.handle as EthAddress;
  const connectedWallet = useConnectedWallet((s) => s.connectedWallet);
  const { messages, sendMessage } = useDirectMessage({
    clientAddress: connectedWallet?.address as EthAddress,
    conversation: { peerAddress },
  });
  const relayId = useRelayId({ handle: peerAddress });
  // TODO:Aaron Need a hook to get ens name or lens name or erh address if none exists
  const ensName = useMemo(() => {
    if (isEnsName(relayId.ens.data)) {
      return relayId.ens.data;
    } else if (relayId.ens.isLoading) {
      return "Loading...";
    } else {
      return peerAddress;
    }
  }, [peerAddress, relayId]);

  const parsedMessages = useMemo(() => {
    if (!messages?.data) {
      return [];
    }
    return messages.data.map((message) => {
      if (parseMessage) {
        return parseMessage(message);
      } else {
        return message;
      }
    });
  }, [messages]);

  const messageBuckets = useMemo(() => {
    if (!parsedMessages) {
      return [];
    }
    return getMessageBuckets(parsedMessages);
  }, [parsedMessages]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMsgValue(event.target.value);
    },
    []
  );
  const toggleFailureToast = useCallback(() => {
    setShowFailureToast(!showFailureToast);
  }, [showFailureToast]);
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
      setSending(true);
      sendMessage.mutate({
        content: msgValue,
        conversation: messages.data[0].conversation,
      });
    } catch (e) {
      setSending(false);

      toggleFailureToast();
      console.log(e);
      return;
    }
    setMsgValue("");
    setSending(false);
  }, [msgValue, messages]);
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
                  {getShortenedAddress(peerAddress)}
                </DMHeader.AddressHeader.Container>
              )}
            </DMHeader.AddressHeader.Root>
          </UserDetails>
        </DMHeader.LeftSide>
        <DMHeader.RightSide>
          <PinIcon pinned={false} hasLoaded={!!peerAddress} />
          <ButtonMinimize />
          <CloseIcon />
        </DMHeader.RightSide>
      </DMHeader.Root>

      <ScrollContainer id="chatScroll">
        <HeadWrapper>
          <Avatar handle={peerAddress} onClick={() => null} size="xl" />
        </HeadWrapper>
        {messageBuckets.map((bucket, idx) => {
          return (
            <ListMessages
              key={`${bucket.peerAddress}_${idx}`}
              peerAddress={peerAddress}
              bucket={bucket}
            />
          );
        })}
      </ScrollContainer>

      <MsgBox.Root>
        <MsgBox.MessageInput
          onChange={handleChange}
          value={msgValue}
          placeholder={"Type a Message"}
          onKeyDown={onEnter}
        />
        <MsgBox.IconContainer>
          <MsgBox.ArrowUpCircle active={!sending} handleClick={handleSend} />
        </MsgBox.IconContainer>
      </MsgBox.Root>

      <FooterNav />
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
    </Root>
  );
};

const ListMessages: FunctionComponent<
  MessagesBucketProps & { peerAddress: string } & {}
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
  console.log("some", bucket.messages);
  if (peerAddress === bucket.messages[0].senderAddress) {
    return (
      <MsgBundles.Root>
        <MsgBundles.FirstMsgContainer>
          <MsgBundles.StatusIconContainer>
            <Avatar
              handle={[...bucket.messages].reverse()[0].senderAddress}
              onClick={() => {}}
              size={"md"}
            />
          </MsgBundles.StatusIconContainer>
          <MsgBundles.UserAndMessage>
            <MsgBundles.NameAndDate>
              <ENSName.EnsNameMonofontLgColored>
                {ensName}
              </ENSName.EnsNameMonofontLgColored>

              <MsgBundles.Time.Root>
                {[...bucket.messages].reverse()[0].time}
                {/*{getDisplayDate([...bucket.messages].reverse()[0].sent)}*/}
              </MsgBundles.Time.Root>
            </MsgBundles.NameAndDate>
            <MsgBundles.MsgContainer>
              <MsgPreview
                isLoading={false}
                msg={[...bucket.messages].reverse()[0].content}
              />
            </MsgBundles.MsgContainer>
          </MsgBundles.UserAndMessage>
        </MsgBundles.FirstMsgContainer>

        {[...bucket.messages]
          .reverse()
          .slice(1)
          .map((i, index) => (
            <MsgBundles.RestOfTheMessages key={index}>
              <MsgBundles.HoveredTimeContainer>
                <MsgBundles.XxsSizedTime>{i.time}</MsgBundles.XxsSizedTime>
              </MsgBundles.HoveredTimeContainer>
              <MsgPreview isLoading={false} msg={i.content} />
            </MsgBundles.RestOfTheMessages>
          ))}
      </MsgBundles.Root>
    );

    // return (
    //   <MsgBundlesReceived
    //     ensName={ensName}
    //     isLoading={false}
    //     messages={[...bucket.messages].reverse()}
    //     isGray={isGray}
    //   />
    // );
  }
  return (
    <MsgBundles.Root>
      <MsgBundles.FirstMsgContainer>
        <MsgBundles.StatusIconContainer>
          <Avatar
            handle={[...bucket.messages].reverse()[0].senderAddress}
            onClick={() => {}}
            size={"md"}
          />
        </MsgBundles.StatusIconContainer>
        <MsgBundles.UserAndMessage>
          <MsgBundles.NameAndDate>
            <ENSName.EnsNameMonofontLg>{ensName}</ENSName.EnsNameMonofontLg>

            <MsgBundles.Time.Root>
              <MsgBundles.XxsSizedTime>
                {[...bucket.messages].reverse()[0].time}
              </MsgBundles.XxsSizedTime>

              {/*{getDisplayDate([...bucket.messages].reverse()[0].sent)}*/}
            </MsgBundles.Time.Root>
          </MsgBundles.NameAndDate>
          <MsgBundles.MsgContainer>
            <MsgPreview
              isLoading={false}
              msg={[...bucket.messages].reverse()[0].content}
            />
          </MsgBundles.MsgContainer>
        </MsgBundles.UserAndMessage>
      </MsgBundles.FirstMsgContainer>

      {[...bucket.messages]
        .reverse()
        .slice(1)
        .map((i, index) => (
          <MsgBundles.RestOfTheMessages key={index}>
            <MsgBundles.HoveredTimeContainer>
              <MsgBundles.XxsSizedTime>{i.time}</MsgBundles.XxsSizedTime>
            </MsgBundles.HoveredTimeContainer>
            <MsgPreview isLoading={false} msg={i.content} />
          </MsgBundles.RestOfTheMessages>
        ))}
    </MsgBundles.Root>
  );
};

const parseMessage = (message: Message) => {
  return {
    id: message.id,
    senderAddress: message.senderAddress,
    content: message.content,
    conversation: message.conversation,
    time: getDisplayDate(message.sent),
  };
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
        messages: [message],
      });
    } else {
      buckets[0].messages.push(message);
    }
  }

  return buckets;
};

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

const HeadWrapper = styled.div`
  margin-top: 1rem;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 0.5rem;
`;
