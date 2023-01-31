import { useRelayId } from "@/hooks/useRelayId";
import { isEnsName } from "@/lib/isEnsName";
import {
  Conversation,
  EthAddress,
  useDirectMessage,
} from "@relaycc/xmtp-hooks";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useMemo } from "react";
import * as MessagePreview from "@/design/MessagePreview";
import { getDisplayDate } from "@/lib/getDisplayDate";
import { useGoToDm } from "@/hooks/useReceiverWindow";
import { LoadingText } from "@/design/relay/LoadingText";

export const ChatsPreview: FunctionComponent<{
  conversation: Conversation;
  address: EthAddress;
}> = ({ conversation, address }) => {
  const goToDm = useGoToDm();
  const {
    messages: { data, isError, isLoading },
  } = useDirectMessage({
    clientAddress: address,
    conversation,
    stream: false,
  });
  const relayId = useRelayId({ handle: conversation.peerAddress });

  const ensName = useMemo(() => {
    if (isEnsName(relayId.ens.data)) {
      return relayId.ens.data;
    } else {
      return relayId.address.data;
    }
  }, [relayId]);

  const lastMessage = data?.[0];

  return (
    <MessagePreview.Root onClick={() => goToDm(conversation)}>
      <MessagePreview.Wrapper>
        <MessagePreview.Avatar
          handle={conversation.peerAddress}
          onClick={() => null}
          size="md"
        />
        <MessagePreview.MsgDetails>
          <MessagePreview.NameAndIcons>
            <MessagePreview.ENSName.EnsNameMonofontMd>
              {ensName}
              {conversation.context?.conversationId.includes("lens.dev") &&
                " 🌿"}
            </MessagePreview.ENSName.EnsNameMonofontMd>
          </MessagePreview.NameAndIcons>
          <MessagePreview.MessageDetails>
            {(() => {
              if (isLoading) {
                return <LoadingText />;
              } else {
                try {
                  return `${lastMessage?.content || "..."}`;
                } catch {
                  return null;
                }
              }
            })()}
          </MessagePreview.MessageDetails>
        </MessagePreview.MsgDetails>
      </MessagePreview.Wrapper>
      <MessagePreview.StyledTime>
        <MessagePreview.Time.Root>
          {(() => {
            try {
              return getDisplayDate(lastMessage?.sent as Date);
            } catch {
              return null;
            }
          })()}
        </MessagePreview.Time.Root>
      </MessagePreview.StyledTime>
    </MessagePreview.Root>
  );
};
