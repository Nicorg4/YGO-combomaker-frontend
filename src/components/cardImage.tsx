import { getImageFromApi } from "@/features/images/useImages";
import { Card } from "@/types/types";
import Image from "next/image";
import React from "react";

type Props = {
  card: Card;
  w: number;
};

const CardImage = ({ card, w }: Props) => {
  return (
    <div className="relative group">
      <span className="absolute left-1/2 text-white -translate-x-1/2 z-100 text-center bg-slate-700/90 text-[10px] p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {card.card_name}
      </span>
      <Image
        src={getImageFromApi(card.card_id)}
        alt={card.card_name}
        width={w}
        height={30}
      />
    </div>
  );
};

export default CardImage;
