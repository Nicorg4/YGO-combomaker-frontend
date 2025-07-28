"use client";

import GoBackButton from "@/components/goBackButton";
import LoadingAnimation from "@/components/loadingAnimation";
import MainContainer from "@/components/mainContainer";
import MainWrapper from "@/components/mainWrapper";
import ComboInfo from "@/features/combos/comboInfo";
import { getComboById } from "@/features/combos/useCombos";
import StepSlider from "@/features/steps/stepSlider";
import { getStepsByComboId } from "@/features/steps/useSteps";
import { Combo, Step } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const StepByStepCombo = () => {
  const comboId = useParams().comboId;
  const deckId = useParams().deckId;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [combo, setCombo] = useState<Combo>();
  const [steps, setSteps] = useState<Step[]>([]);

  const goToPage = () => {
    router.push(`/${deckId}`);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof comboId === "string" && typeof deckId === "string") {
          const fetchedCombo = await getComboById(comboId);
          const fetchedSteps = await getStepsByComboId(comboId);
          console.log("Fetched combo:", fetchedSteps);
          setCombo(fetchedCombo);
          setSteps(fetchedSteps);
        }
      } catch (error) {
        console.error("Error fetching combo or steps:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [comboId, deckId]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <MainContainer>
      <GoBackButton goToPage={() => goToPage()} />
      <MainWrapper>
        {combo && <ComboInfo combo={combo} />}
        <StepSlider steps={steps} />
      </MainWrapper>
    </MainContainer>
  );
};

export default StepByStepCombo;
