//App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import ConfirmationPage from './pages/Confirmation';
import EmailConfirmationHandler from './pages/EmailConfirmationHandler';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/aguardando-confirmacao" element={<ConfirmationPage />} />
      <Route path="/confirmar-email/:token" element={<EmailConfirmationHandler />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
