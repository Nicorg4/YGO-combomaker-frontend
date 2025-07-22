import React from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
    currentPage: number
    totalPages: number
    goBack: () => void
    goNext: () => void
}

const PaginationController = ({ currentPage, totalPages, goBack, goNext }: Props) => {
    return (
        <div className='flex flex-col gap-2 items-center justify-center mt-5'>
            <div className='flex gap-2 items-center justify-center'>
                <button
                    className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${currentPage > 0 && 'opacity-100 cursor-pointer hover:bg-white'}`}
                    disabled={currentPage === 0}
                    onClick={goBack}>
                    <FaArrowLeft />
                </button>
                <p className='text-lg text-white/80'>{currentPage + 1} / {totalPages + 1}</p>
                <button
                    className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${currentPage < totalPages && 'opacity-100 cursor-pointer hover:bg-white'}`}
                    onClick={goNext}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default PaginationController