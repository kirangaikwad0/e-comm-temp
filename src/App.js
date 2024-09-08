import React from "react";
import Navbar from "./components/Navbar";
import Createproduct from "./components/Createproduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayProduct from "./components/DisplayProduct";
import UpdateProduct from "./components/UpdateProduct";
import AddToCart from "./components/AddToCart";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/create" element={<Createproduct />} />
          <Route path="/" element={<DisplayProduct />} />
          <Route path="/edit/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<AddToCart />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
