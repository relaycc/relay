import { FunctionComponent } from "react";

export interface DataItemProps {
  text: string;
  icon?: JSX.Element;
  onClick?: () => unknown;
}

export const DataItem: FunctionComponent<DataItemProps> = ({
  text,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-ghost w-full border-none rounded-md bg-white"
    >
      <div className="flex flex-row flex-grow justify-start">{text}</div>
      {icon}
    </button>
  );
};
