
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GifState } from '../Context/GifContext';
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from 'react-icons/hi2';
import { FiExternalLink } from 'react-icons/fi';
import { IoCodeSharp } from 'react-icons/io5';
import { FaPaperPlane } from 'react-icons/fa6';
import Followon from '../Components/Followon';
import Gif from '../Components/Gif';

const contentTypes = ['gifs', 'stickers', 'text'];

const GifPage = () => {
  const { type, slug } = useParams();
  const navigate = useNavigate();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readmore, setReadmore] = useState(false);
  const { gf, addToFavorites, favorites } = GifState();

  const fetchGif = async () => {
    try {
      const gifId = slug?.split('-').pop();
      if (!gifId) {
        console.error('Invalid GIF slug format.');
        return;
      }

      const { data } = await gf.gif(gifId);
      const { data: related } = await gf.related(gifId, { limit: 10 });
      setGif(data);
      setRelatedGifs(related);
    } catch (error) {
      console.error('Error fetching GIF:', error);
    }
  };

  useEffect(() => {
    if (!contentTypes.includes(type)) {
      console.warn(`Invalid content type: ${type}`);
      navigate('/');
      return;
    }
    fetchGif();
  }, [slug, type]);

  const shareGif = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('GIF link copied to clipboard!');
  };

  const EmbedGif = () => {
    navigator.clipboard.writeText(
      `<iframe src="${gif.embed_url}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
    );
    alert('Embed code copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 my-10 grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Sidebar */}
      <div className="hidden lg:block">
        {gif?.user && (
          <>
            <div className="flex gap-2">
              <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name} className="h-14 rounded-full" />
              <div>
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="text-gray-500 text-sm">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-gray-500 text-sm">
                {readmore ? gif?.user?.description : gif?.user?.description.slice(0, 100) + '...'}
                <div
                  className="flex items-center text-blue-600 cursor-pointer text-sm"
                  onClick={() => setReadmore(!readmore)}
                >
                  {readmore ? (
                    <>Read less <HiMiniChevronUp size={20} /></>
                  ) : (
                    <>Read more <HiMiniChevronDown size={20} /></>
                  )}
                </div>
              </p>
            )}
          </>
        )}

        <Followon />

        {gif?.source && (
          <div className="mt-6">
            <span className="text-gray-500 text-sm">Source</span>
            <div className="flex items-center text-sm font-semibold gap-1">
              <FiExternalLink size={18} />
              <a href={gif.source} target="_blank" rel="noreferrer" className="truncate text-blue-700 underline">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Main GIF and Buttons */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-3/4">
            <p className="text-gray-500 text-sm mb-2 truncate">{gif.title}</p>
            <Gif gif={gif} hover={false} />
          </div>

          <div className="flex flex-row sm:flex-col gap-4 sm:gap-5 sm:mt-6 justify-around sm:justify-start">
            <button onClick={() => addToFavorites(gif.id)} className="flex gap-2 items-center font-bold text-lg">
              <HiMiniHeart size={30} className={favorites.includes(gif.id) ? 'text-red-500' : ''} />
              <span className="hidden sm:inline">Favorite</span>
            </button>

            <button onClick={shareGif} className="flex gap-2 items-center font-bold text-lg">
              <FaPaperPlane size={25} />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button onClick={EmbedGif} className="flex gap-2 items-center font-bold text-lg">
              <IoCodeSharp size={30} />
              <span className="hidden sm:inline">Embed</span>
            </button>
          </div>
        </div>

        {/* Related GIFs */}
        <div>
          <span className="font-extrabold text-xl block mb-3">Related GIFs</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
