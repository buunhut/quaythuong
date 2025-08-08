import React, { useState, useEffect } from "react";
import "./app.scss";
import QuayThuong from "./pages/QuayThuong";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/quay-thuong" element={<QuayThuong />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
