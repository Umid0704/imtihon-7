import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Registration from "./fecheres/Lists/Registration/Registration";
import Auth from "./fecheres/Lists/Auth/Auth";
import Cards from "./fecheres/Cards/Cards";
import Page from "./fecheres/page/page";
import SinglePage from "./fecheres/Cards/SinglePage";
import Single_page from "./fecheres/page/Single_page";
import Category from "./fecheres/caregory/Category";


export default function App(){
 
  return (
    <div  >
  
   <Routes >
      <Route path="" element={<Registration/>} />
      <Route path="/auth" element={<Auth/>} />
      <Route path="/card" element={<Cards/>} />
      <Route path="/page" element={<Page/>} />
      <Route path="/category" element={<Category/>} />
      <Route path="/card/:id" element={<SinglePage/>} />
      <Route path="/page/:id" element={<Single_page/>} />

    </Routes>
     
    </div>
  );
}
