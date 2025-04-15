import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";

// 1. Crie a raiz do React
const container = document.getElementById('root');
const root = createRoot(container);

// 2. Renderize a aplicação usando a nova API
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);