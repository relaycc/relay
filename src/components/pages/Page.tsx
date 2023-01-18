import { Intercom, useWallet, Receiver } from "@relaycc/receiver";
import React, { FunctionComponent, ReactNode, useEffect } from "react";
import { useSigner } from "wagmi";
import { Footer } from "components/Footer";
import { Project } from "lib";

export const Page: FunctionComponent<{
  children: ReactNode;
  navBar?: ReactNode;
  setCategory: (category: Project["category"]) => unknown;
  category: Project["category"];
}> = ({ children, navBar, setCategory, category }) => {
  const { data: signer } = useSigner();
  const [, setWallet] = useWallet();

  useEffect(() => {
    setWallet(
      (() => {
        if (signer === null || signer === undefined) {
          return null;
        } else {
          return signer;
        }
      })()
    );
  }, [setWallet, signer]);

  return (
    <main
      className="w-screen min-h-screen flex flex-row justify-center overflow-scroll bg-gradient-to-t from-[#857EEA]"
    >
      <div className="relative container mx-auto flex flex-col align-center flex-grow p-8">
        {navBar}
        <nav className="w-full mb-7 mt-2 border-b-2 border-blue-800">
          <ul className="button-grp h-14 mb-4 flex items-center gap-5 whitespace-nowrap overflow-auto scrollbar-hide">
            <li
              onClick={() => {
                setCategory("general");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "general" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              General
            </li>
            <li
              onClick={() => {
                setCategory("new");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "new" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              New
            </li>
            <li
              onClick={() => {
                setCategory("venture");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "venture" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              Venture
            </li>
            <li
              onClick={() => {
                setCategory("lens");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "lens" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              Lens
            </li>
            <li
              onClick={() => {
                setCategory("music");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "music" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              Music
            </li>
            <li
              onClick={() => {
                setCategory("infrastructure");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "infrastructure" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              Infrastructure
            </li>
            <li
              onClick={() => {
                setCategory("impactdao");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "impactdao" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              ImpactDAO
            </li>
            <li
              onClick={() => {
                setCategory("identity");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "identity" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              Identity
            </li>
            <li
              onClick={() => {
                setCategory("dao");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "dao" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              DAO
            </li>
            <li
              onClick={() => {
                setCategory("defi");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "defi" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              DeFi
            </li>
            <li
              onClick={() => {
                setCategory("zk");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "zk" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              ZK
            </li>
            <li
              onClick={() => {
                setCategory("daotool");
              }}
              className={`btn bg-indigo-50 text-[#4236C7] hover:text-[#3220ff] border-[#4236C7] border-2 hover:bg-indigo-200 btn-active cursor-pointer text-xl ${
                category === "daotool" && "underline text-[#4236C7] bg-indigo-200"
              }`}
            >
              DAO Tools
            </li>
          </ul>
        </nav>
        <ul className="flex flex-row justify-center sm:justify-start flex-wrap gap-8">
          {children}
        </ul>
        <Footer />
      </div>
      <Intercom>
        <Receiver />
      </Intercom>
    </main>
  );
};
