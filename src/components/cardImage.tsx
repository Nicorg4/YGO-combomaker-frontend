import { getImageFromApi } from "@/features/images/useImages";
import { Card } from "@/types/types";
import Image from "next/image";
import React from "react";

type Props = {
  card: Card;
  w: number;
  noHover?: boolean;
};

const CardImage = ({ card, w, noHover }: Props) => {
  const groupHoverOpacity = noHover ? '' : 'group-hover:opacity-100';
  return (
    <div className="relative group">
      <span className={`font-bold absolute left-1/2 pointer-events-none text-white -translate-x-1/2 z-100 text-center bg-slate-800 text-[10px] p-1 px-3 opacity-0 ${groupHoverOpacity} transition-opacity duration-200 whitespace-nowrap clip-diagonal-small`}>
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
