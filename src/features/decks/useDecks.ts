import { fetchFromAPI } from "@/services/api";
import { Deck, KeyCard, MainDanger } from "@/types/types";

export const getAllDecks = async (): Promise<{
  decks: Deck[];
  total: number;
  page: number;
  limit: number;
}> => {
  return await fetchFromAPI<{
    decks: Deck[];
    total: number;
    page: number;
    limit: number;
  }>("/decks?limit=100");
};

export const getDeckById = async (id: string): Promise<Deck> => {
  return await fetchFromAPI<Deck>(`/decks/${id}`);
};

export const getDeckInfo = async (
  deckId: string
): Promise<{
  key_cards: KeyCard[];
  main_dangers: MainDanger[];
  note: string;
  name: string;
}> => {
  return await fetchFromAPI<{
    key_cards: KeyCard[];
    main_dangers: MainDanger[];
    note: string;
    name: string;
  }>(`/decks/info/${deckId}`);
};

export const setDeckInfo = async (
  deckId: string,
  data: {
    key_cards: KeyCard[];
    main_dangers: MainDanger[];
    note: string;
  }
): Promise<void> => {
  await fetchFromAPI<void>(`/decks/info/${deckId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
