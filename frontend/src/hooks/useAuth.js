// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Declaração única da função logout
  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    }, []);

  const signin = async (email, senha) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return data.error || "Credenciais inválidas";
      }
  
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setUser({
          id: data.usuario.id,
          nome: data.usuario.nome,
          email: data.usuario.email,
        });
      }
  
      return null;
  
    } catch (err) {
      return "Erro ao conectar ao servidor";
    }
  };

  const signup = async (nome, email, senha) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({ nome, email, senha }),
        credentials: 'include' // Importante para cookies/sessões
      });
      
      const data = await response.json();

      if (!response.ok) {
        return data.message || data.error || "Erro ao cadastrar";
      }
  
      return null;
    } catch (err) {
      console.error("Erro no signup:", err);
      return err.message || "Erro de conexão com o servidor";
    }
  };

  const validateResetCode = async (email, code) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/validate-reset-code`,
        { email, code }
      );
      return response.data;
    } catch (err) {
      return { valid: false, error: err.response?.data?.error || "Erro na validação" };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return data.error || "Erro ao enviar e-mail de recuperação";
      }

      return null;
    } catch (err) {
      console.error("Erro no forgotPassword:", err);
      return "Erro de conexão com o servidor";
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reset-password`,
        { email, code, newPassword }
      );
      return response.data;
    } catch (err) {
      return { error: err.response?.data?.error || "Erro ao redefinir senha" };
    }
  };
  
  // Atualize o provider
  return (
    <AuthContext.Provider value={{ 
      user,
      signin,
      signup,
      forgotPassword,
      validateResetCode, // Adicione esta linha
      resetPassword,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);