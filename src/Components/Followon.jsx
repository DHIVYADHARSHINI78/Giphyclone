
import React from 'react';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Followon = () => {
  return (
    <div className='text-gray-400 pt-2 px-2 sm:px-0'>
      <span className="block text-sm sm:text-base">For contact:</span>
      <div className='flex gap-4 pt-3 flex-wrap'>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition"
        >
          <FaInstagram size={20} />
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
        >
          <FaXTwitter size={20} />
        </a>
      </div>
    </div>
  );
};

export default Followon;
