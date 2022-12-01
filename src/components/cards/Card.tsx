import React, { ReactNode } from "react";

export const Card = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-[18rem] h-[24rem] flex flex-col shadow-lg rounded-md gap-4 p-4 border-[3px] border-black bg-white ${className}`}
    >
      {children}
    </div>
  );
};
