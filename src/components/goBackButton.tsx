import React from "react";
import { IoIosArrowBack } from "react-icons/io";

type Props = {
  goToPage: () => void;
};

const GoBackButton = ({ goToPage }: Props) => {
  return (
    <div className="fixed top-5 left-5 z-500">
      <button className="clip-diagonal-small h-9 hover:cursor-pointer hover:opacity-80 transition-all duration-300" onClick={goToPage}>
        <div className="flex w-full h-full items-center">
          <div className="bg-slate-800 h-full flex items-center px-2">
            <IoIosArrowBack className="text-xl text-white" />
          </div>
          <div className="bg-white/70 h-full flex items-center px-2 font-bold text-slate-800">
            Go back
          </div>
        </div>
      </button>
    </div>
  );
};

export default GoBackButton;
