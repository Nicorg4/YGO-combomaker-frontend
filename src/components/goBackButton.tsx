import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

type Props = {
    goToPage: () => void
}

const GoBackButton = (props: Props) => {
    return (
        <div className='absolute top-3 left-3 z-500'>
            <button
                className='flex justify-between items-center gap-1 text-lg hover:cursor-pointer bg-white/70 p-1 pl-4 pr-5 clip-diagonal text-slate-800 font-bold hover:bg-white/90 transition-all duration-300 ease-in-out'
                onClick={() => props.goToPage()}
            >
                <IoIosArrowBack className='text-xl'/> Go back
            </button>
        </div>
    )
}

export default GoBackButton