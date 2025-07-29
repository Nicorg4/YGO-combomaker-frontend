import { Combo } from "@/types/types";
import { formatDate } from "@/utils/auxFunctions";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoEnterOutline, IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import CardImage from "@/components/cardImage";

type Props = {
  combo: Combo;
  isExpanded: boolean;
  onClick: () => void;
  handleDeleteCombo: (data: Combo) => void;
};

const DifficultyBars = (difficultyBarsCount: number) => {
  return (
    <div className={`flex border-3 border-slate-800 w-15 h-8 p-1 gap-1`}>
      {Array.from({ length: difficultyBarsCount }).map((_, index) => (
        <div key={index} className={`flex h-full w-3 bg-slate-800`}></div>
      ))}
    </div>
  );
};

const ComboBox = (props: Props) => {
  const router = useRouter();

  const goToPage = (url: string) => {
    router.push(url);
  };

  return (
    <div
      className="flex flex-col min-h-[65px] transform shadow-md hover:shadow-xl cursor-pointer bg-white/70 overflow-hidden clip-diagonal hover:bg-white/90 transition-all duration-300 ease-in-out w-full"
      onClick={props.onClick}
    >
      <div className="flex justify-between transition-all p-5 duration-300">
        <div className="flex items-center gap-2">
          <button
            className="bg-slate-700 pr-3 p-2 text-2xl hover:opacity-70 cursor-pointer clip-diagonal-small z-100"
            onClick={(e) => {
              e.stopPropagation();
              goToPage(`/deck/${props.combo.deck_id}/combo/${props.combo.id}`);
            }}
          >
            <IoEnterOutline />
          </button>
          <CardImage card={props.combo.starting_hand[0]} w={30} />
          <h2 className="text-slate-800 text-md font-bold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[130px] sm:max-w-[300px]">
            {props.combo.title}
          </h2>
        </div>

        <div className="flex items-center">
          <div className="gap-2 items-center hidden md:flex min-w-[200px] mr-3">
            {props.combo.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-slate-700 text-white p-2 text-center pointer-events-none clip-diagonal-small"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <IoIosArrowDown
            className={`... ${
              props.isExpanded ? "rotate-180" : ""
            } text-slate-800 text-2xl font-bold transition-all duration-300 ease-in-out`}
          />
        </div>
      </div>
      <div
        className={`relative flex flex-col transition-all ease-in-out px-5 ${
          props.isExpanded
            ? "max-h-[500px] opacity-100 duration-700 pb-5"
            : "max-h-0 opacity-0 duration-200"
        } `}
      >
        <div className="flex justify-between gap-2">
          <div className="flex items-center space-x-4">
            {DifficultyBars(
              props.combo.difficulty === "Easy"
                ? 1
                : props.combo.difficulty === "Medium"
                ? 2
                : 3
            )}
            <p className="text-slate-700 text-lg">
              {props.combo.difficulty} difficulty
            </p>
          </div>

          <div className="flex flex-col justify-center items-end">
            <p className="text-slate-700">
              <span className="text-slate-800 font-bold">
                {props.combo.author}
              </span>
            </p>
            <p className="text-sm text-slate-500 mt-1">
              {formatDate(props.combo.created_at)}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 mt-3">
          <div className="flex items-center space-x-4">
            <p className="text-slate-700 text-md w-[100px]">Starting hand:</p>
            {props.combo.starting_hand.map((card, index) => (
              <div key={index}>
                <CardImage card={card} w={30} />
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-slate-700 text-md w-[100px]">Final board:</p>
            {props.combo.final_board.map((card, index) => (
              <div key={index}>
                <CardImage card={card} w={30} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.handleDeleteCombo(props.combo);
          }}
          className={` ${
            props.isExpanded ? "flex" : "hidden"
          } absolute bottom-5 right-5 p-3 bg-red-400 clip-diagonal-small cursor-pointer text-xl hover:bg-red-300 transition-all ease-in-out duration-200`}
        >
          <IoTrashOutline />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPage(
              `/deck/${props.combo.deck_id}/combo/${props.combo.id}/update`
            );
          }}
          className={` ${
            props.isExpanded ? "flex" : "hidden"
          } absolute bottom-5 right-18 p-3 bg-slate-700 clip-diagonal-small cursor-pointer text-xl hover:bg-slate-500 transition-all ease-in-out duration-200`}
        >
          <MdOutlineEdit />
        </button>
      </div>
    </div>
  );
};

export default ComboBox;
