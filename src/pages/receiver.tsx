import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

import * as Receiver from "@/design/relay/Receiver";
import { useIframeStore } from "@/hooks/useIframeStore";
import { useReceiverWindow, useToggle } from "@/hooks/useReceiverWindow";
import { Login } from "@/components/Login";
import { MessagesPage } from "@/components/MessagesPage";
import { DirectMessagesPage } from "@/components/DirectMessagesPage";
import { RequestsPage } from "@/components/RequestsPage";
import { useIframe } from "@/hooks/useIframe";

const Window = styled(Receiver.Window)`
  right: 0;
  bottom: 0;
`;

const Component = () => {
  const { handleConnect, isOpen, setOpen, conversation } = useIframe();
  const updateIsIframe = useIframeStore((state) => state.updateIsIframe);
  const [init, setInit] = useState<boolean>(true);

  const { page } = useReceiverWindow();
  const toggle = useToggle();
  useEffect(() => {
    updateIsIframe(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      return toggle({ id: "messages" });
    }
    toggle(null);
  }, [isOpen]);

  useEffect(() => {
    if (init && conversation) {
      setInit(false);
      toggle({ id: "dm", conversation });
    }
  }, [conversation, init]);

  return (
    <AnimatePresence>
      {page !== null && (
        <Window {...Receiver.WindowAnimation}>
          <Receiver.Receiver>
            {(() => {
              switch (page.id) {
                case "sign":
                  return <Login />;
                case "messages":
                  return (
                    <MessagesPage
                      setOpen={setOpen}
                      handleConnect={handleConnect}
                    />
                  );
                case "requests":
                  return <RequestsPage />;
                case "dm":
                  return (
                    <DirectMessagesPage
                      setOpen={setOpen}
                      handleConnect={handleConnect}
                      conversation={page.conversation}
                    />
                  );
                default:
                  throw new Error(`Invalid page: ${page}`);
              }
            })()}
          </Receiver.Receiver>
        </Window>
      )}
    </AnimatePresence>
  );
};

export default Component;
