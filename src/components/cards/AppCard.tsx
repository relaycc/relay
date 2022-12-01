import { Card } from "./Card";
import { Header } from "./Header";
import { FunctionComponent } from "react";
import { DataRow } from "./DataRow";
import { IconChat, IconLinkOut } from "components/icons";
import Link from "next/link";
import Image from "next/image";
import { useLaunch } from "@relaycc/receiver";

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
  setAddressToMessage,
}) => {
  return (
    <Card>
      <Header>
        <div className="flex justify-center items-center mt-6 p-2 bg-white h-[8rem] max-w-[14rem] rounded-md">
          <Image
            className="rounded-md"
            src={logo}
            alt={title}
            width={128}
            height={128}
          />
        </div>
      </Header>
      <span
        className={"mt-2 text-3xl flex text-center items-center justify-center"}
      >
        {title}
      </span>
      <div className={"flex mt-auto justify-between gap-3"}>
        <DataRow
          className={`${"bg-secondary"}`}
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
              className={`btn btn-ghost p-0 pl-4 pr-4 mt-auto rounded-md border-[3px] border-black bg-secondary flex flex-row justify-center`}
            >
              <IconLinkOut />
            </button>
          </a>
        </Link>
      </div>
    </Card>
  );
};
