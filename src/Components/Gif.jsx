
import React from 'react';
import { Link } from 'react-router-dom';

const Gif = ({ gif, hover = true }) => {
  if (!gif || !gif.images || !gif.images.fixed_width) return null;

  return (
    <Link to={`/${gif.type}s/${gif.slug}`}>
      <div className="w-full mb-2 relative cursor-pointer group aspect-video overflow-hidden rounded">
        <img
          src={gif.images.fixed_width.webp || gif.images.fixed_width.url}
          alt={gif.title || 'GIF'}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-300"
        />

        {hover && (
          <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-black text-white font-semibold flex items-end gap-2 p-2 text-xs sm:text-sm">
            {gif.user?.avatar_url && (
              <img
                src={gif.user.avatar_url}
                alt={gif.user.display_name || 'User'}
                className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover"
              />
            )}
            <span className="truncate max-w-[75%] sm:max-w-none">
              {gif.user?.display_name || 'Anonymous'}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Gif;
