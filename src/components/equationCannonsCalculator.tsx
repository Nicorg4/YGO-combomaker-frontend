import React, { useState } from "react";
import Image from "next/image";
import MainButton from "./mainButton";
import xyzImage from "../../public/images/xyz_card.png";
import fusionImage from "../../public/images/fusion_card.png";
import xyzStar from "../../public/images/xyz_star.png";
import fusionStar from "../../public/images/fusion_star.png";

const EquationCannonsCalculator: React.FC = () => {
  const [fusionInput, setFusionInput] = useState<string>("1,2,3,4,5,6,7");
  const [xyzInput, setXyzInput] = useState<string>("3,4,5,6");
  const [ingameCards, setIngameCards] = useState<string>("12");
  const [targetLevel, setTargetLevel] = useState<string>("9");
  const [xyzLevel, setXyzLevel] = useState<number | null>(null);
  const [fusionLevel, setFusionLevel] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const parseList = (text: string): number[] => {
    if (!text.trim()) return [];
    return text
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x !== "")
      .map((x) => Number(x))
      .filter((x) => !isNaN(x) && x > 0);
  };

  const calculate = (): void => {
    const fusionLevels = parseList(fusionInput);
    const xyzLevels = parseList(xyzInput);

    const ingame = Number(ingameCards);
    const target = Number(targetLevel);

    if (
      !fusionLevels.length ||
      !xyzLevels.length ||
      isNaN(ingame) ||
      isNaN(target)
    ) {
      setError("Error: faltan datos o hay valores inválidos.");
      setXyzLevel(null);
      setFusionLevel(null);
      return;
    }

    const xyz_level = ingame - target;
    const fusion_level = 2 * target - ingame;

    const validXYZ = xyzLevels.includes(xyz_level);
    const validFusion = fusionLevels.includes(fusion_level);

    if (!validXYZ || fusion_level <= 0 || xyz_level <= 0 || !validFusion) {
      setError("No hay combinaciones válidas.");
      setXyzLevel(null);
      setFusionLevel(null);
      return;
    }

    setError("");
    setXyzLevel(xyz_level);
    setFusionLevel(fusion_level);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 text-white">
      <h2 className="text-2xl font-bold mb-2">Equation Cannons Calculator</h2>

      <div className="flex flex-col w-full mb-3">
        <p className="text-white">Fusion card levels (comma separated):</p>
        <input
          value={fusionInput}
          onChange={(e) => setFusionInput(e.target.value)}
          className="w-full p-2 bg-white text-black clip-diagonal-small"
          placeholder="1,2,3,4,5..."
        />
      </div>

      <div className="flex flex-col w-full mb-3">
        <p className="text-white">XYZ card levels (comma separated):</p>
        <input
          value={xyzInput}
          onChange={(e) => setXyzInput(e.target.value)}
          className="w-full p-2 bg-white text-black clip-diagonal-small"
          placeholder="3,4,5,6..."
        />
      </div>

      <div className="flex flex-col w-full mb-3">
        <p className="text-white">Cartas totales en juego:</p>
        <input
          type="number"
          value={ingameCards}
          onChange={(e) => setIngameCards(e.target.value)}
          className="w-full p-2 bg-white text-black clip-diagonal-small"
        />
      </div>

      <div className="flex flex-col w-full mb-3">
        <p className="text-white">Nivel objetivo del monstruo:</p>
        <input
          type="number"
          value={targetLevel}
          onChange={(e) => setTargetLevel(e.target.value)}
          className="w-full p-2 bg-white text-black clip-diagonal-small"
        />
      </div>

      <MainButton onClick={calculate} text={"Calculate"} type={"main"} />
      {error ? (
        <div className="w-full bg-white mt-4 p-2 clip-diagonal-small items-center flex justify-center">
          <p className="text-slate-800 font-semibold">{error}</p>
        </div>
      ) : (
        xyzLevel !== null &&
        fusionLevel !== null && (
          <div className="w-full bg-white mt-4 p-2 clip-diagonal-small items-center flex justify-center">
            <div className="flex items-center gap-3 text-slate-900 font-semibold">
              <div className="flex items-center gap-1">
                <Image src={xyzImage} alt="XYZ Card" width={30} height={30} />
                <span className="ml-1 flex gap-1">
                  x2 <Image src={xyzStar} alt={"lvl"} />x{xyzLevel}
                </span>
              </div>

              <span className="font-bold">+</span>

              <div className="flex items-center gap-1">
                <Image
                  src={fusionImage}
                  alt="Fusion Card"
                  width={30}
                  height={30}
                />
                <span className="ml-1 flex gap-1">
                  x1 - <Image src={fusionStar} alt={"lvl"} />x{fusionLevel}
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default EquationCannonsCalculator;
