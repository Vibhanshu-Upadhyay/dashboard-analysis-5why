import React from "react";

const Cards = () => {
  return (
    <div className="mt-4 border-2 w-2/3 p-2 rounded-lg bg-white shadow-lg">
      <div className="font-bold text-xl">Incident summary</div>
      <div className="mb-6">Incident summary</div>
      <div className="flex space-x-8 justify-center h-[20vh]">
        <div className="border-2 w-1/5">total incidents</div>
        <div className="border-2 w-1/5">resolved incidents</div>
        <div className="border-2 w-1/5">avg resolution time</div>
        <div className="border-2 w-1/5">most common root cause</div>
      </div>
    </div>
  );
};

export default Cards;
