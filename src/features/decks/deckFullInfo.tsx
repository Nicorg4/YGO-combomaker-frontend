import { Deck } from "@/types/types";
import Image from "next/image";
import React from "react";
import { getImageUrl } from "../images/useImages";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";

type Props = {
  deck: Deck;
};

const DeckFullInfo = (props: Props) => {
  const router = useRouter();
  const deckId = useParams().deckId;
  const goToPage = () => {
    router.push(`/deck/${deckId}/info`);
  };
  return (
    <div className="flex gap-5 bg-slate-900 w-full border-white/50 clip-diagonal slide-in-from-top h-[120px]">
      <div className="flex items-center">
        <Image
          src={getImageUrl(props.deck.image_url)}
          alt={props.deck.name}
          width={120}
          height={120}
        />
      </div>
      <div className="flex flex-col flex-1 p-2 pr-5 justify-center">
        <h1 className="text-xl font-bold">{props.deck.name}</h1>
        <p className="text-gray-400 overflow-auto custom-scrollbar">
          {props.deck.description}
        </p>
      </div>
      <button
        className="bg-white/70 text-slate-800 px-4 py-2 transition-colors hover:bg-white/80 cursor-pointer text-4xl font-bold"
        onClick={() => goToPage()}
      >
        <IoIosInformationCircleOutline />
      </button>
    </div>
  );
};

export default DeckFullInfo;
