import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';

type Props = {
    selected: string[];
    setSelected: Dispatch<SetStateAction<string[]>>;
    filterBy: string;
    options: string[]
    hidden?: boolean;
}

const MultiSelectFilter = ({ selected, setSelected, filterBy, options, hidden }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleOption = (option: string) => {
        setSelected(prev =>
            prev.includes(option)
                ? prev.filter(o => o !== option)
                : [...prev, option]
        );
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`${hidden ? 'hidden' : 'flex'}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="px-2 py-1 bg-white/70 text-slate-800 clip-diagonal-small min-w-[140px]"
            >
                {filterBy}: {selected.length > 0 ? 'Custom' : 'All'}
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 bg-white shadow clip-diagonal-small overflow-auto w-[140px]">
                    {options.map(option => (
                        <label key={option} className="flex items-center p-2 hover:bg-gray-100 text-slate-800">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={selected.includes(option)}
                                onChange={() => toggleOption(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectFilter