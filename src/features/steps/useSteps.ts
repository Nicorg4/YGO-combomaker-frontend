import { fetchFromAPI } from "@/services/api";
import { Step } from "@/types/types";

export const getStepsByComboId = async (id: string): Promise<Step[]> => {
    return await fetchFromAPI<Step[]>(`/steps/combo/${id}`);
}

export const createStep = async (comboId: number, card_id: number, action_text: string, step_order: number, target_card_ids: number[]) : Promise<Step> => {
    return await fetchFromAPI<Step>(`/steps/combo/${comboId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            card_id: card_id,
            action_text: action_text,
            step_order: step_order,
            target_card_ids: target_card_ids
        })
    });
}