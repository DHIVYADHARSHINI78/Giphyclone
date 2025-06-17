
import React, { useState } from 'react';
import { HiMiniXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const GifSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchGIFS = () => {
    if (query.trim() === "") return;
    navigate(`/search/${query}`);
  };

  return (
    <div className="mt-6 sm:mt-10 flex w-full px-2 sm:px-4 max-w-4xl mx-auto">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH ALL THE GIFS AND STICKERS"
          className="w-full pl-4 pr-12 py-2 sm:py-4 text-sm sm:text-3xl text-black bg-white border border-gray-800 rounded-l-lg outline-none"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 hover:opacity-100 opacity-90 rounded-full p-1"
          >
            <HiMiniXMark size={18} className="sm:size-5" />
          </button>
        )}
      </div>

      <button
        onClick={searchGIFS}
        className="bg-gradient-to-tr from-black to-purple-500 text-white px-3 sm:px-6 py-2 sm:py-4 rounded-r-lg flex items-center justify-center"
      >
        <HiOutlineMagnifyingGlass size={24} className="-scale-x-100 sm:size-7" />
      </button>
    </div>
  );
};

export default GifSearch;
