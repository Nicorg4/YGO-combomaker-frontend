import { fetchFromAPI } from "@/services/api";
import { Combo } from "@/types/types";

export const getAllCombosFromDeck = async (deckId: string): Promise<Combo[]> => {
    return await fetchFromAPI<Combo[]>(`/combos/deck/${deckId}`);
}

export const getComboById = async (id: string): Promise<Combo> => {
    return await fetchFromAPI<Combo>(`/combos/${id}`);
}

export const createCombo = async (deckId: string, comboData: { author: string, title: string, difficulty: string }): Promise<Combo> => {
    return await fetchFromAPI<Combo>(`/combos/deck/${deckId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comboData),
    });
}

export const deleteComboById = async (comboId: number): Promise<number> => {
    return await fetchFromAPI<number>(`/combos/${comboId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}