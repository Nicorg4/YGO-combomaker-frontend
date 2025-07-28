import { KeyCard } from "@/types/types";
import React from "react";
import { getImageFromApi } from "../images/useImages";
import Image from "next/image";

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
        <div className="grid grid-cols-2 gap-2 h-[170px] overflow-auto custom-scrollbar-alt px-5">
          {keyCards.map((card) => (
            <div
              key={card.card_id}
              className="mb-2 flex items-center space-x-4"
            >
              <Image
                src={getImageFromApi(card.card_id)}
                alt={card.card_name}
                width={50}
                height={50}
              />
              <p className="text-slate-800">{card.description}</p>
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
