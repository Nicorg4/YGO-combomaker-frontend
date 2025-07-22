'use client'

import BottomLeftNotification from '@/components/bottomLeftNotification'
import GoBackButton from '@/components/goBackButton'
import LoadingAnimation from '@/components/loadingAnimation'
import MainContainer from '@/components/mainContainer'
import MainWrapper from '@/components/mainWrapper'
import CreateComboForm from '@/features/combos/createComboForm'
import SubmitComboPopUp from '@/features/combos/submitComboPopUp'
import { createCombo } from '@/features/combos/useCombos'
import { getDeckById } from '@/features/decks/useDecks'
import { createStep } from '@/features/steps/useSteps'
import { createTag } from '@/features/tags/useTags'
import { BottomLefNotificationProps, ComboForm, Deck } from '@/types/types'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'


const CreateCombo = () => {
  const router = useRouter();
  const deckId = useParams().deckId;
  const [isLoading, setIsLoading] = useState(true);
  const [deck, setDeck] = useState<Deck>();
  const [showSubmitPopUp, setShowSubmitPopUp] = useState(false);
  const [formData, setFormData] = useState<ComboForm | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<Omit<BottomLefNotificationProps, 'onClose'>>({
    message: '',
    type: 'info',
    duration: 3000,
    show: false,
  });

  const handleCloseNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, show: false }));
  }, []);

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
  }, [deckId]);

  const goToPage = () => {
    router.push(`/${deckId}`);
  };

  const handleSubmitRequest = (data: ComboForm) => {
    setFormData(data);
    setShowSubmitPopUp(true);
  };

  const URL_SERVER = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmitCombo = async () => {
    setIsSubmitting(true);
    if (!formData || !deckId || typeof deckId !== 'string') {
      setNotification({
        ...notification,
        message: 'Error creating combo',
        type: "error",
        show: true,
        duration: 5000,
      });
      return
    };
    try {
      const comboData = {
        author: formData.author,
        title: formData.title,
        difficulty: formData.difficulty,
      };
      const combo = await createCombo(deckId, comboData);
      const comboId = combo.id;
      await Promise.all(formData.tags.map(tag => createTag(comboId, tag.id)));

      const response = await fetch(`${URL_SERVER}/comboStartingHand`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ combo_id: comboId, cards: formData.startingHand }),
      });
      if (!response.ok) throw new Error('Error creating starting hand');

      const finalBoardRes = await fetch(`${URL_SERVER}/comboFinalBoard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ combo_id: comboId, cards: formData.final_board }),
      });
      if (!finalBoardRes.ok) throw new Error('Error creating final board');

      await Promise.all(
        formData.steps.map(step =>
          createStep(comboId, step.card_id, step.action_text, step.step_order, step.target_cards.map(c => c.id),)
        )
      );
      setNotification({
        ...notification,
        message: 'Combo created successfully',
        type: "success",
        show: true,
        duration: 3000,
      });
      setTimeout(() => {
        router.push(`/${deckId}`);
      }, 3000);
    } catch (error) {
      console.error('Error creating combo:', error);
      setNotification({
        ...notification,
        message: 'Error creating combo',
        type: "error",
        show: true,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
      setShowSubmitPopUp(false);
    }
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>

      <MainContainer>
        {showSubmitPopUp && (
          <SubmitComboPopUp
            onCancel={() => setShowSubmitPopUp(false)}
            onConfirm={handleSubmitCombo}
            isSubmitting={isSubmitting}
          />
        )}
        <BottomLeftNotification message={notification.message} duration={notification.duration} show={notification.show} type={notification.type} onClose={handleCloseNotification} />
        <GoBackButton goToPage={goToPage} />
        <MainWrapper>
          <div className='flex flex-col gap-2 p-4 bg-white/80 text-slate-800 clip-diagonal'>
            <h1 className='text-2xl font-bold text-center'>Create combo for {deck?.name} deck</h1>
          </div>
          <div className='flex flex-col items-center border-2 border-white/50 flex-1 p-5'>
            <CreateComboForm onRequestSubmit={handleSubmitRequest} setNotification={setNotification} />
          </div>
        </MainWrapper>
      </MainContainer>
    </>
  )
}

export default CreateCombo