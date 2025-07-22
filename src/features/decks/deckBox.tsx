import { Deck } from '@/types/types'
import { useState } from 'react';
import { getImageUrl } from '../images/useImages';
import Image from 'next/image';

type Props = {
  deck: Deck;
  onClick: () => void;
};

const DeckBox = (props: Props) => {
  const [showName, setShowName] = useState(false);

  const toggleShowName = () => {
    setShowName((showName) => !showName);
  }

  return (
    <div
      className='relative flex align-middle justify-center clip-diagonal bg-center h-[70px] p-5 cursor-pointer hover:scale-103 transition-all duration-300 ease-in-out border-2 min-w-[200px] border-white/50 overflow-hidden'
      onClick={props.onClick}
      onMouseEnter={toggleShowName}
      onMouseLeave={toggleShowName}
    >
      <Image
        src={getImageUrl(props.deck.image_url)}
        alt={props.deck.name}
        fill
        className='object-cover object-center'
        priority
      />
      <span className='absolute z-500 right-0 top-0 px-1 bg-black/80 text-sm'>{props.deck.combos_count}</span>
      {showName && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center'>
          <p className='text-center text-xl text-white'>{props.deck.name}</p>
        </div>
      )}
    </div>
  )
}

export default DeckBox