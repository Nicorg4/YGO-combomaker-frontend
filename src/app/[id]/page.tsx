'use client'

import React, { useCallback, useEffect, useState } from 'react'
import ComboBox from '@/features/combos/comboBox';
import { deleteComboById, getAllCombosFromDeck } from '@/features/combos/useCombos';
import MainContainer from '@/components/mainContainer';
import MainWrapper from '@/components/mainWrapper';
import DeckFullInfo from '@/features/decks/deckFullInfo';
import { getDeckById } from '@/features/decks/useDecks';
import { BottomLefNotificationProps, Combo, Deck } from '@/types/types';
import { useParams } from 'next/navigation';
import { GoPlus } from "react-icons/go";
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/components/loadingAnimation';
import GoBackButton from '@/components/goBackButton';
import FilteringControls from '@/components/filteringControls';
import { getAllTags } from '@/features/tags/useTags';
import SubmitComboPopUp from '@/features/combos/submitComboPopUp';
import BottomLeftNotification from '@/components/bottomLeftNotification';


const DeckCombos = () => {
    const deckId = useParams().id;
    const [combos, setCombos] = useState<Combo[]>([]);
    const [deck, setDeck] = useState<Deck>();
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedComboIds, setExpandedComboIds] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([])
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
    const [comboToDelete, setComboToDelete] = useState<Combo>();
    const [notification, setNotification] = useState<Omit<BottomLefNotificationProps, 'onClose'>>({
        message: '',
        type: 'info',
        duration: 3000,
        show: false,
    });
    const [isDeleting, setIsDeleting] = useState(false)

    const handleCloseNotification = useCallback(() => {
        setNotification(prev => ({ ...prev, show: false }));
    }, []);

    const router = useRouter();

    const goToPage = (route: string) => {
        router.push(route);
    };

    const toggleExpandCombo = (id: number) => {
        if (expandedComboIds.includes(id)) {
            setExpandedComboIds(expandedComboIds.filter(comboId => comboId !== id))
        }
        else {
            setExpandedComboIds(prev => [...prev, id]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (typeof deckId === 'string') {
                const fetchetCombos = await getAllCombosFromDeck(deckId);
                setCombos(fetchetCombos);
                const fetchedDeck = await getDeckById(deckId);
                setDeck(fetchedDeck);
                const fetchedTags = await getAllTags();
                const tagNames = fetchedTags.map(tag => tag.name)
                setTags(tagNames)
            }
            setIsLoading(false);
        }
        fetchData();
    }, [deckId])

    const getValue = (combo: Combo, key: string) => {
        if (key === 'author') return combo.author
        if (key === 'difficulty') return combo.difficulty
        if (key === 'title') return combo.title
        if (key === 'starting_hand') return combo.starting_hand
        if (key === 'final_board') return combo.final_board
        if (key === 'date') return new Date(combo.created_at);
        return combo[key as keyof Combo] ?? "";
    }

    const filteredAndSortedCombos = [...combos]
        .filter(combo =>
            combo.title.toLowerCase().includes(searchQuery.toLowerCase())
            ||
            combo.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
            ||
            combo.author.toLowerCase().includes(searchQuery.toLowerCase())
            ||
            combo.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
            ||
            combo.starting_hand.some(card => card.card_name.toLowerCase().includes(searchQuery.toLowerCase()))
            ||
            combo.final_board.some(card => card.card_name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .filter(combo =>
            (selectedDifficulties.length === 0 || selectedDifficulties.includes(combo.difficulty)) &&
            (selectedTags.length === 0 || combo.tags.some(tag => selectedTags.includes(tag.name)))
        )
        .sort((a, b) => {
            const valueA = getValue(a, sortBy);
            const valueB = getValue(b, sortBy);

            if (typeof valueA === "string" && typeof valueB === "string") {
                return sortOrder === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }
            if (typeof valueA === "number" && typeof valueB === "number") {
                return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }
            if (valueA instanceof Date && valueB instanceof Date) {
                return sortOrder === "asc"
                    ? valueA.getTime() - valueB.getTime()
                    : valueB.getTime() - valueA.getTime();
            }
            if (Array.isArray(valueA) && Array.isArray(valueB)) {
                return sortOrder === "asc"
                    ? valueA.length - valueB.length
                    : valueB.length - valueA.length;
            }
            return 0
        })

    const collapseAll = () => {
        setExpandedComboIds([])
    }

    const expandAll = () => {
        combos.forEach(combo => setExpandedComboIds(prev => [...prev, combo.id]))
    }

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    }

    const handleDeleteCombo = (combo: Combo) => {
        setComboToDelete(combo);
        setIsDeletePopupOpen(true);
    }

    const deleteCombo = async () => {
        if (!comboToDelete) return;
        setIsDeleting(true)
        try {
            await deleteComboById(comboToDelete.id);
            setCombos(combos.filter(combo => combo.id !== comboToDelete.id))
            setNotification({
                ...notification,
                message: 'Combo deleted successfully',
                type: "success",
                show: true,
                duration: 3000,
            });
        } catch (error) {
            console.error(error)
            setNotification({
                ...notification,
                message: 'Error deleting combo',
                type: "error",
                show: true,
                duration: 5000,
            });
        } finally {
            setIsDeleting(false)
            setIsDeletePopupOpen(false)
        }
    }

    if (isLoading) {
        return <LoadingAnimation />
    }

    return (
        <MainContainer>
            <BottomLeftNotification message={notification.message} duration={notification.duration} show={notification.show} type={notification.type} onClose={handleCloseNotification} />
            <GoBackButton goToPage={() => goToPage('/')} />
            {deck && <DeckFullInfo deck={deck} />}
            <MainWrapper>
                {isDeletePopupOpen &&
                    <SubmitComboPopUp
                        onCancel={() => setIsDeletePopupOpen(false)}
                        onConfirm={deleteCombo}
                        isSubmitting={isDeleting}
                        title={'Confirm delete action'}
                        action={'delete'}
                    />
                }
                <div className='flex flex-col gap-5 w-[95%] mx-auto flex-1'>
                    <div className='flex flex-col'>
                        <div className='flex gap-3 w-full'>
                            <input
                                type='text'
                                placeholder='Search for a combo.. '
                                className='w-full p-3 pl-7 mb-2 bg-white/70 text-slate-800 clip-diagonal m-auto'
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className='flex justify-end items-right'>
                                <button
                                    className='hidden sm:flex align-middle justify-center items-center text-xl text-slate-800 font-bold cursor-pointer pr-2 bg-white/70 clip-diagonal-small h-12 w-30 hover:bg-white/90 transition-all duration-300 ease-in-out'
                                    onClick={() => goToPage(`/deck/${deckId}/create`)}
                                >
                                    <GoPlus className='text-3xl' /> Create
                                </button>
                                <button
                                    className='flex sm:hidden align-middle justify-center items-center text-xl text-slate-800 font-bold cursor-pointer bg-white/70 clip-diagonal-small h-12 w-10 hover:bg-white/90 transition-all duration-300 ease-in-out'
                                    onClick={() => goToPage(`/deck/${deckId}/create`)}
                                >
                                    <GoPlus className='text-xl' />
                                </button>
                            </div>
                        </div>
                        <FilteringControls
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            toggleSortOrder={toggleSortOrder}
                            expandAll={expandAll}
                            collapseAll={collapseAll}
                            selectedDifficulties={selectedDifficulties}
                            setSelectedDifficulties={setSelectedDifficulties}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            tags={tags}
                        />
                    </div>
                    <div className='flex flex-col justify-between flex-1 max-h-[470px] overflow-auto custom-scrollbar w-full border-t-1 border-slate-200/40 pt-5'>
                        <div className='flex flex-col gap-3 items-center mb-5 flex-1'>
                            {filteredAndSortedCombos.length <= 0 ? (
                                <div className='flex flex-1 h-full'>
                                    <p className='m-auto text-xl text-white/50'>No combos found.</p>
                                </div>
                            ) : (
                                <>
                                    {filteredAndSortedCombos.map((combo) => (
                                        <ComboBox
                                            key={combo.id}
                                            combo={combo}
                                            isExpanded={expandedComboIds.includes(combo.id)} onClick={() => toggleExpandCombo(combo.id)}
                                            handleDeleteCombo={handleDeleteCombo}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </MainWrapper >
        </MainContainer >
    )
}

export default DeckCombos