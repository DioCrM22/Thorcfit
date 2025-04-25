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
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/validate-token`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.usuario);
        } catch (error) {
          logout();
        }
      }
    };
    checkAuth();
  }, [logout]);

  const signin = async (email, senha) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        return data.error || "Credenciais inválidas ou erro desconhecido";
      }

      if (!data.usuario?.email_confirmado) {
        return "Confirme seu e-mail antes de fazer login";
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }

      setUser({
        id: data.usuario.id,
        nome: data.usuario.nome,
        email: data.usuario.email,
        emailConfirmado: data.usuario.email_confirmado
      });

      return null;

    } catch (err) {
      console.error("Erro no login:", err);
      return err.message || "Erro interno durante o login";
    }
  };

  const signup = async (nome, email, senha) => {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({ nome, email, senha }),
        credentials: 'include' // Importante para cookies/sessões
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return errorData.error || "Erro ao cadastrar";
      }
  
      return null;
    } catch (err) {
      console.error("Erro no signup:", err);
      return "Erro de conexão com o servidor";
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

  const resetPassword = async (token, novaSenha, confirmacaoSenha) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token,
          nova_senha: novaSenha,
          confirmacao_senha: confirmacaoSenha 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return data.error || "Erro ao redefinir senha";
      }

      return null;
    } catch (err) {
      console.error("Erro no resetPassword:", err);
      return "Erro de conexão com o servidor";
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      signin,
      signup,
      forgotPassword,
      resetPassword,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);