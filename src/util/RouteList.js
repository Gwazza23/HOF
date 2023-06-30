import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../pages/AuthenticationPage/RegisterPage";
import LoginPage from "../pages/AuthenticationPage/LoginPage";
import NavBar from "../pages/NavBar/NavBar";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ItemPage from "../pages/ItemPage/ItemPage";
import UserCartPage from "../pages/UserCartPage/UserCartPage";

function RouteList() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="item/:id" element={<ItemPage />} />
          <Route path="cart/:id" element={<UserCartPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default RouteList;
