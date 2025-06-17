
import React, { useEffect } from 'react';
import { GifState } from '../Context/GifContext';
import img2 from '../assets/img2.gif';
import Gif from '../Components/Gif';
import Filtergif from '../Components/Filter-gif';

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendingGIFS = async () => {
    const { data } = await gf.trending({
      limit: 30,
      type: filter,
      rating: "g",
    });
    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGIFS();
  }, [filter]);

  return (
    <div>
      <img
        src={img2}
        alt="Earth banner"
        className="mt-2 rounded w-full"
      />

      {/* Filter GIF Buttons */}
      <Filtergif showTrending={true} />

      {/* GIF Grid */}
      <div className="columns-1 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
