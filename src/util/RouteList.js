import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../pages/AuthenticationPage/RegisterPage";
import LoginPage from "../pages/AuthenticationPage/LoginPage";
import NavBar from "../pages/NavBar/NavBar";

function RouteList() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<NavBar />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default RouteList;
