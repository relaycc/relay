import { useRef } from "react";
import { useReceiverWindow, useToggle } from "@/hooks/useReceiverWindow";
import { Login } from "./Login";
import { MessagesPage } from "./MessagesPage";
import { AnimatePresence } from "framer-motion";
import { DirectMessagesPage } from "./DirectMessagesPage";
import { RequestsPage } from "./RequestsPage";
import * as Receiver from "@/design/relay/Receiver";

export const ReceiverWindow = () => {
  const { page } = useReceiverWindow();
  const toggle = useToggle();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <AnimatePresence>
        {page !== null && (
          <Receiver.Window {...Receiver.WindowAnimation}>
            <Receiver.Receiver ref={ref}>
              {(() => {
                switch (page.id) {
                  case "sign":
                    return <Login />;
                  case "messages":
                    return <MessagesPage />;
                  case "requests":
                    return <RequestsPage />;
                  case "dm":
                    return (
                      <DirectMessagesPage conversation={page.conversation} />
                    );
                  default:
                    throw new Error(`Invalid page: ${page}`);
                }
              })()}
            </Receiver.Receiver>
          </Receiver.Window>
        )}
      </AnimatePresence>
      <Receiver.Fixed>
        <Receiver.Launch onClick={() => toggle({ id: "messages" })}>
          {page !== null && (
            <Receiver.Fader {...Receiver.FadeAnimation}>
              <Receiver.Chevron />
            </Receiver.Fader>
          )}
          {page === null && (
            <Receiver.Fader {...Receiver.FadeAnimation}>
              <Receiver.Logo />
            </Receiver.Fader>
          )}
        </Receiver.Launch>
      </Receiver.Fixed>
    </>
  );
};
