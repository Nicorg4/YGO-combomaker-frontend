import type { Dispatch, SetStateAction } from 'react';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { LuArrowDownUp } from "react-icons/lu";
import MultiSelectFilter from './multiSelectFilter';

type Props = {
    sortBy: string;
    setSortBy: (data: string) => void;
    toggleSortOrder: () => void;
    expandAll: () => void;
    collapseAll: () => void;
    selectedDifficulties: string[]
    setSelectedDifficulties: Dispatch<SetStateAction<string[]>>
    selectedTags: string[]
    setSelectedTags: Dispatch<SetStateAction<string[]>>
    tags: string[]
}

const FilteringControls = ({ sortBy, setSortBy, toggleSortOrder, expandAll, collapseAll, selectedDifficulties, setSelectedDifficulties, tags, selectedTags, setSelectedTags }: Props) => {
    return (
        <div className='w-full hidden md:flex justify-between'>
            <div className="flex gap-2 items-center">
                <label className="text-white">Sort:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 bg-white/70 text-slate-800 clip-diagonal-small"
                >
                    <option value="title">Title</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="author">Author</option>
                    <option value="date">Date</option>
                    <option value="starting_hand">Number of starters</option>
                    <option value="final_board">Final board cards</option>
                </select>
                <button
                    onClick={() => toggleSortOrder()}
                    className='flex align-middle justify-center items-center text-xl text-slate-800 font-bold cursor-pointer bg-white/70 clip-diagonal-small p-2 hover:bg-white/90 transition-all duration-300 ease-in-out'
                >
                    <LuArrowDownUp />
                </button>
            </div>
            <div className="flex gap-2 items-center">
                <label className="text-white">Filters:</label>
                <MultiSelectFilter
                    selected={selectedDifficulties}
                    setSelected={setSelectedDifficulties}
                    filterBy={'Difficulty'}
                    options={['Easy', 'Medium', 'Hard']}
                    hidden={true}
                />
                <MultiSelectFilter
                    selected={selectedTags}
                    setSelected={setSelectedTags}
                    filterBy={'Tags'}
                    options={tags}
                />
            </div>
            <div className="flex gap-1 items-center">
                <label className="text-white">Toggle:</label>
                <button
                    className='flex align-middle justify-center items-center text-xl text-slate-800 font-bold cursor-pointer bg-white/70 clip-diagonal-small p-2 hover:bg-white/90 transition-all duration-300 ease-in-out'
                    onClick={() => expandAll()}
                >
                    <MdKeyboardDoubleArrowDown />
                </button>
                <button
                    className='flex align-middle justify-center items-center text-xl text-slate-800 font-bold cursor-pointer bg-white/70 clip-diagonal-small p-2 hover:bg-white/90 transition-all duration-300 ease-in-out'
                    onClick={() => collapseAll()}
                >
                    <MdKeyboardDoubleArrowUp />
                </button>
            </div>
        </div>
    )
}

export default FilteringControls