import { fetchFromAPI } from "@/services/api";
import { Tag } from "@/types/types";

export const getAllTags = async (): Promise<Tag[]> => {
    return await fetchFromAPI<Tag[]>('/tags');
}