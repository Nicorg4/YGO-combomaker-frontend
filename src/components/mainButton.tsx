import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  onClick: () => void;
  children?: React.ReactNode;
  text: string;
  type: "main" | "confirm" | "cancel" | "delete";
  isLoading?: boolean;
  responsive?: boolean;
  reverse?: boolean;
  isCreateButton?: boolean;
};

const MainButton = ({
  onClick,
  children,
  text,
  type,
  isLoading,
  reverse,
}: Props) => {
  const bgColor =
    type === "confirm"
      ? "bg-white/70"
      : type === "cancel"
      ? "bg-gray-400"
      : type === "main"
      ? "bg-slate-700"
      : "bg-red-400";
  const textColor =
    type === "delete" || type === "main" ? "text-white" : "text-slate-800";
  const hoverColor =
    type === "delete" ? "hover:bg-red-300" : type === "main" ? "hover:bg-slate-400": "hover:bg-gray-300";
  const reversed = reverse ? "flex-row-reverse" : "";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bgColor} flex ${reversed} px-3 p-2 gap-1 clip-diagonal-small items-center ${textColor} font-bold ${hoverColor} transition-all duration-300 cursor-pointer justify-center align-middle max-h-12 min-w-[80px] min-h-10`}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin border-white" />
      ) : (
        <>
          {text}
          {children}
        </>
      )}
    </button>
  );
};

export default MainButton;
