
import React from 'react';
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';
import { GifState } from '../Context/gifContext';

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background: "bg-gradient-to-tr from-violet-500 via-violet-600 to-violet-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const Filtergif = ({ alignLeft = false, showTrending = false }) => {
  const { filter, setFilter } = GifState();

  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
        alignLeft ? '' : 'justify-end'
      } ${showTrending ? 'justify-between' : ''} my-3 px-3`}
    >
      {showTrending && (
        <span className="flex gap-2 items-center text-sm sm:text-base">
          <HiMiniArrowTrendingUp size={22} className="text-black" />
          <span className="font-semibold text-teal-800">Trending</span>
        </span>
      )}

      <div className="flex w-full sm:w-auto rounded-full bg-gray-800 overflow-x-auto sm:overflow-visible no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.title}
            onClick={() => setFilter(f.value)}
            className={`
              flex-1 sm:w-28 py-2 text-center font-semibold text-white text-sm sm:text-base transition-all duration-300 whitespace-nowrap
              ${filter === f.value ? f.background : 'bg-gray-800 hover:bg-gray-700'}
            `}
          >
            {f.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filtergif;
