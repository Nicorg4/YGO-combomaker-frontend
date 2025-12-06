import React from "react";

type Props = {
  toggleShowNewsPopUp: () => void;
};

const NewsPopUp = ({ toggleShowNewsPopUp }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-[200]">
      <div className="bg-slate-800 shadow-xl p-10 sm:max-w-lg w-full relative clip-diagonal max-w-[90%] h-[90%] flex flex-col">
        <button
          onClick={toggleShowNewsPopUp}
          className="absolute top-2 right-2 text-slate-700 hover:bg-white/70 text-2xl font-bold cursor-pointer transition-all duration-300 clip-diagonal-small p-1 px-4 pb-2 bg-white/50"
        >
          x
        </button>

        <h1 className="text-2xl font-semibold text-white mb-4">
          🚀 What’s new in version 1.5.0?
        </h1>

        <div className="space-y-6 text-sm text-gray-700 overflow-y-auto pr-2 flex-1 custom-scrollbar">

          <div>
            <h2 className="font-bold text-white mb-1 text-xl">
              🧮 1.5.0 Tools & Performance Update
            </h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>New <strong>Tools</strong> section added with 2 tools</li>
              <li>Probability system powered by hypergeometric distribution</li>
              <li>Dynamic consistency strength rating (Trash → Excellent)</li>
              <li>Improved modals and layout responsiveness</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-white mb-1 text-xl">
              🧩 1.4.0 Card Quiz & UI Enhancements
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
              <li>New UI polish and visual refinements</li>
              <li>Master Duel Meta integration for decklists and card info</li>
              <li>Added go to end / go to start buttons in combo viewer</li>
              <li>“🆕” tag displays newly added combos</li>
              <li>New sorting options in Deck Info</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-1 text-white text-xl">
              🛠️ 1.2.0 Highlights
            </h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Edit combos directly in the interface</li>
              <li>
                Added <strong>StepSlider</strong> component for improved navigation
              </li>
              <li>Unified form logic for create/edit workflows</              li>
              <li>Full API support for editing combos</li>
              <li>Improved naming and TypeScript consistency</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-1 text-white text-xl">
              🔍 1.1.0 Search & Browsing
            </h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Advanced search: starting hand, end board, author, etc.</                li>
              <li>Scroll-based pagination</li>
              <li>Tag filtering and deck search</li>
              <li>Preview image on each combo</li>
              <li>Expand / Collapse all combos at once</li>
              <li>Flexible sorting options</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPopUp;
