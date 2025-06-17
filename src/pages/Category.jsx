
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';
import { GifState } from '../Context/GifContext';

const filters = [
  {
    title: 'GIFs',
    value: 'gifs',
    background: 'bg-gradient-to-tr from-violet-500 via-violet-600 to-violet-500',
  },
  {
    title: 'Stickers',
    value: 'stickers',
    background: 'bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500',
  },
  {
    title: 'Text',
    value: 'text',
    background: 'bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500',
  },
];

const Filtergif = ({ alignLeft = false, showTrending = false }) => {
  const { filter, setFilter } = GifState();

  return (
    <div className={`flex flex-wrap my-3 gap-3 px-2 ${alignLeft ? 'justify-start' : 'justify-center sm:justify-end'}`}>
      {showTrending && (
        <span className="flex items-center gap-2 text-gray-800 font-semibold text-sm sm:text-base">
          <HiMiniArrowTrendingUp size={22} className="text-black" />
          Trending
        </span>
      )}
      {filters.map(({ title, value, background }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold text-white text-sm sm:text-base transition
            ${background}
            ${filter === value ? 'ring-4 ring-white ring-offset-2 ring-offset-gray-900' : 'opacity-70 hover:opacity-100'}
          `}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

const Category = () => {
  const [results, setResults] = useState([]);
  const { gf, filter } = GifState();
  const { category } = useParams();
  const navigate = useNavigate();

  const fetchResults = async () => {
    try {
      let res;
      if (filter === 'text') {
        const query = `${category} text`;
        res = await gf.search(query, { limit: 20, type: 'gifs' });
      } else {
        res = await gf.search(category, { limit: 20, type: filter });
      }
      setResults(res?.data || []);
    } catch (error) {
      console.error('Error fetching category gifs:', error);
      setResults([]);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [category, filter]);

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 flex flex-col gap-6">
      <h2 className="text-2xl sm:text-3xl font-semibold capitalize text-center break-words px-2">
        Results for "{category}"
      </h2>

      <Filtergif alignLeft={false} showTrending={true} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
        {results.length > 0 ? (
          results.map((gif) => (
            <div
              key={gif.id}
              onClick={() => navigate(`/${gif.type}s/${gif.slug}`)}
              className="bg-white rounded-lg shadow-md flex flex-col items-center p-2 sm:p-3 cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={gif.images?.fixed_height?.url}
                alt={gif.title || 'GIF'}
                className="w-full h-auto object-contain rounded"
                loading="lazy"
              />
              <p className="text-center text-xs sm:text-sm mt-2 px-2 line-clamp-2">
                {gif.title || 'Untitled'}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-sm sm:text-base">
            Loading or No Results Found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Category;
