'use client'

import React from 'react';
import { Card } from '@/types/types';
import CardSearchInput from '../cards/cardSearchInput';

type Props = {
  cardList: Card[];
  startingHand: Card[];
  setStartingHand: (cards: Card[]) => void;
  maxCards: number;
};

const StartingHandSelector = ({ cardList, startingHand, setStartingHand, maxCards }: Props) => {
  const addCard = (card: Card) => {
    if (startingHand.length >= maxCards) return;
    if (!startingHand.some(c => c.id === card.id)) {
      setStartingHand([...startingHand, card]);
    }
  };

  const removeCard = (id: number) => {
    setStartingHand(startingHand.filter(c => c.id !== id));
  };

  return (
    <div className="w-full">
      <CardSearchInput
        cardList={cardList}
        selectedCard=""
        setSelectedCard={(card) => card && addCard(card)}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {startingHand.map(card => (
          <div
            key={card.id}
            className="bg-green-200 text-green-800 px-2 py-1 rounded cursor-pointer"
            onClick={() => removeCard(card.id)}
          >
            {card.name} x
            {/* <Image src={getImageFromApi(card.id)} alt={card.name} width={50} height={50} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartingHandSelector;
