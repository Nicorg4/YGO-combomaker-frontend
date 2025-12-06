import React, { JSX } from "react";
import EquationCannonsCalculator from "./equationCannonsCalculator";
import DeckBrickCalculator from "./deckBrickCalculator";
import Image from "next/image";
import EquationCannonsCalculatorImage from "../../public/images/equation_cannons_tool.png";
import DeckBrickCalculatorImage from "../../public/images/deck_brick_calculator_tool.png";
import MainButton from "./mainButton";

type Props = {
  toggleToolsPopUpVisible: () => void;
};

const tools = [
  {
    name: "Equation cannons",
    page: <EquationCannonsCalculator />,
    image: EquationCannonsCalculatorImage,
  },
  {
    name: "Deck brick calculator",
    page: <DeckBrickCalculator />,
    image: DeckBrickCalculatorImage,
  },
];

const ToolsPopUp = ({ toggleToolsPopUpVisible }: Props) => {
  const [selectedTool, setSelectedTool] = React.useState<JSX.Element | null>(
    null
  );
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-[200]">
      <div className="bg-slate-800 shadow-xl p-10 sm:max-w-lg w-full relative clip-diagonal max-w-[90%] h-[90%] max-h-[700px] flex flex-col">
        <button
          onClick={toggleToolsPopUpVisible}
          className="absolute top-2 right-2 text-slate-700 hover:bg-white/70 text-2xl font-bold cursor-pointer transition-all duration-300 clip-diagonal-small p-1 px-4 pb-2 bg-white/50"
        >
          x
        </button>

        <h2 className="text-2xl font-bold mb-5 text-white">Tools</h2>
        {selectedTool ? (
          <div className="flex flex-col">
            <MainButton
              onClick={() => setSelectedTool(null)}
              text={"Go back to tools"}
              type={"cancel"}
            />
            {selectedTool}
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 items-start flex-1 p-3 overflow-y-auto justify-center border-white/30 border-2">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="
          flex items-center gap-4
          bg-white/90 
          hover:bg-white/80
          transition-all 
          clip-diagonal-small
          shadow-md hover:shadow-lg
          hover:scale-[1.03]
          cursor-pointer
          pr-2
          max-w-[150px]
          text-center
          h-[48px]
        "
                onClick={setSelectedTool.bind(null, tool.page)}
              >
                <Image
                  src={tool.image}
                  alt={tool.name}
                  width={48}
                  height={48}
                />
                <p className="text-slate-800 tracking-wide text-sm font-bold">
                  {tool.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPopUp;
