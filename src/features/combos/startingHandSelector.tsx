'use client'

import React from 'react';
import { Card } from '@/types/types';
import CardSearchInput from '../cards/cardSearchInput';

type Props = {
  cardList: Card[];
  cards: Card[];
  setCards: (cards: Card[]) => void;
  maxCards: number;
};

const CardSelector = ({ cardList, cards, setCards, maxCards }: Props) => {
  const addCard = (card: Card) => {
    if (cards.length >= maxCards) return;

    const count = cards.filter(c => c.card_id === card.card_id).length;
    if (count >= 3) return;

    setCards([...cards, card]);
  };


  const removeCard = (indexToRemove: number) => {
    setCards(cards.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      <CardSearchInput
        cardList={cardList}
        selectedCard=""
        setSelectedCard={(card) => card && addCard(card)}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {cards.map((card, index) => (
          <div
            key={`${card.card_id}-${index}`}
            className="bg-green-200 text-green-800 px-2 py-1 cursor-pointer clip-diagonal-small"
            onClick={() => removeCard(index)}
          >
            {card.card_name} x
          </div>
        ))}

      </div>
    </div>
  );
};

export default CardSelector;
