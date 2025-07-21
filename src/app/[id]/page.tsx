'use client'

import React, { useEffect, useState } from 'react'
import ComboBox from '@/features/combos/comboBox';
import { getAllCombosFromDeck } from '@/features/combos/useCombos';
import MainContainer from '@/components/mainContainer';
import MainWrapper from '@/components/mainWrapper';
import DeckFullInfo from '@/features/decks/deckFullInfo';
import { getDeckById } from '@/features/decks/useDecks';
import { Combo, Deck } from '@/types/types';
import { useParams } from 'next/navigation';
import { GoPlus } from "react-icons/go";
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/components/loadingAnimation';
import GoBackButton from '@/components/goBackButton';

const DeckCombos = () => {
    const deckId = useParams().id;
    const [combos, setCombos] = useState<Combo[]>([]);
    const [deck, setDeck] = useState<Deck>();
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedComboId, setExpandedComboId] = useState<number | null>(null);
    const router = useRouter();

    const goToPage = (route: string) => {
        router.push(route);
    };

    const toggleExpandCombo = (id: number) => {
        setExpandedComboId(prev => (prev === id ? null : id));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (typeof deckId === 'string') {
                const fetchetCombos = await getAllCombosFromDeck(deckId);
                setCombos(fetchetCombos);
                const fetchedDeck = await getDeckById(deckId);
                setDeck(fetchedDeck);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [deckId])

    const filteredCombos = combos.filter(combo =>
        combo.title.toLowerCase().includes(searchQuery.toLowerCase())
        ||
        combo.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (isLoading) {
        return <LoadingAnimation />
    }

    return (
        <MainContainer>
            <GoBackButton goToPage={() => goToPage('/')} />
            {deck && <DeckFullInfo deck={deck} />}
            <MainWrapper>
                <input
                    type='text'
                    placeholder='Search for a combo.. '
                    className='w-[95%] p-3 pl-7 mb-2 bg-white/80 text-slate-800 clip-diagonal m-auto'
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className='flex flex-col justify-between flex-1'>
                    <div className='flex flex-1 flex-col gap-3 overflow-y-auto max-h-[400px] items-center custom-scrollbar'>
                        {filteredCombos.length <= 0 ? (
                            <p className='m-auto text-xl'>No combos found.</p>
                        ) : (
                            <>
                                {filteredCombos.map((combo) => (
                                    <ComboBox key={combo.id} combo={combo} isExpanded={expandedComboId === combo.id} onClick={() => toggleExpandCombo(combo.id)}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                    <div className='w-full flex justify-end items-right'>
                        <button
                            className='flex align-middle justify-center items-center gap-2 text-slate-800 text-4xl font-bold cursor-pointer bg-white/70 clip-diagonal h-16 w-16 hover:bg-white/90 transition-all duration-300 ease-in-out'
                            onClick={() => goToPage(`/deck/${deckId}/create`)}
                        >
                            <GoPlus />
                        </button>
                    </div>
                </div>
            </MainWrapper >
        </MainContainer >
    )
}

export default DeckCombos