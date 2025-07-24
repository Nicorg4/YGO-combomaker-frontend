'use client'

import GoBackButton from '@/components/goBackButton'
import LoadingAnimation from '@/components/loadingAnimation'
import MainContainer from '@/components/mainContainer'
import MainWrapper from '@/components/mainWrapper'
import ComboInfo from '@/features/combos/comboInfo'
import { getComboById } from '@/features/combos/useCombos'
import StepView from '@/features/steps/stepView'
import { getStepsByComboId } from '@/features/steps/useSteps'
import { Combo, Step } from '@/types/types'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const StepByStepCombo = () => {
    const comboId = useParams().comboId
    const deckId = useParams().deckId
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [combo, setCombo] = useState<Combo>();
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [cooldown, setCooldown] = useState(false);

    const goToPage = () => {
        router.push(`/${deckId}`);
    };

    const goToNextStep = () => {
        if (currentStepIndex === steps.length - 1) return;
        setCurrentStepIndex(currentStepIndex + 1);
    };

    const goToPrevStep = () => {
        if (currentStepIndex === 0) return;
        setCurrentStepIndex(currentStepIndex - 1);
    };

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (cooldown) return;

        if (event.deltaY > 0) {
            goToNextStep();
        } else if (event.deltaY < 0) {
            goToPrevStep();
        }

        setCooldown(true);
        setTimeout(() => setCooldown(false), 500);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof comboId === 'string' && typeof deckId === 'string') {
                    const fetchedCombo = await getComboById(comboId);
                    const fetchedSteps = await getStepsByComboId(comboId);
                    setCombo(fetchedCombo);
                    setSteps(fetchedSteps);
                }
            } catch (error) {
                console.error("Error fetching combo or steps:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [comboId, deckId])

    if (isLoading) {
        <LoadingAnimation />
    }

    return (
        <MainContainer>
            <GoBackButton goToPage={() => goToPage()} />
            <MainWrapper>
                {combo && <ComboInfo combo={combo} />}
                <div
                    className='flex flex-col items-center border-2 border-white/50 flex-1 p-5'
                    onWheel={handleWheel}
                >
                    {steps.length > 0 && steps[currentStepIndex] && (
                        <StepView step={steps[currentStepIndex]} />
                    )}
                    <div className='flex gap-2 items-center justify-center'>
                        <button
                            className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${currentStepIndex > 0 && 'opacity-100 cursor-pointer hover:bg-white'}`}
                            onClick={goToPrevStep}>
                            <FaArrowLeft />
                        </button>
                        <p className='text-lg text-white/80'>Step {currentStepIndex + 1} / {steps.length}</p>
                        <button
                            className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${currentStepIndex < steps.length - 1 && 'opacity-100 cursor-pointer hover:bg-white'}`}
                            onClick={goToNextStep}>
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </MainWrapper>
        </MainContainer>

    )
}

export default StepByStepCombo