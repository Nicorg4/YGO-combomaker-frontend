import React from "react";

type Props = {
  toggleShowNewsPopUp: () => void;
};

const NewsPopUp = ({ toggleShowNewsPopUp }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-[200]">
      <div className="bg-slate-800 shadow-xl p-10 sm:max-w-lg w-full relative clip-diagonal max-w-[90%]">
        <button
          onClick={toggleShowNewsPopUp}
          className="absolute top-2 right-2 text-slate-700 hover:bg-white/70 text-2xl font-bold cursor-pointer transition-all duration-300 clip-diagonal-small p-1 px-4 pb-2 bg-white/50"
        >
          x
        </button>
        <h1 className="text-2xl font-semibold text-white mb-4">
          🚀 What’s new in version 1.4.0?
        </h1>

        <div className="space-y-6 text-sm text-gray-700 max-h-[75vh] overflow-y-auto pr-2">
          <div>
            <h2 className="font-bold text-white mb-1 text-xl">
              🧩 1.4.0 Card quiz & UI Enhancements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>New feature to test your knowledge of Yu-Gi-Oh! cards</li>
              <li>Improved UI responsiveness and accessibility</li>
              <li>Minor bug fixes and performance improvements</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-white mb-1 text-xl">
              ✨ 1.3.0 Quality of Life Improvements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>New UI details added</li>
              <li>
                Master Duel Meta integration to view deck recipes and card info
              </li>
              <li>Added go to end and go to start buttons in combo viewer</li>
              <li>New “🆕” tag highlights decks with newly added combos</li>
              <li>
                Sort options for starting hand, and main dangers in Deck Info
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-1 text-white text-xl">
              🛠️ v1.2.0 Highlights
            </h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Edit existing combos directly from the interface</li>
              <li>
                New <strong>StepSlider</strong> component for better
                mobile/desktop viewing
              </li>
              <li>Refactored creation/editing flow with unified form logic</li>
              <li>Full API support for combo updates</li>
              <li>Improved type safety and naming consistency</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-1  text-white text-xl">
              🔍 v1.1.0 Search & Browsing
            </h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Advanced search: starting hand, end board, author, etc.</li>
              <li>Scroll-based pagination for infinite feed loading</li>
              <li>Tag filtering and deck search bar</li>
              <li>Preview image on each combo</li>
              <li>Expand/Collapse all combos at once</li>
              <li>
                Flexible sorting: alphabetical, difficulty, creation date, and
                more
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPopUp;
