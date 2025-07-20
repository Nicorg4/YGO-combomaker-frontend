'use client'

import GoBackButton from '@/components/goBackButton'
import LoadingAnimation from '@/components/loadingAnimation'
import MainContainer from '@/components/mainContainer'
import MainWrapper from '@/components/mainWrapper'
import CreateComboForm from '@/features/combos/createComboForm'
import SubmitComboPopUp from '@/features/combos/submitComboPopUp'
import { getDeckById } from '@/features/decks/useDecks'
import { ComboForm, Deck } from '@/types/types'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const CreateCombo = () => {
  const router = useRouter();
  const deckId = useParams().deckId;
  const [isLoading, setIsLoading] = useState(true);
  const [deck, setDeck] = useState<Deck>();
  const [showSubmitPopUp, setShowSubmitPopUp] = useState(false);
  const [formData, setFormData] = useState<ComboForm | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof deckId === 'string') {
          const deck = await getDeckById(deckId);
          setDeck(deck);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const goToPage = () => {
    router.push(`/${deckId}`);
  };

  const handleSubmitRequest = (data: ComboForm) => {
    setFormData(data);
    setShowSubmitPopUp(true);
  };
  const URL_SERVER = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleSubmitCombo = async () => {
    if (!formData || !deckId) return;

    try {
      const comboData = {
        author: formData.author,
        title: formData.title,
        difficulty: formData.difficulty,
      };

      const comboRes = await fetch(`${URL_SERVER}/combos/deck/${deckId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comboData),
      });

      if (!comboRes.ok) throw new Error('Error creating combo');

      const combo = await comboRes.json();
      const comboId = combo.id;

      const tagsRes = await Promise.all(
        formData.tags.map(tag =>
          fetch(`${URL_SERVER}/comboTags`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ combo_id: comboId, tag_id: tag.id }),
          })
        )
      );
      if (tagsRes.some(res => !res.ok)) throw new Error('Error creating combo tags');

      const response = await fetch(`${URL_SERVER}/comboStartingHand`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ combo_id: comboId, cards: formData.startingHand }),
      });

      if (!response.ok) throw new Error('Error creating starting hand');

      const stepsRes = await Promise.all(
        formData.steps.map(step =>
          fetch(`${URL_SERVER}/steps/combo/${comboId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              card_id: step.card_id,
              action_text: step.action_text,
              step_order: step.step_order,
              target_card_ids: step.target_cards.map(c => c.id),
            }),
          })
        )
      );
      if (stepsRes.some(res => !res.ok)) throw new Error('Error creating steps');

      router.push(`/${deckId}`);
    } catch (error) {
      console.error('Error creating combo:', error);
      alert('Error al crear el combo. Revisa la consola para más detalles.');
    } finally {
      setShowSubmitPopUp(false);
    }
  };



  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      {showSubmitPopUp && (
        <SubmitComboPopUp
          onCancel={() => setShowSubmitPopUp(false)}
          onConfirm={handleSubmitCombo} />
      )}
      <MainContainer>
        <GoBackButton goToPage={goToPage} />
        <MainWrapper>
          <div className='flex flex-col gap-2 p-4 bg-white/80 text-slate-800 clip-diagonal'>
            <h1 className='text-2xl font-bold'>Create combo for {deck?.name} deck</h1>
          </div>
          <div className='flex flex-col items-center border-2 border-white/50 flex-1 p-5'>
            <CreateComboForm onRequestSubmit={handleSubmitRequest} />
          </div>
        </MainWrapper>
      </MainContainer>
    </>
  )
}

export default CreateCombo