import { FunctionComponent } from "react";
import { Card } from "./Card";

export interface LogoCardProps {
  logo: any;
  handle?: string | null;
  title: any;
  logoWrapperClassName?: string;
  logoClassName?: string;
}

export const LogoCard: FunctionComponent<LogoCardProps> = ({
  logo,
  handle,
  title,
  logoClassName,
  logoWrapperClassName,
}) => {
  return (
    <Card>
      <div
        className={`relative group flex flex-col items-center p-0 w-full flex-grow`}
      >
        <div
          className={`mt-6 w-full rounded-md p-2 flex flex-row justify-center items-center ${logoWrapperClassName}`}
        >
          {/* eslint-disable-next-line */}
          <img
            src={logo}
            alt={title || 'not here'}
            className={`${logoClassName} rounded-md w-[8rem]`}
          />
        </div>
        <h2 className="bg-secondary border-[3px] overflow-hidden border-white rounded-md m-0 mt-auto uppercase h-12 font-bold flex flex-row w-full justify-center items-center">
          {title}
        </h2>
      </div>
    </Card>
  );
};
