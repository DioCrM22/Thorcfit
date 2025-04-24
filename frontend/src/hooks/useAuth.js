// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    // Lógica de persistência de login pode ser adicionada aqui
  }, []);

  // Login tradicional
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

  // Cadastro
  const signup = async (nome, email, senha) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({ nome, email, senha }),
        credentials: 'include'
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

  // Validação de código de reset
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

  // Esqueci a senha
  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/forgot-password`, 
        { email }
      );
      
      // Nova lógica de tratamento de resposta
      if (response.status === 404) {
        return "Email não localizado no sistema";
      }
      
      return response.data.error || null;
    } catch (err) {
      return err.response?.data?.error || "Erro ao verificar e-mail";
    }
  };

  // Redefinir senha (CORRIGIDO)
  const resetPassword = async (email, newPassword) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reset-password`, // Endpoint corrigido
        { email, newPassword }
      );
      
      if (response.data.error) {
        if (response.data.error.includes("igual")) {
          return "Não pode ser a senha anterior";
        }
        return response.data.error;
      }
      
      return null;
    } catch (err) {
      return err.response?.data?.error || "Erro ao redefinir senha";
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      signin,
      signup,
      forgotPassword,
      validateResetCode,
      resetPassword,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);