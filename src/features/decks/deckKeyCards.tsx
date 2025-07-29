import { KeyCard } from "@/types/types";
import React from "react";
import CardImage from "@/components/cardImage";

type Props = {
  keyCards: KeyCard[];
};

const DeckKeyCards = ({ keyCards }: Props) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-center text-slate-800">
        Key Cards
      </h2>
      {keyCards.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 h-[150px] overflow-auto custom-scrollbar-alt px-10">
          {keyCards.map((card) => (
            <div
              key={card.card_id}
              className="mb-2 flex items-center space-x-4"
            >
              <CardImage card={card} w={43} />
              <div className="bg-slate-800 clip-diagonal-small p-1 px-2 text-white">
                <p className="text-sm">{card.description}</p>
              </div>
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
