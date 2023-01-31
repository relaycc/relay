import { useMemo } from "react";
import * as MessagePreview from "@/design/MessagePreview";
import * as Request from "@/design/Request";
import * as Badge from "@/design/Badge";
import { MsgRequestsIcon } from "@/design/Requests";
import { useGoToRequests } from "@/hooks/useReceiverWindow";
import { useReadWriteValue } from "@/hooks/useReadWriteValue";
import { useAccount } from "wagmi";
import { useXmtpClient, EthAddress } from "@relaycc/xmtp-hooks";
import { LoaderAnimInitialization } from "@/design/LoaderAnimInitialization";
import { truncateAddress } from "@/lib/truncateAddress";
import { LoadingText } from "@/design/relay/LoadingText";

const RequestPreview = () => {
  const { address } = useAccount();
  const xmtpClient = useXmtpClient({
    clientAddress: address as EthAddress,
  });

  const { requestedConversations, requestsLoading } = useReadWriteValue({
    clientAddress: address as EthAddress,
  });

  const requestCount = useMemo(
    () => requestedConversations?.length,
    [requestedConversations?.length]
  );

  const requestingNames = useMemo(
    () =>
      requestedConversations.map((conversation) => {
        return truncateAddress(conversation.peerAddress);
      }),
    [requestedConversations]
  );
  const goToRequests = useGoToRequests();

  return (
    <Request.MsgRequestsRoot onClick={goToRequests}>
      <Request.RequestDetails>
        <MsgRequestsIcon />
        <MessagePreview.MsgDetails>
          <MessagePreview.ENSName.EnsNameMd>
            Message Requests
          </MessagePreview.ENSName.EnsNameMd>
          <MessagePreview.MessageDetails>
            {requestsLoading && <LoadingText />}
            {!requestsLoading && requestingNames?.join(", ")}
          </MessagePreview.MessageDetails>
        </MessagePreview.MsgDetails>
      </Request.RequestDetails>
      {requestsLoading && <LoaderAnimInitialization />}
      {!requestsLoading && (
        <Badge.RootPurple>
          <Badge.LabelPurple>{`${requestCount} requests`}</Badge.LabelPurple>
        </Badge.RootPurple>
      )}
    </Request.MsgRequestsRoot>
  );
};

export default RequestPreview;
