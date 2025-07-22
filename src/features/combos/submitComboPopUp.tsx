import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
    isSubmitting: boolean;
}

const SubmitComboPopUp = ({ onCancel, onConfirm, isSubmitting }: Props) => {
    return (
        <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-200'>
            <div className='bg-white p-10 shadow-lg clip-diagonal'>
                <h2 className='text-2xl font-bold mb-2 text-slate-700'>Confirm submission</h2>
                <p className='mb-5 text-xl text-slate-700'>Are you sure you want to submit this combo?</p>
                <div className='flex justify-end gap-2'>
                    <button
                        className='flex align-middle justify-center items-center text-xl text-white font-bold cursor-pointer bg-gray-400 clip-diagonal py-1 w-[120px] hover:bg-gray-400/70 transition-all duration-300 ease-in-out'
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className='flex align-middle justify-center items-center text-xl text-white font-bold cursor-pointer bg-slate-700 clip-diagonal py-1 w-[120px] hover:bg-slate-700/70 transition-all duration-300 ease-in-out'
                        onClick={onConfirm}
                    >
                        {isSubmitting ? (
                            <div className='flex items-center justify-center'>
                                <div className='animate-spin border-white'><AiOutlineLoading3Quarters/></div>
                            </div>
                        ) : (
                            'Confirm'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubmitComboPopUp