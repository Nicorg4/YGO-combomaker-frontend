import { fetchFromAPI } from "@/services/api";
import { Card, Combo } from "@/types/types";

export const getAllCombosFromDeck = async (
  deckId: string
): Promise<Combo[]> => {
  return await fetchFromAPI<Combo[]>(`/combos/deck/${deckId}`);
};

export const getComboById = async (id: string): Promise<Combo> => {
  return await fetchFromAPI<Combo>(`/combos/${id}`);
};

export const createCombo = async (
  deckId: string,
  comboData: { author: string; title: string; difficulty: string }
): Promise<Combo> => {
  return await fetchFromAPI<Combo>(`/combos/deck/${deckId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comboData),
  });
};

export const deleteComboById = async (comboId: number): Promise<number> => {
  return await fetchFromAPI<number>(`/combos/${comboId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createFullCombo = async (comboData: {
  deckId: string;
  author: string;
  title: string;
  difficulty: string;
  tags: number[];
  starting_hand: { card_id: number; card_name: string }[];
  final_board: { card_id: number; card_name: string }[];
  steps: {
    card_id: number;
    action_text: string;
    step_order: number;
    target_cards: Card[];
  }[];
}): Promise<Combo> => {
  return await fetchFromAPI<Combo>(`/combos/create-full-combo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comboData),
  });
};

export const updateFullCombo = async (comboId: number, comboData: {
  deckId: string;
  author: string;
  title: string;
  difficulty: string;
  tags: number[];
  starting_hand: { card_id: number; card_name: string }[];
  final_board: { card_id: number; card_name: string }[];
  steps: {
    card_id: number;
    action_text: string;
    step_order: number;
    target_cards: Card[];
  }[];
}): Promise<Combo> => {
  return await fetchFromAPI<Combo>(`/combos/update-full-combo/${comboId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comboData),
  });
};
