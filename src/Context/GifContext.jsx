
import { createContext, useContext, useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const gf = new GiphyFetch("9WD0p4Q7BPlEIWXMwGPnf3s8Y4FOuv6f");

  const addToFavorites = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((itemId) => itemId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    localStorage.setItem("favoritesGifs", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoritesGifs")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        addToFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => useContext(GifContext);

export default GifProvider;
