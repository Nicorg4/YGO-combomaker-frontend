import { fetchFromAPI } from "@/services/api";
import { Step } from "@/types/types";

export const getStepsByComboId = async (id: string): Promise<Step[]> => {
    return await fetchFromAPI<Step[]>(`/steps/combo/${id}`);
}