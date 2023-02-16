import { ReceiverWindow } from "@/components/ReceiverWindow";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as Comlink from "comlink";
import { useEffect, useRef, useState, useCallback } from "react";

interface IRemoteActions {
  connect: () => unknown;
  isConnected: (callback: (con: boolean) => unknown) => Promise<boolean>;
  sign: (
    message: string,
    callback: (sig: string) => unknown
  ) => Promise<string>;
}

let init = false;
let init2 = false;
const Receiver = () => {
  /* const [actions, setActions] = useState<IRemoteActions | null>(null);
  * const [sig, setSig] = useState<string | null>(null);
  
  * useEffect(() => {
  *   if (init) {
  *     return;
  *   } else {
  *     init = true;
  *     console.log("connecting");
  *     setTimeout(() => {
  *       setActions(() => {
  *         return Comlink.wrap<IRemoteActions>(
  *           Comlink.windowEndpoint(window.parent)
  *         );
  *       });
  *     }, 1000);
  *   }
  * }, []);
  
  * useEffect(() => {
  *   if (init2) {
  *     return;
  *   } else {
  *     init2 = true;
  *     Comlink.expose(
  *       {
  *         con: (value: boolean) => {
  *           console.log("called iframe from host");
  *           setIsConnected(value);
  *         },
  *       },
  *       Comlink.windowEndpoint(window)
  *     );
  *   }
  * }, []);
  
  * const [isConnected, setIsConnected] = useState(false);
  
  * const handleConnect = useCallback(() => {
  *   console.log("calling connect action");
  *   if (!actions) {
  *     return;
  *   }
  *   actions.connect();
  * }, [actions]);
  
  * useEffect(() => {
  *   console.log("DO IT", { isConnected });
  * }, [isConnected]);
   */
  return (
    <div>
      <ConnectButton />
      <ReceiverWindow />
    </div>
  );
};

export default Receiver;
