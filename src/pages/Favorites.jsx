

import React, { useEffect, useState } from 'react';
import { GifState } from '../Context/GifContext';
import Gif from '../Components/Gif';

const Favorites = () => {
  const [favoritesGifs, setFavoritesGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { gf, favorites } = GifState();

  useEffect(() => {
    const fetchFavoriteGifs = async () => {
      console.log("Favorite IDs:", favorites);

      if (!favorites.length) {
        setFavoritesGifs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const gifPromises = favorites.map((id) =>
          gf.gif(id)
            .then((res) => {
              console.log(`Fetched GIF for ID ${id}`, res.data);
              return res.data;
            })
            .catch((err) => {
              console.error(`Failed to fetch GIF with ID ${id}`, err);
              return null;
            })
        );

        const results = await Promise.all(gifPromises);
        const validGifs = results.filter((gif) => gif !== null);
        setFavoritesGifs(validGifs);
      } catch (err) {
        console.error("General error fetching favorites:", err);
        setError('Failed to load favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteGifs();
  }, [favorites, gf]);

  return (
    <div className="mt-4 px-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">My Favorites</h2>

      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500 bg-red-100 p-2 rounded mt-2">{error}</div>}
      {!loading && !favorites.length && (
        <div className="text-gray-400 mt-4">You have no favorites yet.</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {favoritesGifs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
