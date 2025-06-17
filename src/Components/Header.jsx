

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img3 from '../assets/img3.svg';
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from '../Context/gifContext';
import GifSearch from './GifSearch';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gf, favorites } = GifState();

  const fetchGifCategories = async () => {
    try {
      const { data } = await gf.categories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav className="relative z-30">
      <div className='relative flex gap-4 justify-between items-center mb-2'>
        <Link to="/" className='flex gap-2 items-center'>
          <img src={img3} className='w-8' alt="Giphy Logo" />
          <h1 className='text-3xl sm:text-5xl font-bold tracking-tight cursor-pointer'>Giphy</h1>
        </Link>

        <div className='font-bold text-md flex gap-2 items-center'>
          {/* Top 5 categories - desktop only */}
          {categories?.slice(0, 5)?.map((category) => (
            <Link
              key={category.name}
              to={`/${category.name_encoded}`}
              className='px-4 py-1 hover:gradient border-b-4 hidden lg:block'
            >
              {category.name}
            </Link>
          ))}

          {/* Ellipsis toggle (Desktop) */}
          <button onClick={() => setShowCategories(!showCategories)} className='hidden lg:block'>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${showCategories ? "gradient" : ""} border-b-4`}
            />
          </button>

          {/* Favorite button */}
          {favorites.length > 0 && (
            <Link
              to='/favorites'
              className='h-9 bg-gray-700 pt-1.5 px-4 rounded text-sm sm:text-base text-white'
            >
              Favorite Gifs
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button onClick={() => setShowCategories(!showCategories)} className='lg:hidden'>
            <HiMiniBars3BottomRight className='text-white' size={30} />
          </button>
        </div>
      </div>

      {/* Responsive Dropdown Categories */}
      {showCategories && (
        <>
          {/* Backdrop for mobile */}
          <div
            onClick={() => setShowCategories(false)}
            className="fixed inset-0 z-10 bg-black bg-opacity-40 lg:hidden"
          />

          {/* Dropdown */}
          <div className='absolute top-16 left-0 w-full bg-gradient-to-r from-cyan-700 to-pink-500 text-white z-20 p-4 rounded-b-lg shadow-xl'>
            <span className='text-2xl sm:text-3xl font-extrabold block mb-4'>Categories</span>
            <hr className='bg-gray-100 opacity-50 my-3' />

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
              {categories?.map((category) => (
                <Link
                  key={category.name}
                  to={`/${category.name_encoded}`}
                  onClick={() => setShowCategories(false)}
                  className='text-sm font-semibold hover:underline'
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Search bar */}
      <GifSearch />
    </nav>
  );
};

export default Header;


