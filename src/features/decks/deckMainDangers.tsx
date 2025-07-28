import { MainDanger } from "@/types/types";
import Image from "next/image";
import React from "react";
import { getImageFromApi } from "../images/useImages";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  mainDangers: MainDanger[];
};

const DeckMainDangers = ({ mainDangers }: Props) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-center text-slate-800">
        Main dangers
      </h2>
      <div className="h-[170px] overflow-auto custom-scrollbar-alt px-5">
        {mainDangers.length > 0 ? (
          mainDangers.map((card) => (
            <div key={card.card_id} className="flex flex-col mb-2 gap-1">
              <div className="flex mb-2 items-center space-x-4 text-slate-800">
                <Image
                  src={getImageFromApi(card.card_id)}
                  alt={card.card_name}
                  width={50}
                  height={50}
                />
                <FaArrowRight/> 
                <div className="flex flex-1">
                  {card.responses.map((response) => (
                    <div key={response.card_id} className="flex items-center space-x-2 mr-2">
                      <Image
                        src={getImageFromApi(response.card_id)}
                        alt={response.card_name}
                        width={30}
                        height={30}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800 clip-diagonal-small p-1 text-white text-center">
                <p className="text-md">{card.extra_notes}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-slate-800">
              No main dangers available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckMainDangers;
