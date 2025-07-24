'use client'

import { Card } from '@/types/types';
import React, { useState, useEffect, useRef } from 'react';

type Props = {
    cardList: Card[];
    selectedCard: string;
    setSelectedCard: (card: Card | null) => void;
};

const CardSearchInput = ({ cardList, selectedCard, setSelectedCard }: Props) => {
    const [inputValue, setInputValue] = useState(selectedCard);
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inputValue.trim() === '') {
            setFilteredCards([]);
            return;
        }

        const results = cardList
            .filter(card => card.name.toLowerCase().includes(inputValue.toLowerCase()))
            .slice(0, 5);

        setFilteredCards(results);
        setHighlightedIndex(0);
    }, [inputValue, cardList]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setInputValue(selectedCard || '');
    }, [selectedCard]);

    const handleSelect = (card: Card) => {
        setSelectedCard(card);
        setInputValue(card.name);
        setShowSuggestions(false);
        setHighlightedIndex(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || filteredCards.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev + 1) % filteredCards.length);
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
        }

        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            handleSelect(filteredCards[highlightedIndex]);
        }

        if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <div ref={containerRef} className='relative w-full'>
            <input
                type='text'
                value={inputValue}
                onChange={e => {
                    const value = e.target.value;
                    setInputValue(value);
                    setShowSuggestions(true);

                    const match = cardList.find(card => card.name === value);
                    setSelectedCard(match || null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search card"
                className='w-full p-2 bg-white text-slate-800 clip-diagonal-small'
            />

            {showSuggestions && (
                <div className='absolute z-10 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto'>
                    {filteredCards.length > 0 ? (
                        filteredCards.map((card, index) => (
                            <div
                                key={card.id}
                                onClick={() => handleSelect(card)}
                                className={`p-2 cursor-pointer text-slate-800 ${
                                    index === highlightedIndex ? 'bg-slate-700 text-white' : 'hover:bg-slate-100'
                                }`}
                            >
                                {card.name}
                            </div>
                        ))
                    ) : (
                        <p className='p-2 text-slate-800'>No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CardSearchInput;
