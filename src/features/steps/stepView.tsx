import { Step } from '@/types/types'
import Image from 'next/image'
import React from 'react'
import { FaArrowDown } from "react-icons/fa6";
import { GrVulnerability } from "react-icons/gr";
import { GiStarSwirl } from "react-icons/gi";
import { getImageFromApi } from '../images/useImages';

type Props = {
    step: Step
}

const StepView = (props: Props) => {
    return (
        <div className='flex flex-col gap-3 items-center flex-1 justify-center mb-5'>
            <Image src={getImageFromApi(props.step.card_id)} alt={props.step.action_text} width={120} height={120} className='border-2 border-white/50' />
            <div className='bg-white/80 p-1 pl-5 pr-5 clip-diagonal-small text-slate-700 flex items-center gap-2'>
                <GiStarSwirl className='text-xl' />
                <span className='font-bold text-xl '>{props.step.action_text}</span>
            </div>
            {props.step.step_targets.length > 0 && (
                <div className='flex flex-col gap-3 items-center'>
                    <FaArrowDown className='text-2xl' />
                    <div className='bg-white/80 p-1 pl-5 pr-5 clip-diagonal-small text-slate-700 flex items-center gap-2'>
                        <GrVulnerability className='text-xl' />
                        <span className='font-bold text-xl '>Targets</span>
                    </div>
                    <div className='flex flex-row gap-3'>
                        {props.step.step_targets.map((target, index) => (
                            <Image key={`${target.card_id}-${index}}`} src={getImageFromApi(target.card_id)} alt={target.card_id.toString()} width={120} height={120} className='border-2 border-white/50' />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default StepView