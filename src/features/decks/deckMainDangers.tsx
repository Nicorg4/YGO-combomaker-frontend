"use client";

import { MainDanger } from "@/types/types";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import CardImage from "@/components/cardImage";

type Props = {
  mainDangers: MainDanger[];
};

const DeckMainDangers = ({ mainDangers }: Props) => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  return (
    <div className="flex flex-col relative">
      <h2 className="text-xl font-bold mb-4 text-center text-slate-800">
        Main dangers
      </h2>
      <div className="h-[150px] overflow-auto custom-scrollbar-alt px-10">
        {mainDangers.length > 0 ? (
          mainDangers.map((card, index) => (
            <div
              key={index}
              className="flex flex-col mb-3 gap-1 justify-center w-full relative"
              onMouseEnter={() => setHoveredCardIndex(index)}
              onMouseLeave={() => setHoveredCardIndex(null)}
            >
              {hoveredCardIndex === index && (
                <div className="absolute top-0 left-16 z-50 pointer-events-none bg-slate-800 clip-diagonal-small p-2 text-white">
                  <p className="text-lg text-left">{card.card_name}</p>
                  <p className="text-sm text-left">- {card.extra_notes}</p>
                </div>
              )}
              <div className="flex items-center space-x-4 text-slate-800">
                <CardImage card={card} w={43} noHover={true} />
                <FaArrowRight />
                <div className="flex flex-1">
                  {card.responses.map((response, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mr-2"
                    >
                      <CardImage card={response} w={30} />
                    </div>
                  ))}
                </div>
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
