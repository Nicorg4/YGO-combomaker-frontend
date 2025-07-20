import { Deck } from '@/types/types'
import { useState } from 'react';
import { getImageUrl } from '../images/useImages';

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
      className='flex align-middle justify-center clip-diagonal bg-center h-[65px] p-5 cursor-pointer hover:scale-103 transition-all duration-300 ease-in-out border-2 min-w-[200px] border-white/50'
      style={{ backgroundImage: `url(${getImageUrl(props.deck.image_url)})`, backgroundPosition: 'center', backgroundSize: 'cover'}}
      onClick={props.onClick}
      onMouseEnter={toggleShowName}
      onMouseLeave={toggleShowName}
    >
      {showName && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 bg-opacity-50 flex items-center justify-center'>
          <p className='text-center text-xl text-white'>{props.deck.name}</p>
        </div>
      )}
    </div>
  )
}

export default DeckBox