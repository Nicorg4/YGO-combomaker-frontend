"use client";
import BottomLeftNotification from "@/components/bottomLeftNotification";
import GoBackButton from "@/components/goBackButton";
import LoadingAnimation from "@/components/loadingAnimation";
import MainButton from "@/components/mainButton";
import MainContainer from "@/components/mainContainer";
import MainWrapper from "@/components/mainWrapper";
import DeckInfoForm from "@/features/decks/deckInfoForm";
import DeckKeyCards from "@/features/decks/deckKeyCards";
import DeckMainDangers from "@/features/decks/deckMainDangers";
import DeckNotes from "@/features/decks/deckNotes";
import { getDeckInfo, setDeckInfo } from "@/features/decks/useDecks";
import {
  BottomLefNotificationProps,
  Card,
  KeyCard,
  MainDanger,
} from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

const DeckInfo = () => {
  const deckId = useParams().deckId;
  const [keyCards, setKeyCards] = useState<KeyCard[]>([]);
  const [mainDangers, setMainDangers] = useState<MainDanger[]>([]);
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [cardList, setCardList] = useState<Card[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");

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
        if (typeof deckId === "string") {
          const deckInfo = await getDeckInfo(deckId);
          const res = await fetch("/cards.json");
          if (!res.ok) throw new Error("Error fetching cards");
          const data: Card[] = await res.json();
          setCardList(data);
          setKeyCards(deckInfo.key_cards);
          setMainDangers(deckInfo.main_dangers);
          setNotes(deckInfo.note);
          setName(deckInfo.name);
          console.log("Deck Info:", deckInfo);
        }
      } catch (error) {
        console.error("Error fetching deck info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [deckId]);

  const handleDeckInfoChange = ({
    keyCards: updatedKeyCards,
    mainDangers: updatedMainDangers,
    notes: updatedNotes,
  }: {
    keyCards: KeyCard[];
    mainDangers: MainDanger[];
    notes: string;
  }) => {
    setKeyCards(updatedKeyCards);
    setMainDangers(updatedMainDangers);
    setNotes(updatedNotes);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const isIncompleteKeyCard = ({
      card_id,
      card_name,
      description,
    }: KeyCard) =>
      card_id === null || card_name.trim() === "" || description.trim() === "";

    const isIncompleteMainDanger = ({ card_id, card_name }: MainDanger) =>
      card_id === null || card_name.trim() === "";

    const hasIncompleteKeyCards = keyCards.some(isIncompleteKeyCard);
    const hasIncompleteMainDangers = mainDangers.some(isIncompleteMainDanger);

    if (hasIncompleteKeyCards || hasIncompleteMainDangers) {
      setNotification({
        ...notification,
        message: "Error updating deck. Please fill all fields",
        type: "error",
        show: true,
        duration: 5000,
      });
      setIsSubmitting(false);
      return;
    }

    if (typeof deckId !== "string") return;
    const payload = {
      key_cards: keyCards,
      main_dangers: mainDangers,
      note: notes,
    };
    try {
      await setDeckInfo(deckId, payload);
      setNotification({
        ...notification,
        message: "Deck updated successfully",
        type: "success",
        show: true,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error saving deck info:", error);
      setNotification({
        ...notification,
        message: "Error updating deck",
        type: "error",
        show: true,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  const goToPage = (url: string) => {
    router.push(url);
  };

  const components = {
    keyCards: <DeckKeyCards keyCards={keyCards} />,
    mainDangers: <DeckMainDangers mainDangers={mainDangers} />,
    notes: <DeckNotes note={notes} />,
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <MainContainer>
      <GoBackButton goToPage={() => goToPage(`/deck/${deckId}`)} />
      <BottomLeftNotification
        message={notification.message}
        duration={notification.duration}
        show={notification.show}
        type={notification.type}
        onClose={handleCloseNotification}
      />
      <MainWrapper>
        {!isEditing ? (
          <div className="flex flex-col space-y-3 flex-1">
            <h1 className="text-2xl font-bold text-white">{name} deck info</h1>
            {Object.entries(components).map(([key, component]) => (
              <div
                key={key}
                className="flex flex-col flex-1 bg-white/70 p-4 clip-diagonal"
              >
                {component}
              </div>
            ))}
            <div className="flex justify-center">
              <MainButton
                onClick={() => setIsEditing(true)}
                text="Edit Info"
                type="confirm"
              >
                <MdOutlineEdit />
              </MainButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 flex-1">
            <DeckInfoForm
              keyCards={keyCards}
              mainDangers={mainDangers}
              notes={notes}
              onChange={handleDeckInfoChange}
              cardList={cardList}
            />
            <div className="flex justify-center gap-2">
              <MainButton
                onClick={handleSubmit}
                text="Save Info"
                type="confirm"
                isLoading={isSubmitting}
              >
                <MdOutlineEdit />
              </MainButton>
              <MainButton
                onClick={() => setIsEditing(false)}
                text="Cancel"
                type="cancel"
              />
            </div>
          </div>
        )}
      </MainWrapper>
    </MainContainer>
  );
};

export default DeckInfo;
