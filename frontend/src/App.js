// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home"
import Perfil from './pages/Perfil';
import Treinos from './pages/Treinos';        
import Rotina from './pages/Rotina';           
import Alimentacao from './pages/Alimentacao'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/treinos" element={<Treinos />} />
      <Route path="/rotina" element={<Rotina />} />
      <Route path="/alimentacao" element={<Alimentacao />} />
      <Route path="/" element={<Signin />} />
    </Routes>
  );
}

export default App;
