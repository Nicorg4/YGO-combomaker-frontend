'use client'

import React from 'react';
import { Card } from '@/types/types';
import CardSearchInput from '../cards/cardSearchInput';

type Props = {
  cardList: Card[];
  startingHand: Card[];
  setCards: (cards: Card[]) => void;
  maxCards: number;
};

const CardSelector = ({ cardList, startingHand, setCards, maxCards }: Props) => {
  const addCard = (card: Card) => {
    if (startingHand.length >= maxCards) return;

    const count = startingHand.filter(c => c.id === card.id).length;
    if (count >= 3) return;

    setCards([...startingHand, card]);
  };


  const removeCard = (indexToRemove: number) => {
    setCards(startingHand.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      <CardSearchInput
        cardList={cardList}
        selectedCard=""
        setSelectedCard={(card) => card && addCard(card)}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {startingHand.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className="bg-green-200 text-green-800 px-2 py-1 cursor-pointer clip-diagonal-small"
            onClick={() => removeCard(index)}
          >
            {card.name} x
          </div>
        ))}

      </div>
    </div>
  );
};

export default CardSelector;
