'use client'

import React, { useState, useEffect } from 'react';
import { getAllTags } from './useTags';

type Tag = {
    id: number;
    name: string;
};

type Props = {
    selectedTags: Tag[];
    setSelectedTags: (tags: Tag[]) => void;
};

const TagSelector = ({ selectedTags, setSelectedTags }: Props) => {
    const [allTags, setAllTags] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            const data = await getAllTags();
            setAllTags(data);
        };
        fetchTags();
    }, []);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value);
        const selectedTag = allTags.find(tag => tag.id === selectedId);

        if (selectedTag && !selectedTags.find(t => t.id === selectedTag.id)) {
            if (selectedTags.length < 3) {
                setSelectedTags([...selectedTags, selectedTag]);
            }
        }
        e.target.value = "";
    };

    const removeTag = (id: number) => {
        setSelectedTags(selectedTags.filter(tag => tag.id !== id));
    };

    return (
        <div className="w-full">
            <select
                onChange={handleSelectChange}
                className="w-full p-2 bg-white text-slate-800 clip-diagonal-small"
                disabled={selectedTags.length >= 3}
            >
                <option value="">Select a tag</option>
                {allTags
                    .filter(tag => !selectedTags.find(t => t.id === tag.id))
                    .map(tag => (
                        <option key={tag.id} value={tag.id} className='bg-white/50 text-slate-800 clip-diagonal-small'>
                            {tag.name}
                        </option>
                    ))}
            </select>

            <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map(tag => (
                    <span
                        key={tag.id}
                        className="px-2 py-1 bg-blue-200 text-blue-800 cursor-pointer clip-diagonal-small"
                        onClick={() => removeTag(tag.id)}
                    >
                        {tag.name} ×
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
