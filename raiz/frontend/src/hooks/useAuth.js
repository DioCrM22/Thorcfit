import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
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
      if (!token) return null;
  
      // Verifique o prefixo correto (/auth ou /api)
      const { data } = await axios.get('http://localhost:5000/auth/usuario-perfil', {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (data?.success && data.usuario) {
        setUser(data.usuario);
        return data.usuario;
      }
      throw new Error('Dados inválidos');
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
      logout();
      return null;
    } finally {
      setInitializing(false);
    }
  }, [logout]);

  // Adicione esta função ao seu context
const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const { data } = await axios.get('/auth/usuario-perfil', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser(data);
    return data;
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    logout();
    return null;
  }
};

const updateProfile = async (updatedData) => {
  setLoading(true);
  try {
    const token = localStorage.getItem('authToken');
    const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const { data } = await axios.put(`${backendUrl}/api/usuario-perfil`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (data?.usuarioAtualizado) {
      setUser(data.usuarioAtualizado); // Atualiza o estado do usuário
      return null;
    } else {
      return 'Erro ao atualizar perfil';
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return error.response?.data?.error || 'Erro ao atualizar perfil';
  } finally {
    setLoading(false);
  }
};

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
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const { data } = await axios.post(`${backendUrl}/auth/login`, {
        email,
        senha
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!data.token || !data.usuario) {
        throw new Error('Resposta inválida do servidor');
      }
  
      handleAuthSuccess(data.token, data.usuario);
      return { success: true };
    } catch (error) {
      console.error('Erro detalhado:', error);
      return { 
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login' 
      };
    } finally {
      setLoading(false);
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
      checkSession,
      fetchUserProfile,
      signup,
      googleLogin,
      signin,
      forgotPassword,
      resetPassword,
      updateProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);