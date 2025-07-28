"use client";

import BottomLeftNotification from "@/components/bottomLeftNotification";
import GoBackButton from "@/components/goBackButton";
import LoadingAnimation from "@/components/loadingAnimation";
import MainContainer from "@/components/mainContainer";
import MainWrapper from "@/components/mainWrapper";
import CreateComboForm from "@/features/combos/createComboForm";
import SubmitComboPopUp from "@/features/combos/submitComboPopUp";
import { getComboById, updateFullCombo } from "@/features/combos/useCombos";
import { getDeckById } from "@/features/decks/useDecks";
import { getStepsByComboId } from "@/features/steps/useSteps";
import {
  BottomLefNotificationProps,
  Combo,
  ComboForm,
  Deck,
  Step,
} from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const UpdateCombo = () => {
  const router = useRouter();
  const deckId = useParams().deckId;
  const comboId = useParams().comboId;
  const [isLoading, setIsLoading] = useState(true);
  const [deck, setDeck] = useState<Deck>();
  const [showSubmitPopUp, setShowSubmitPopUp] = useState(false);
  const [formData, setFormData] = useState<ComboForm | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [combo, setCombo] = useState<Combo>();
  const [steps, setSteps] = useState<Step[]>([]);
  const [notification, setNotification] = useState<
    Omit<BottomLefNotificationProps, "onClose">
  >({
    message: "",
    type: "info",
    duration: 3000,
    show: false,
  });

  const handleCloseNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, show: false }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof deckId === "string" && typeof comboId === "string") {
          const deck = await getDeckById(deckId);
          const fetchedCombo = await getComboById(comboId);
          const fetchedSteps = await getStepsByComboId(comboId);
          setDeck(deck);
          setCombo(fetchedCombo);
          setSteps(fetchedSteps);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [comboId, deckId]);

  const goToPage = () => {
    router.push(`/deck/${deckId}`);
  };

  const handleSubmitRequest = (data: ComboForm) => {
    setFormData(data);
    setShowSubmitPopUp(true);
  };

  const handleUpdateCombo = async () => {
    setIsSubmitting(true);
    if (!formData || !deckId || typeof deckId !== "string") {
      setNotification({
        ...notification,
        message: "Error creating combo",
        type: "error",
        show: true,
        duration: 5000,
      });
      return;
    }
    try {
      const data = {
        deckId,
        author: formData.author,
        title: formData.title,
        difficulty: formData.difficulty,
        tags: formData.tags.map((t) => t.id),

        starting_hand: formData.starting_hand.map((card) => ({
          card_id: card.card_id,
          card_name: card.card_name,
        })),

        final_board: formData.final_board.map((card) => ({
          card_id: card.card_id,
          card_name: card.card_name,
        })),

        steps: formData.steps.map((step) => ({
          card_id: step.card_id,
          action_text: step.action_text,
          step_order: step.step_order,
          target_cards: step.step_targets,
        })),
      };

      await updateFullCombo(Number(comboId), data);
      setIsLoading(true);
      setNotification({
        ...notification,
        message: "Combo updated successfully",
        type: "success",
        show: true,
        duration: 3000,
      });
      setTimeout(() => {
        router.push(`/${deckId}`);
      }, 3000);
    } catch (error) {
      console.error("Error creating combo:", error);
      setNotification({
        ...notification,
        message: "Error updating combo",
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
    return (
      <>
        <LoadingAnimation />
        <BottomLeftNotification
          message={notification.message}
          duration={notification.duration}
          show={notification.show}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      </>
    );
  }

  return (
    <>
      <MainContainer>
        {showSubmitPopUp && (
          <SubmitComboPopUp
            onCancel={() => setShowSubmitPopUp(false)}
            onConfirm={handleUpdateCombo}
            isSubmitting={isSubmitting}
            title={"Confirm modifications"}
            action={"update"}
            steps={formData ? formData.steps : []}
          />
        )}
        <BottomLeftNotification
          message={notification.message}
          duration={notification.duration}
          show={notification.show}
          type={notification.type}
          onClose={handleCloseNotification}
        />
        <GoBackButton goToPage={goToPage} />
        <MainWrapper>
          <div className="flex flex-col gap-2 p-4 bg-white/80 text-slate-800 clip-diagonal">
            <h1 className="text-2xl font-bold text-center">
              Update combo for {deck?.name} deck
            </h1>
          </div>
          <div className="flex flex-col items-center border-2 border-white/50 flex-1 p-5">
            <CreateComboForm
              onRequestSubmit={handleSubmitRequest}
              setNotification={setNotification}
              combo={combo}
              steps={steps}
            />
          </div>
        </MainWrapper>
      </MainContainer>
    </>
  );
};

export default UpdateCombo;
