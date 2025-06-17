

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';

const AppLayout = () => {
  return (
    <div className="bg-purple-300 text-white min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Header />

        <main className="mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
