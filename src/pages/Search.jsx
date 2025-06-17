

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GifState } from '../Context/GifContext';
import Filtergif from '../Components/Filter-gif';
import Gif from '../Components/Gif.jsx';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { gf, filter } = GifState();
  const { query } = useParams();

  const fetchSearchResult = async () => {
    try {
      const { data } = await gf.search(query, {
        sort: "relevant",
        lang: 'en',
        type: filter,
        limit: 20,
      });
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchSearchResult();
  }, [filter, query]);

  return (
    <div className='my-4 px-4 sm:px-6'>
      <h2 className='text-2xl sm:text-5xl pb-3 font-extrabold break-words'>{query}</h2>

      <Filtergif alignLeft={true} />

      {searchResults.length > 0 ? (
        <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2'>
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span className='block mt-4 text-sm sm:text-base'>
          No GIFs Found for <strong>{query}</strong>. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
};

export default Search;

