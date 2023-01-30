import { FunctionComponent, useCallback, useMemo } from "react";
import * as MessagePreview from "@/design/MessagePreview";
import * as Request from "@/design/Request";

import * as Badge from "@/design/Badge";
import { getDisplayDate } from "@/lib/getDisplayDate";
import { MsgRequestsIcon } from "@/design/Requests";
import { useRouter } from "next/router";
import { useGoToRequests } from "@/hooks/useReceiverWindow";

const RequestPreview: FunctionComponent<{
  count: number;
  names: Array<string>;
}> = ({ count, names }) => {
  const router = useRouter();
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
            {names?.join(", ")}
          </MessagePreview.MessageDetails>
        </MessagePreview.MsgDetails>
      </Request.RequestDetails>
      <Badge.RootPurple>
        <Badge.LabelPurple>{`${count} requests`}</Badge.LabelPurple>
      </Badge.RootPurple>
    </Request.MsgRequestsRoot>
  );
};

export default RequestPreview;
