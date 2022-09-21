import { FunctionComponent } from "react";
import { DataItemProps } from "./DataItem";

export type DataItemLargeProps = DataItemProps;

export const DataItemLarge: FunctionComponent<DataItemLargeProps> = ({
  text,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-ghost h-[3.5rem] w-full border-none rounded-m"
    >
      <div className="flex flex-row flex-grow justify-start">{text}</div>
      <>
        <button
          onClick={() => null}
          className="flex justify-center items-center btn btn-ghost btn-white-100 bg-white w-[3rem] h-[3rem] rounded-md p-0"
        />
        {/* eslint-disable-next-line */}
        <img
          className="h-[3rem] w-[3rem]"
          onClick={() => null}
          src={"/etherscan-logo-circle.svg"}
          alt="logo"
        />
      </>
    </button>
  );
};
