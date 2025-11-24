"use client";

import CardSearchInput from "@/features/cards/cardSearchInput";
import { Card } from "@/types/types";
import React, { useEffect, useState } from "react";
import MainButton from "./mainButton";
import Image from "next/image";
import { getImageFromApi } from "@/features/images/useImages";

type Props = {
  toggleCardQuizPopUp: () => void;
};

type QuizCard = {
  id: number;
  name: string;
  image_url: string;
  desc: string;
  race?: string;
  attribute?: string;
};

const CardQuizPopUp = ({ toggleCardQuizPopUp }: Props) => {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [quizCard, setQuizCard] = useState<QuizCard>({
    id: 0,
    name: "",
    image_url: "",
    desc: "",
  });
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [maxStreak, setMaxStreak] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("maxStreak");
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });
  const [cardIsHovered, setCardIsHovered] = useState(false);
  const [guessesLeft, setGuessesLeft] = useState(3);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const savedMax = localStorage.getItem("maxStreak");
    if (savedMax) {
      setMaxStreak(parseInt(savedMax));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("maxStreak", maxStreak.toString());
  }, [maxStreak]);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 2000);
  };

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
    fetchCards();
  }, []);

  const getRandomCardName = (): string => {
    if (cardList.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * cardList.length);
    return cardList[randomIndex].card_name;
  };

  const fetchQuizCard = async () => {
    try {
      const res = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${getRandomCardName()}`
      );
      if (!res.ok) throw new Error("Error fetching cards");
      const data: QuizCard = (await res.json()).data[0];
      setQuizCard(data);
      setGuessesLeft(3);
    } catch (error) {
      console.error("Failed to load quiz card:", error);
    }
  };

  const startQuiz = async () => {
    setIsLoading(true);
    await fetchQuizCard();
    setQuizStarted(true);
    setIsLoading(false);
  };

  const restartQuiz = async () => {
    setIsLoading(true);
    await fetchQuizCard();
    setCurrentStreak(0);
    setSelectedCard(null);
    setGuessesLeft(3);
    setIsLoading(false);
  };

  const checkAnswer = () => {
    if (!selectedCard) return;

    const isCorrect = selectedCard.card_name === quizCard.name;

    if (isCorrect) {
      showFeedback("success", "Correct!");

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);

      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }

      setSelectedCard(null);
      fetchQuizCard();
      return;
    }

    const newGuesses = guessesLeft - 1;

    setGuessesLeft(newGuesses);

    if (newGuesses <= 0) {
      showFeedback("error", "No guesses left! You lost.");
      setCurrentStreak(0);
      setSelectedCard(null);
      fetchQuizCard();
      return;
    }

    showFeedback("error", `Wrong! ${newGuesses} guesses left.`);
    setSelectedCard(null);
  };

  const lostLives = 3 - guessesLeft;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-[200]">
      <div className="bg-slate-800 shadow-xl p-10 sm:max-w-lg w-full relative clip-diagonal max-w-[90%]">
        <button
          onClick={toggleCardQuizPopUp}
          className="absolute top-2 right-2 text-slate-700 hover:bg-white/70 text-2xl font-bold cursor-pointer transition-all duration-300 clip-diagonal-small p-1 px-4 pb-2 bg-white/50"
        >
          x
        </button>

        {quizStarted ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-white">
              Guess the card!
            </h1>

            <div className="flex border-t border-b border-white/50 justify-between items-center py-2">
              <h2>Current streak: {currentStreak}</h2>
              <h2>Max streak: {maxStreak}</h2>
              <div className="flex gap-1 text-xl">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={i < lostLives ? "text-red-500" : "text-gray-400"}
                  >
                    {i < lostLives ? "❌" : "✖️"}
                  </span>
                ))}
              </div>
            </div>

            <CardSearchInput
              cardList={cardList}
              selectedCard={selectedCard?.card_name ?? ""}
              setSelectedCard={(card) => setSelectedCard(card)}
            />

            <div className="relative flex w-full justify-center">
              <div className="absolute top-3 h-[17px] w-37 bg-slate-700"/>
              {cardIsHovered && <></>}
              {quizCard.id !== 0 && (
                <div className="flex flex-col items-center w-full">
                  <Image
                    src={getImageFromApi(quizCard?.id)}
                    alt={quizCard?.name}
                    width={170}
                    height={170}
                    className="border-2 border-white/50"
                    onMouseEnter={() => setCardIsHovered(true)}
                    onMouseLeave={() => setCardIsHovered(false)}
                  />
                  <div className="z-50 bg-white clip-diagonal-small p-3 text-slate-900 mt-4 w-full">
                    <div className="flex mb-1">
                      {quizCard.attribute ? (
                        <p className="text-sm text-left font-bold text-[14px]">
                          [{quizCard.attribute} / {quizCard.race}]
                        </p>
                      ) : (
                        <p className="text-sm text-left font-bold text-[14px]">
                          [{quizCard.race}]
                        </p>
                      )}
                    </div>
                    <p className="text-left text-[12px] overflow-auto custom-scrollbar-alt min-h-20 max-h-20">{quizCard.desc}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="h-8 flex justify-center items-center">
              {feedback && (
                <div
                  className={`text-center font-bold text-lg transition-opacity duration-300 ${
                    feedback.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <MainButton
                onClick={restartQuiz}
                text={"Restart"}
                type={"delete"}
                isLoading={isLoading}
              />
              <MainButton
                onClick={checkAnswer}
                text={"Submit"}
                type={"confirm"}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-4">
              Welcome to the quiz!
            </h1>
            <p className="text-white/70 mb-4">
              Test your knowledge of Yu-Gi-Oh! cards by guessing the card name
              based on its image. Click <strong>[Start]</strong> to begin the
              quiz.
            </p>
            <div className="flex justify-center mt-4">
              <MainButton
                onClick={startQuiz}
                text={"Start"}
                type={"confirm"}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardQuizPopUp;
