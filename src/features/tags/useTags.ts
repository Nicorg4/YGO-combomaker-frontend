import { fetchFromAPI } from "@/services/api";
import { Tag } from "@/types/types";

export const getAllTags = async (): Promise<Tag[]> => {
    return await fetchFromAPI<Tag[]>('/tags');
}

export const createTag = async (comboId: number, tagId: number): Promise<Tag> => {
    return await fetchFromAPI<Tag>('/comboTags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            combo_id: comboId,
            tag_id: tagId
        })
    });
}