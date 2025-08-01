import { Step } from "@/types/types";
import React from "react";
import StepSlider from "../steps/stepSlider";
import MainButton from "@/components/mainButton";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  title: string;
  action: string;
  steps?: Step[];
};

const SubmitComboPopUp = ({
  onCancel,
  onConfirm,
  isSubmitting,
  title,
  action,
  steps,
}: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-200">
      <div className="bg-white p-10 shadow-lg clip-diagonal md:min-w-[800px]">
        <h2 className="text-2xl font-bold mb-2 text-slate-700">{title}</h2>
        <p className="mb-5 text-xl text-slate-700">
          Are you sure you want to {action} this combo?
        </p>
        {steps && steps.length > 0 && <StepSlider steps={steps} />}
        <div className="flex justify-end gap-2 mt-5">
          <MainButton
            onClick={onCancel}
            text={"Cancel"}
            type={"cancel"}
            responsive={false}
          />
          <MainButton
            onClick={onConfirm}
            text={"Confirm"}
            type={"main"}
            isLoading={isSubmitting}
            responsive={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitComboPopUp;
