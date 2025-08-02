import Image from 'next/image'
import React from 'react'

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-700 flex justify-center items-center">
      <Image width={200} height={200} src={'/images/puzzle.png'} alt='loading' className='pulsating' />
    </div>
  )
}

export default LoadingAnimation
