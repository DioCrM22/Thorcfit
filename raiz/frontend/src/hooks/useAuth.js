import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [ setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Primeiro definimos todas as funções que serão usadas
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  const handleAuthSuccess = useCallback((token, userData) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
    setLoading(false);
    navigate('/home', { replace: true });
  }, [navigate]);

  const checkSession = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;
  
      const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const { data } = await axios.get(`${backendUrl}/api/usuario-perfil`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (data?.usuario) {
        setUser(data.usuario);
      } else {
        throw new Error('Dados inválidos');
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
      logout();
    } finally {
      setInitializing(false);
    }
  }, [logout]);  

  // Depois configuramos os interceptors que usam essas funções
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  const signup = async (nome, email, senha) => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/signup', { nome, email, senha });
      if (data.error) throw new Error(data.error);
      handleAuthSuccess(data.token, data.usuario);
      return null;
    } catch (error) {
      setLoading(false);
      return error.response?.data?.error || 'Erro ao cadastrar';
    }
  };

  const googleLogin = async (googleToken) => {
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.post(
        `${backendUrl}/google`,
        { token: googleToken }
      );
      
      if (!data.token || !data.usuario) throw new Error('Resposta inválida');
      handleAuthSuccess(data.token, data.usuario);
    } catch (error) {
      setLoading(false);
      throw error.response?.data?.error || new Error('Falha no login Google');
    }
  };

  const signin = async (email, senha) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        senha
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setUser(response.data.usuario);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };  

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.post(`${backendUrl}/api/auth/forgot-password`, { 
        email 
      });
      
      if (data.error) {
        return data.error;
      }
      return null;
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      return error.response?.data?.error || 'Erro ao solicitar recuperação de senha';
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email, newPassword) => {
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        newPassword
      });
      return data.error || null;
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return error.response?.data?.error || 'Erro ao redefinir senha';
    } finally {
      setLoading(false);
    }
  };
  // Inicialização
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <AuthContext.Provider value={{
      user,
      initializing,
      loading,
      signup,
      googleLogin,
      signin,
      forgotPassword,
      resetPassword,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);