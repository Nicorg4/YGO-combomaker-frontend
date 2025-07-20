import { fetchFromAPI } from "@/services/api";
import { Combo } from "@/types/types";

export const getAllCombosFromDeck = async (deckId: string): Promise<Combo[]> => {
    return await fetchFromAPI<Combo[]>(`/combos/deck/${deckId}`);
}

export const getComboById = async (id: string): Promise<Combo> => {
    return await fetchFromAPI<Combo>(`/combos/${id}`);
}