import { MainDanger } from "@/types/types";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CardImage from "@/components/cardImage";

type Props = {
  mainDangers: MainDanger[];
};

const DeckMainDangers = ({ mainDangers }: Props) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-center text-slate-800">
        Main dangers
      </h2>
      <div className="h-[150px] overflow-auto custom-scrollbar-alt px-10">
        {mainDangers.length > 0 ? (
          mainDangers.map((card) => (
            <div
              key={card.card_id}
              className="flex flex-col mb-3 gap-1 justify-center w-full"
            >
              <div className="flex items-center space-x-4 text-slate-800">
                <CardImage card={card} w={43} />
                <FaArrowRight />
                <div className="flex flex-1">
                  {card.responses.map((response) => (
                    <div
                      key={response.card_id}
                      className="flex items-center space-x-2 mr-2"
                    >
                      <CardImage card={response} w={30} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800 clip-diagonal-small p-1 px-2 text-white">
                <p className="text-sm">{card.extra_notes}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-slate-800">No main dangers available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckMainDangers;
