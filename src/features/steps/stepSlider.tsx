"use client";

import { Step } from "@/types/types";
import React, { useState } from "react";
import StepView from "./stepView";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  steps: Step[];
};

const StepSlider = ({ steps }: Props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [cooldown, setCooldown] = useState(false);

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
  return (
    <div
      className="flex flex-col items-center border-2 border-white/50 flex-1 p-5 bg-slate-900 min-h-[590px]"
      onWheel={handleWheel}
    >
      {steps.length > 0 && steps[currentStepIndex] && (
        <StepView step={steps[currentStepIndex]} />
      )}
      <div className="flex gap-2 items-center justify-center">
        <button
          className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${
            currentStepIndex > 0 && "opacity-100 cursor-pointer hover:bg-white"
          }`}
          onClick={goToPrevStep}
        >
          <FaArrowLeft />
        </button>
        <p className="text-lg text-white/80">
          Step {currentStepIndex + 1} / {steps.length}
        </p>
        <button
          className={`flex p-2 bg-white/80 text-slate-700 opacity-30 clip-diagonal-small ${
            currentStepIndex < steps.length - 1 &&
            "opacity-100 cursor-pointer hover:bg-white"
          }`}
          onClick={goToNextStep}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default StepSlider;
