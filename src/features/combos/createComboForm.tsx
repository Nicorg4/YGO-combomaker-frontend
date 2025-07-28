"use client";

import React, { useEffect, useState } from "react";
import CardSearchInput from "../cards/cardSearchInput";
import {
  BottomLefNotificationProps,
  Card,
  Combo,
  ComboForm,
  Step,
  StepInput,
} from "@/types/types";
import TagSelector from "../tags/tagSelector";
import PaginationController from "@/components/paginationController";
import CardSelector from "./startingHandSelector";
import { IoTrashOutline, IoCreateOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

type Props = {
  onRequestSubmit: (data: ComboForm) => void;
  setNotification: React.Dispatch<
    React.SetStateAction<Omit<BottomLefNotificationProps, "onClose">>
  >;
  combo?: Combo;
  steps?: Step[];
};

const CreateComboForm = ({
  onRequestSubmit,
  setNotification,
  combo,
  steps,
}: Props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [cardList, setCardList] = useState<Card[]>([]);
  const [formData, setFormData] = useState<ComboForm>({
    title: "",
    author: "",
    difficulty: "",
    starting_hand: [],
    final_board: [],
    tags: [],
    steps: [
      {
        action_text: "",
        step_targets: [],
        card_id: 0,
        step_order: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/cards.json");
        if (!res.ok) throw new Error("Error fetching cards");
        const data: Card[] = await res.json();
        setCardList(data);
      } catch (error) {
        console.error("Failed to load card list:", error);
      }
    };
    const loadComboData = () => {
      if (!combo || !steps) return;
      console.log(steps[0].step_targets[0]);
      setFormData({
        title: combo.title,
        author: combo.author,
        difficulty: combo.difficulty,
        starting_hand: combo.starting_hand,
        final_board: combo.final_board,
        tags: combo.tags,
        steps: steps,
      });
    };
    fetchCards();
    loadComboData();
  }, [combo, steps]);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === formData.steps.length;

  const handleComboChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectedCardForStep = formData.steps[currentStepIndex - 1]?.card_id
    ? cardList.find(
        (c) => c.card_id === formData.steps[currentStepIndex - 1].card_id
      ) || null
    : null;

  const handleStepChange = (field: keyof StepInput, value: string) => {
    setFormData((prev) => {
      const steps = [...prev.steps];
      steps[currentStepIndex - 1] = {
        ...steps[currentStepIndex - 1],
        [field]: value,
      };
      return { ...prev, steps };
    });
  };

  const goNext = () => {
    if (isFirstStep) {
      if (formData.steps.length === 0) {
        setFormData((prev) => ({
          ...prev,
          steps: [
            {
              action_text: "",
              step_targets: [],
              card_id: 0,
              step_order: 1,
            },
          ],
        }));
      }
      setCurrentStepIndex(1);
    } else if (currentStepIndex < formData.steps.length) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const addStep = () => {
    setFormData((prev) => {
      const insertIndex = currentStepIndex;
      const newStep = {
        action_text: "",
        step_targets: [],
        card_id: 0,
        step_order: insertIndex + 1,
      };
      const newSteps = [
        ...prev.steps.slice(0, insertIndex),
        newStep,
        ...prev.steps.slice(insertIndex),
      ].map((step, idx) => ({
        ...step,
        step_order: idx + 1,
      }));
      return {
        ...prev,
        steps: newSteps,
      };
    });
    setCurrentStepIndex((prev) => prev + 1);
  };

  const goBack = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
  };

  const deleteStep = (indexToDelete: number) => {
    setFormData((prev) => {
      const newSteps = prev.steps
        .filter((_, idx) => idx !== indexToDelete)
        .map((step, idx) => ({
          ...step,
          step_order: idx + 1,
        }));

      return {
        ...prev,
        steps: newSteps,
      };
    });

    setCurrentStepIndex((prev) => {
      if (prev > indexToDelete) return prev - 1;
      if (prev === indexToDelete && prev === formData.steps.length - 1)
        return prev - 1;
      return prev;
    });
  };

  const setSelectedCardForStep = (card: Card | null) => {
    setFormData((prev) => {
      const steps = [...prev.steps];
      steps[currentStepIndex - 1] = {
        ...steps[currentStepIndex - 1],
        card_id: card ? card.card_id : 0,
      };
      return { ...prev, steps };
    });
  };

  const handleClickCreate = () => {
    const hasIncompleteStep = formData.steps.some(
      (step) => step.card_id === 0 || step.action_text.trim() === ""
    );
    if (hasIncompleteStep) {
      setNotification((prev) => ({
        ...prev,
        message: "Combo is not complete. Please fill in all fields.",
        type: "error",
        show: true,
        duration: 5000,
      }));
      return;
    }
    onRequestSubmit(formData);
  };

  return (
    <div className="relative flex flex-col flex-1 w-full">
      {isFirstStep && (
        <div className="flex flex-col flex-1 items-center w-[90%] m-auto">
          <h2 className="text-xl font-bold">Insert new combo data:</h2>
          <span className="pl-2 w-full text-left mt-3">Title</span>
          <input
            className="w-full p-2 bg-white/80 text-slate-700 clip-diagonal-small"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleComboChange}
          />
          <span className="pl-2 w-full text-left mt-3">Author</span>
          <input
            className="w-full p-2 bg-white/80 text-slate-700 clip-diagonal-small"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleComboChange}
          />
          <span className="pl-2 w-full text-left mt-3">Difficulty</span>
          <select
            className="w-full p-2 bg-white/80 text-slate-700 clip-diagonal-small"
            name="difficulty"
            value={formData.difficulty || ""}
            onChange={(e) => handleComboChange(e)}
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <span className="pl-2 w-full text-left mt-3">Tags (max 3)</span>
          <TagSelector
            selectedTags={formData.tags}
            setSelectedTags={(tags) =>
              setFormData((prev) => ({ ...prev, tags }))
            }
          />
          <span className="pl-2 w-full text-left mt-3">
            Starting hand (max 6)
          </span>
          <CardSelector
            cardList={cardList}
            cards={formData.starting_hand || []}
            setCards={(cards) =>
              setFormData((prev) => ({ ...prev, starting_hand: cards }))
            }
            maxCards={6}
          />
          <span className="pl-2 w-full text-left mt-3">End board</span>
          <CardSelector
            cardList={cardList}
            cards={formData.final_board || []}
            setCards={(cards) =>
              setFormData((prev) => ({ ...prev, final_board: cards }))
            }
            maxCards={20}
          />
        </div>
      )}

      {!isFirstStep && (
        <div className="flex flex-col flex-1 items-center w-[90%] m-auto">
          <h2 className="text-xl font-bold">Step {currentStepIndex}</h2>
          <span className="pl-2 w-full text-left mt-3">Card</span>
          <CardSearchInput
            cardList={cardList}
            selectedCard={selectedCardForStep?.card_name ?? ""}
            setSelectedCard={(card) => setSelectedCardForStep(card)}
          />
          <span className="pl-2 w-full text-left mt-3">Action</span>
          <input
            placeholder="Describe step action"
            className="w-full p-2 bg-white/80 text-slate-700 clip-diagonal-small"
            value={formData.steps[currentStepIndex - 1]?.action_text ?? ""}
            onChange={(e) => handleStepChange("action_text", e.target.value)}
          />
          <span className="pl-2 w-full text-left mt-3">Targets</span>
          <CardSelector
            cardList={cardList}
            cards={formData.steps[currentStepIndex - 1]?.step_targets || []}
            setCards={(cards) =>
              setFormData((prev) => {
                const updatedSteps = [...prev.steps];
                updatedSteps[currentStepIndex - 1] = {
                  ...updatedSteps[currentStepIndex - 1],
                  step_targets: cards,
                };
                return { ...prev, steps: updatedSteps };
              })
            }
            maxCards={100}
          />

          <div className="flex flex-col gap-2 mt-5 md:flex-row mb-3">
            {currentStepIndex > 1 && (
              <button
                className="flex align-middle justify-center items-center text-xl gap-1 text-white font-bold cursor-pointer bg-red-400 clip-diagonal-small py-1 px-5 hover:bg-white/90 transition-all duration-300 ease-in-out"
                onClick={() => deleteStep(currentStepIndex - 1)}
              >
                Remove step <IoTrashOutline />
              </button>
            )}
            <button
              className="flex align-middle justify-center items-center text-xl gap-1 text-slate-800 font-bold cursor-pointer bg-white/70 clip-diagonal-small py-1 px-5 hover:bg-white/90 transition-all duration-300 ease-in-out"
              onClick={addStep}
            >
              Add step <GoPlus />
            </button>
          </div>
          {isLastStep && (
            <button
              className="flex align-middle justify-center items-center text-xl gap-1 text-slate-800 font-bold cursor-pointer bg-white/70 clip-diagonal-small py-1 px-5 hover:bg-white/90 transition-all duration-300 ease-in-out"
              onClick={handleClickCreate}
            >
              {combo && steps ? 'Update' : 'Create'} combo <IoCreateOutline />
            </button>
          )}
        </div>
      )}
      <PaginationController
        currentPage={currentStepIndex}
        totalPages={formData.steps.length}
        goBack={goBack}
        goNext={goNext}
      />
    </div>
  );
};

export default CreateComboForm;
