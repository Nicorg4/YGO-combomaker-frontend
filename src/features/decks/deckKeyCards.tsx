"use client";

import { KeyCard } from "@/types/types";
import React, { useState } from "react";
import CardImage from "@/components/cardImage";
import clsx from "clsx";

type Props = {
  keyCards: KeyCard[];
};

const DeckKeyCards = ({ keyCards }: Props) => {
  const goToMasterDuelMeta = (deckName: string) => {
    const encodedName = encodeURIComponent(deckName);
    const url = `https://www.masterduelmeta.com/cards/${encodedName}`;
    window.open(url, "_blank");
  };

  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  return (
    <div className="flex flex-col max-h-[20vh]">
      <h2 className="text-xl font-bold mb-4 text-center text-slate-800">
        Key Cards
      </h2>
      {keyCards.length > 0 ? (
        <div className="grid grid-cols-6 lg:grid-cols-8 gap-1 overflow-y-auto overflow-x-hidden custom-scrollbar-alt px-10">
          {keyCards.map((card, index) => (
            <div
              key={index}
              className="mb-2 flex justify-center relative cursor-help"
              onMouseEnter={() => setHoveredCardIndex(index)}
              onMouseLeave={() => setHoveredCardIndex(null)}
              onClick={() => goToMasterDuelMeta(card.card_name)}
            >
              {hoveredCardIndex === index && (
                <div
                  className={clsx(
                    "bg-slate-800 clip-diagonal-small p-2 text-white absolute z-50 text-center whitespace-nowrap pointer-events-none",
                    {
                      "lg:left-[100%] lg:right-auto": index % 8 < 4,
                      "lg:right-[100%] lg:left-auto": index % 8 >= 4,
                      "left-[100%] right-auto": index % 6 < 4,
                      "right-[100%] left-auto": index % 6 >= 4,
                    }
                  )}
                >
                  <p className="text-lg">{card.card_name}</p>
                  <p className="text-sm text-left">- {card.description}</p>
                </div>
              )}
              <CardImage card={card} w={45} noHover={true} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[170px]">
          <p className="text-slate-800 m-auto">No key cards available.</p>
        </div>
      )}
    </div>
  );
};

export default DeckKeyCards;
