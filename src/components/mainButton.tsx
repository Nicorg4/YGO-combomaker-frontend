import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  onClick: () => void;
  children?: React.ReactNode;
  text: string;
  type: "confirm" | "cancel" | "delete";
  isLoading?: boolean;
};

const MainButton = ({ onClick, children, text, type, isLoading }: Props) => {
  const bgColor =
    type === "confirm"
      ? "bg-white/70"
      : type === "cancel"
      ? "bg-gray-400"
      : "bg-red-400";
  const textColor = type === "delete" ? "text-white" : "text-slate-800";
  const hoverColor =
    type === "delete" ? "hover:bg-red-300" : "hover:bg-white/90";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-[130px] mt-2 ${bgColor} flex px-3 p-2 gap-1 clip-diagonal-small items-center ${textColor} font-bold ${hoverColor} transition-all duration-300 cursor-pointer justify-center`}
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
