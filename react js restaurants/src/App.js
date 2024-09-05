import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CategoryCreate from './components/Category/CategoryCreate';
import CategoryIndex from './components/Category/CategoryIndex';
import CategoryEdit from './components/Category/CategoryEdit';
import RestaurantsCreate from './components/Restaurants/RestaurantsCreate';
import RestaurantsIndex from './components/Restaurants/RestaurantsIndex';
import RestaurantsEdit from './components/Restaurants/RestaurantsEdit';


function App() {
 
  return (
    
    <>
    <BrowserRouter>
      <Routes>
      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-ranch" element={<AddData />} />
      <Route path="/" element={<DisplayRanch />} />
      <Route path="/displaypixeldata" element={<Display />} /> */}

 <Route path="/add-category" element={<CategoryCreate />} />
 <Route path="/category" element={<CategoryIndex />} />
 <Route path="/category-edit/:id" element={<CategoryEdit />} />


 <Route path="/add-restaurants" element={<RestaurantsCreate />} />
 <Route path="/" element={<RestaurantsIndex />} />
 <Route path="/restaurants-edit/:id" element={<RestaurantsEdit />} />

        </Routes>
        </BrowserRouter>
        </>
  )
}

export default App