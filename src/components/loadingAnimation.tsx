import Image from 'next/image'
import React from 'react'

const LoadingAnimation = () => {
    return (
        <div className='w-full h-[100vh] bg-slate-700 flex justify-center items-center'>
            <Image width={300} height={300} src={'/images/puzzle.png'} alt='loading' className='pulsating'/>
        </div>
    )
}

export default LoadingAnimation