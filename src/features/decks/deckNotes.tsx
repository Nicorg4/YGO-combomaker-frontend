import React from "react";

type Props = {
  note: string;
};

const DeckNotes = ({ note }: Props) => {
  return (
    <div className="flex flex-col max-h-[14vh]">
      <h2 className="text-xl font-bold mb-4 text-center text-slate-800">
        Notes
      </h2>
      {note ? (
        <div className="flex overflow-auto custom-scrollbar-alt px-5">
          <p className="text-slate-800">{note}</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-slate-800">No notes available.</p>
        </div>
      )}
    </div>
  );
};

export default DeckNotes;
