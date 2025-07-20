import { Deck } from '@/types/types'
import Image from 'next/image'
import React from 'react'
import { getImageUrl } from '../images/useImages'

type Props = {
    deck: Deck
}

const DeckFullInfo = (props: Props) => {
    return (
        <div className='flex gap-5 bg-slate-900 w-full border-white/50 clip-diagonal slide-in-from-top h-[120px]'>
            <div className='flex items-center'>
                <Image src={getImageUrl(props.deck.image_url)} alt={props.deck.name} width={120} height={120}/>
            </div>
            <div className='flex flex-col flex-1 p-2 pr-5 justify-center'>
                <h1 className='text-xl font-bold'>{props.deck.name}</h1>
                <p className='text-gray-400 overflow-auto custom-scrollbar'>{props.deck.description}</p>
            </div>
        </div>
    )
}

export default DeckFullInfo