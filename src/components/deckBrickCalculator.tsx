import React, { useState } from "react";

type StrengthLabel = "Trash" | "Bad" | "Not Great" | "Good" | "Excellent";

type StrengthTextColor =
  | "text-red-600"
  | "text-red-400"
  | "text-yellow-400"
  | "text-green-400"
  | "text-green-600";

type StrengthBgColor =
  | "bg-red-600"
  | "bg-red-400"
  | "bg-yellow-400"
  | "bg-green-400"
  | "bg-green-600";

const hypergeometric = (
  successes: number,
  draws: number,
  population: number,
  k: number
): number => {
  const comb = (n: number, r: number): number => {
    if (r > n || r < 0) return 0;
    r = Math.min(r, n - r);
    let numerator = 1;
    let denominator = 1;
    for (let i = 0; i < r; i++) {
      numerator *= n - i;
      denominator *= i + 1;
    }
    return numerator / denominator;
  };

  return (
    (comb(successes, k) * comb(population - successes, draws - k)) /
    comb(population, draws)
  );
};

const strengthTextColor = (value: number): StrengthTextColor => {
  if (value < 0.2) return "text-red-600";
  if (value < 0.3) return "text-red-400";
  if (value < 0.5) return "text-yellow-400";
  if (value < 0.7) return "text-green-400";
  return "text-green-600";
};

const strengthBgColor = (value: number): StrengthBgColor => {
  if (value < 0.2) return "bg-red-600";
  if (value < 0.3) return "bg-red-400";
  if (value < 0.5) return "bg-yellow-400";
  if (value < 0.7) return "bg-green-400";
  return "bg-green-600";
};

const strengthLabel = (value: number): StrengthLabel => {
  if (value < 0.2) return "Trash";
  if (value < 0.3) return "Bad";
  if (value < 0.5) return "Not Great";
  if (value < 0.7) return "Good";
  return "Excellent";
};

const DeckBrickCalculator: React.FC = () => {
  const [deckSize, setDeckSize] = useState<number>(40);
  const [starters, setStarters] = useState<number>(8);
  const [handtraps, setHandtraps] = useState<number>(10);

  const [error, setError] = useState<string>("");

  const HAND_SIZE = 5;

  const validate = (deck: number, s: number, h: number): string => {
    if (deck <= 0) return "Deck size must be greater than 0.";
    if (s < 0 || h < 0) return "Values cannot be negative.";
    if (s > deck) return "Starters cannot exceed deck size.";
    if (h > deck) return "Handtraps cannot exceed deck size.";
    if (s + h > deck) return "Starters + Handtraps cannot exceed deck size.";
    return "";
  };

  const handleDeck = (value: number) => {
    setDeckSize(value);
    setError(validate(value, starters, handtraps));
  };

  const handleStarters = (value: number) => {
    setStarters(value);
    setError(validate(deckSize, value, handtraps));
  };

  const handleHandtraps = (value: number) => {
    setHandtraps(value);
    setError(validate(deckSize, starters, value));
  };

  const pAtLeastOneStarter =
    !error ? 1 - hypergeometric(starters, HAND_SIZE, deckSize, 0) : 0;

  const pAtLeastOneHandtrap =
    !error ? 1 - hypergeometric(handtraps, HAND_SIZE, deckSize, 0) : 0;

  return (
    <div className="w-full max-w-xl mx-auto p-5 text-white">
      <h2 className="text-2xl font-bold mb-2">Deck Brick Calculator</h2>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Deck Size</label>
          <input
            type="number"
            value={deckSize}
            onChange={(e) => handleDeck(Number(e.target.value))}
            className="bg-white p-2 clip-diagonal-small text-slate-800"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Starters</label>
          <input
            type="number"
            value={starters}
            onChange={(e) => handleStarters(Number(e.target.value))}
            className="bg-white p-2 clip-diagonal-small text-slate-800"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Handtraps</label>
          <input
            type="number"
            value={handtraps}
            onChange={(e) => handleHandtraps(Number(e.target.value))}
            className="bg-white p-2 clip-diagonal-small text-slate-800"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-400 text-white p-3 mb-4 clip-diagonal-small">
          {error}
        </div>
      )}

      {!error && (
        <div className="space-y-5">
          <div className="bg-white p-4 clip-diagonal">
            <h3 className="text-lg font-bold text-slate-800">Starter Consistency</h3>
            <p className="text-[12px] mb-2 text-slate-800">
              (At least 1 starter in opening hand)
            </p>

            <div className="text-xl font-bold mb-1 text-slate-800">
              {(pAtLeastOneStarter * 100).toFixed(2)}%
            </div>

            <div className={`text-sm mb-2 ${strengthTextColor(pAtLeastOneStarter)}`}>
              {strengthLabel(pAtLeastOneStarter)}
            </div>

            <div className="w-full h-3 bg-slate-800 overflow-hidden">
              <div
                className={`h-full ${strengthBgColor(pAtLeastOneStarter)}`}
                style={{ width: `${pAtLeastOneStarter * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white p-4 clip-diagonal">
            <h3 className="text-lg font-bold text-slate-800">Handtrap Consistency</h3>
            <p className="text-[12px] mb-2 text-slate-800">
              (At least 1 handtrap in opening hand)
            </p>

            <div className="text-xl font-bold mb-1 text-slate-800">
              {(pAtLeastOneHandtrap * 100).toFixed(2)}%
            </div>

            <div
              className={`text-sm mb-2 ${strengthTextColor(
                pAtLeastOneHandtrap
              )}`}
            >
              {strengthLabel(pAtLeastOneHandtrap)}
            </div>

            <div className="w-full h-3 bg-slate-900 overflow-hidden">
              <div
                className={`h-full ${strengthBgColor(pAtLeastOneHandtrap)}`}
                style={{ width: `${pAtLeastOneHandtrap * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckBrickCalculator;
