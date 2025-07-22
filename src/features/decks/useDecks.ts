import { fetchFromAPI } from "@/services/api";
import { Deck } from "@/types/types";

export const getAllDecks = async (): Promise<{ decks: Deck[], total: number, page: number, limit: number }> => {
    return await fetchFromAPI<{ decks: Deck[], total: number, page: number, limit: number }>("/decks?limit=100");
}

export const getDeckById = async (id: string): Promise<Deck> => {
    return await fetchFromAPI<Deck>(`/decks/${id}`);
}