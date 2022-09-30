import { Card } from "./Card";
import { Header } from "./Header";
import { FunctionComponent } from "react";
import { DataRow } from "./DataRow";
import { IconChat, IconLinkOut } from "components/icons";

export const AppCard: FunctionComponent<{
  logo: string;
  logoAlt: string;
  title: string;
  onClickLinkOut?: () => unknown;
  onClickSendMessage?: () => unknown;
  onClickLogo: () => unknown;
  linkOutText: string;
  logoClassName?: string;
}> = ({
  title,
  logo,
  logoAlt,
  logoClassName,
  onClickLinkOut,
  onClickSendMessage,
  linkOutText,
  onClickLogo,
}) => {
  return (
    <Card>
      <Header text={title}>
        <button
          onClick={onClickLogo}
          className="btn btn-ghost flex justify-center items-center p-2 bg-white w-[5rem] h-[5rem] rounded-md"
        >
          {/* eslint-disable-next-line */}
          <img
            src={logo}
            alt={logoAlt}
            className={`h-[4rem] w-[4rem] ${logoClassName}`}
          />
        </button>
      </Header>
      <DataRow
        className={`mt-auto ${
          onClickSendMessage === undefined ? "btn-disabled" : "bg-secondary"
        }`}
        onClick={onClickSendMessage}
      >
        Send a Message
        <IconChat />
      </DataRow>
      <DataRow
        className={`${
          onClickLinkOut === undefined ? "btn-disabled" : "bg-secondary"
        }`}
        onClick={onClickLinkOut}
      >
        {linkOutText}
        <IconLinkOut />
      </DataRow>
    </Card>
  );
};
