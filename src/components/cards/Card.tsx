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
      className={`relative group w-[18rem] h-[24rem] flex flex-col shadow-lg rounded-xl gap-4 p-4 border-[3px] border-[#DAD8F6] bg-white ${className}`}
    >
      {children}
    </div>
  );
};
