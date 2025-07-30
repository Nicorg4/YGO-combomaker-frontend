import { useState } from "react";
import { KeyCard, MainDanger } from "@/types/types";
import CardSearchInput from "../cards/cardSearchInput";
import CardSelector from "../combos/startingHandSelector";
import { FaPlus } from "react-icons/fa6";
import MainButton from "@/components/mainButton";

interface Props {
  keyCards: KeyCard[];
  mainDangers: MainDanger[];
  notes: string;
  onChange: (data: {
    keyCards: KeyCard[];
    mainDangers: MainDanger[];
    notes: string;
  }) => void;
  cardList: { card_id: number; card_name: string }[];
}

export default function DeckInfoForm({
  keyCards,
  mainDangers,
  notes,
  onChange,
  cardList,
}: Props) {
  const [localKeyCards, setLocalKeyCards] = useState<KeyCard[]>(keyCards);
  const [localMainDangers, setLocalMainDangers] =
    useState<MainDanger[]>(mainDangers);
  const [localNotes, setLocalNotes] = useState<string>(notes);

  const updateParent = (
    kc = localKeyCards,
    md = localMainDangers,
    n = localNotes
  ) => {
    onChange({ keyCards: kc, mainDangers: md, notes: n });
  };

  const handleAddKeyCard = () => {
    const newCard: KeyCard = {
      card_id: Date.now(),
      card_name: "",
      description: "",
    };
    const updated = [...localKeyCards, newCard];
    setLocalKeyCards(updated);
    updateParent(updated);
  };

  const handleRemoveKeyCard = (id: number) => {
    const updated = localKeyCards.filter((card) => card.card_id !== id);
    setLocalKeyCards(updated);
    updateParent(updated);
  };

  const handleKeyCardChange = (
    id: number,
    field: keyof KeyCard,
    value: string
  ) => {
    const updated = localKeyCards.map((card) =>
      card.card_id === id ? { ...card, [field]: value } : card
    );
    setLocalKeyCards(updated);
    updateParent(updated);
  };

  const handleKeyCardSelect = (
    id: number,
    card: { card_id: number; card_name: string }
  ) => {
    const updated = localKeyCards.map((kc) =>
      kc.card_id === id
        ? { ...kc, card_id: card.card_id, card_name: card.card_name }
        : kc
    );
    setLocalKeyCards(updated);
    updateParent(updated);
  };

  const handleAddDanger = () => {
    const newDanger: MainDanger = {
      card_id: Date.now(),
      card_name: "",
      extra_notes: "",
      responses: [],
    };
    const updated = [...localMainDangers, newDanger];
    setLocalMainDangers(updated);
    updateParent(undefined, updated);
  };

  const handleRemoveDanger = (id: number) => {
    const updated = localMainDangers.filter((danger) => danger.card_id !== id);
    setLocalMainDangers(updated);
    updateParent(undefined, updated);
  };

  const handleDangerChange = (
    id: number,
    field: keyof MainDanger,
    value: string
  ) => {
    const updated = localMainDangers.map((danger) =>
      danger.card_id === id ? { ...danger, [field]: value } : danger
    );
    setLocalMainDangers(updated);
    updateParent(undefined, updated);
  };

  const handleDangerCardSelect = (
    id: number,
    card: { card_id: number; card_name: string }
  ) => {
    const updated = localMainDangers.map((danger) =>
      danger.card_id === id
        ? { ...danger, card_id: card.card_id, card_name: card.card_name }
        : danger
    );
    setLocalMainDangers(updated);
    updateParent(undefined, updated);
  };

  const handleDangerResponsesChange = (
    id: number,
    updatedResponses: { card_id: number; card_name: string }[]
  ) => {
    const updated = localMainDangers.map((danger) =>
      danger.card_id === id
        ? { ...danger, responses: updatedResponses }
        : danger
    );
    setLocalMainDangers(updated);
    updateParent(undefined, updated);
  };

  const handleNotesChange = (value: string) => {
    setLocalNotes(value);
    updateParent(undefined, undefined, value);
  };

  return (
    <form className="flex flex-col space-y-6">
      <div className="flex flex-col border-1 border-white/70 p-3">
        <h2 className="text-xl font-bold mb-2 text-center text-white">
          Key Cards
        </h2>
        {localKeyCards.map((card) => (
          <div key={card.card_id} className="flex flex-col mb-4 p-2">
            <span>Card</span>
            <CardSearchInput
              cardList={cardList}
              selectedCard={card.card_name}
              setSelectedCard={(cardObj) =>
                cardObj && handleKeyCardSelect(card.card_id, cardObj)
              }
            />
            <span className="mt-3">Description</span>
            <textarea
              maxLength={40}
              placeholder="Description"
              value={card.description || ""}
              onChange={(e) =>
                handleKeyCardChange(card.card_id, "description", e.target.value)
              }
              className="w-full pl-5 p-2 bg-white clip-diagonal-small text-slate-800 mb-2"
            />
            <p className="text-sm text-gray-500 text-right">
              {card.description.length} / 40
            </p>
            <div className="flex justify-center">
              <MainButton
                onClick={() => handleRemoveKeyCard(card.card_id)}
                text={"Remove"}
                type={"delete"}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <MainButton
            onClick={handleAddKeyCard}
            text={"Add Key Card"}
            type={"confirm"}
          >
            <FaPlus />
          </MainButton>
        </div>
      </div>

      <div className="flex flex-col border-1 border-white/70 p-3">
        <h2 className="text-xl font-bold mb-2 text-center text-white">
          Main Dangers
        </h2>
        {localMainDangers.map((danger) => (
          <div key={danger.card_id} className="flex flex-col mb-4 p-2">
            <span>Card</span>
            <CardSearchInput
              cardList={cardList}
              selectedCard={danger.card_name}
              setSelectedCard={(cardObj) =>
                cardObj && handleDangerCardSelect(danger.card_id, cardObj)
              }
            />
            <span className="mt-3">Description</span>
            <textarea
              maxLength={400}
              placeholder="Extra Notes"
              value={danger.extra_notes || ""}
              onChange={(e) =>
                handleDangerChange(
                  danger.card_id,
                  "extra_notes",
                  e.target.value
                )
              }
              className="w-full pl-5 p-2 bg-white clip-diagonal-small text-slate-800"
            />
            <p className="text-sm text-gray-500 text-right">
              {danger.extra_notes.length} / 400
            </p>
            <span className="mt-3">Counters</span>
            <CardSelector
              cardList={cardList}
              cards={danger.responses}
              setCards={(cards) =>
                handleDangerResponsesChange(danger.card_id, cards)
              }
              maxCards={5}
            />
            <div className="flex justify-center">
              <MainButton
                onClick={() => handleRemoveDanger(danger.card_id)}
                text={"Remove"}
                type={"delete"}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <MainButton
            onClick={handleAddDanger}
            text={"Add Main Danger"}
            type={"confirm"}
          >
            <FaPlus />
          </MainButton>
        </div>
      </div>

      <div className="flex flex-col border-1 border-white/70 p-3">
        <h2 className="text-xl font-bold mb-2 text-center text-white">Notes</h2>
        <span>Note</span>
        <textarea
          value={localNotes || ""}
          placeholder="Write your notes here..."
          onChange={(e) => handleNotesChange(e.target.value)}
          className="w-full pl-5 p-2 bg-white clip-diagonal-small text-slate-800"
        />
      </div>
    </form>
  );
}
