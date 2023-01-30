import { useRef } from "react";
import { useReceiverWindow } from "@/hooks/useReceiverWindow";
import { Window, Receiver, Login } from "./Login";
import { MessagesPage } from "./MessagesPage";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { AnimatePresence } from "framer-motion";
import { DirectMessagesPage } from "./DirectMessagesPage";
import { RequestsPage } from "./RequestsPage";

export const ReceiverWindow = () => {
  const { page, setPage } = useReceiverWindow();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setPage(null));

  return (
    <AnimatePresence>
      {page !== null && (
        <Window
          initial={{ height: 0 }}
          animate={{ height: "700px" }}
          transition={{ duration: 0.4 }}
          exit={{ height: 0 }}
        >
          <Receiver ref={ref}>
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
          </Receiver>
        </Window>
      )}
    </AnimatePresence>
  );
};
