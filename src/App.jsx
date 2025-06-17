import React from 'react';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import './index.css';
import AppLayout from './Layouts/AppLayout';
import Category from './pages/Category';
import Search from './pages/Search';
import Favorites from './pages/Favorites';

import GifPage from './pages/Singlegif';
import Home from './pages/Home';

import GifProvider from './Context/GifContext';
 // ✅ correct if folder name is Context and file is gifContext.jsx



//homepage
//categories
//search
//search gif
//favorite


const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path:'/',
      element:<Home/>
      },

      {
        path:'/:category',
        element:<Category/>
      },



      {
        path:'/search/:query',
        element:<Search/>
      },


      {
        path:'/:type/:slug',
        element:<GifPage/>
      },

      {
        path:'/favorites',
        element:<Favorites/>
      },
    ]
  }
])
const App = () => {
  return (
    <GifProvider>

    
  <RouterProvider router={router}/>
    </GifProvider>
  )
}

export default App




