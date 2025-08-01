import React from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

type Props = {
  currentPage: number;
  totalPages: number;
  goBack: () => void;
  goNext: () => void;
  goStart?: () => void;
  goEnd?: () => void;
};

const PaginationController = ({
  currentPage,
  totalPages,
  goBack,
  goNext,
  goStart,
  goEnd,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-3">
      <div className="flex gap-2 items-center justify-center">
        <button
          className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${
            currentPage > 0 && "opacity-100 cursor-pointer hover:bg-white"
          }`}
          disabled={currentPage === 0}
          onClick={goStart}
        >
          <MdOutlineKeyboardDoubleArrowLeft className="text-xl" />
        </button>
        <button
          className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${
            currentPage > 0 && "opacity-100 cursor-pointer hover:bg-white"
          }`}
          disabled={currentPage === 0}
          onClick={goBack}
        >
          <MdOutlineKeyboardArrowLeft className="text-2xl" />
        </button>
        <p className="text-lg text-white/80">
          {currentPage + 1} / {totalPages + 1}
        </p>
        <button
          className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${
            currentPage < totalPages &&
            "opacity-100 cursor-pointer hover:bg-white"
          }`}
          onClick={goNext}
        >
          <MdOutlineKeyboardArrowRight className="text-2xl" />
        </button>
        <button
          className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${
            currentPage < totalPages &&
            "opacity-100 cursor-pointer hover:bg-white"
          }`}
          onClick={goEnd}
        >
          <MdOutlineKeyboardDoubleArrowRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default PaginationController;
