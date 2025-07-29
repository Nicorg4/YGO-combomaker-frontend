import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import MainButton from './mainButton';

type Props = {
    goToPage: () => void
}

const GoBackButton = (props: Props) => {
    return (
        <div className='fixed top-3 left-3 z-500'>
            <MainButton onClick={props.goToPage} text={"Go back"} type={"confirm"} reverse={true}><IoIosArrowBack className='text-xl'/></MainButton>
        </div>
    )
}

export default GoBackButton