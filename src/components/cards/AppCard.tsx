import { Card } from "./Card";
import { Header } from "./Header";
import { FunctionComponent, useState } from "react";
import { DataRow } from "./DataRow";
import { IconChat, IconLinkOut } from "components/icons";
import Link from "next/link";
import Image from "next/image";
import { useLaunch } from "@relaycc/receiver";
import { Info } from "../icons";

export const AppCard: FunctionComponent<{
  logo: string;
  logoAlt: string;
  title: string;
  onClickLinkOut?: () => unknown;
  onClickSendMessage?: () => unknown;
  onClickLogo: () => unknown;
  logoClassName?: string;
  url: string;
  linkOutText: string;
  handle: string;
  description: string;
  setAddressToMessage: any;
}> = ({
  title,
  logo,
  logoAlt,
  logoClassName,
  onClickLinkOut,
  onClickSendMessage,
  onClickLogo,
  linkOutText,
  handle,
  url,
  description,
  setAddressToMessage,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <Card>
      <div
        onClick={() => setShowInfo(!showInfo)}
        className="lg:hidden group-hover:block absolute right-[0.9rem] top-[0.9rem] cursor-pointer"
      >
        <Info />
      </div>
      <Header>
        <div
          className={`flex relative justify-center top-0 left-0 duration-300 ${
            showInfo && "scale-50 top-[-3.2rem] left-[-5.15rem]"
          } items-center mt-6 p-2 bg-white h-[8rem] max-w-[14rem] rounded-md`}
        >
          <Image
            className="rounded-md"
            src={logo}
            alt={title}
            width={128}
            height={128}
          />
        </div>
      </Header>
      <div
        className={`flex relative items-center justify-center duration-300 flex-col bottom-[0rem] ${
          showInfo && "bottom-[5rem]"
        }`}
      >
        <span
          className={`max-w-max relative mt-2 text-3xl duration-300 flex text-center after:bottom-[-7px] items-center justify-center after:bg-black after:content-[""] after:w-full after:scale-x-0 after:duration-300 after:block after:h-[0.18rem] after:absolute after:rounded-xl ${
            showInfo && "after:scale-x-[100%]"
          }`}
        >
          {title}
        </span>
        <span
          className={`opacity-0 mt-3 text-center duration-300 ${
            showInfo && "opacity-100"
          }`}
        >
          {description}
        </span>
      </div>
      <div
        className={
          "flex w-full pr-[1rem] pl-[1rem] absolute bottom-[1rem] left-[50%] translate-x-[-50%]"
        }
      >
        <DataRow
          className={`${
            handle === "" || handle === null || handle === undefined
              ? "bg-gray-300"
              : "bg-[#4236C7] hover:bg-[#3220ff] text-white"
          } mr-3`}
          onClick={onClickSendMessage}
          handle={handle}
          setAddressToMessage={setAddressToMessage}
          useLaunch={useLaunch}
        >
          Message
          <IconChat />
        </DataRow>
        <Link href={url} passHref>
          <a
            className="mt-auto flex justify-end w-max self-end"
            target="_blank"
          >
            <button
              className={`btn btn-ghost p-0 pl-4 pr-4 mt-auto rounded-md border-[3px] border-black flex flex-row justify-center`}
            >
              <IconLinkOut />
            </button>
          </a>
        </Link>
      </div>
    </Card>
  );
};
