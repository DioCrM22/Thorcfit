import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/signin', { replace: true }); // Use /signin para ficar igual as rotas
  }, [navigate]);

  const handleAuthSuccess = useCallback((token, userData) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
    setLoading(false);
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setInitializing(false);
        return null;
      }
  
      const { data } = await axios.get('/auth/usuario-perfil', {
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

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token não encontrado');

      const { data } = await axios.get('/auth/usuario-perfil', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (data?.success && data.usuario) {
        setUser(data.usuario);
        return data.usuario;
      }
      throw new Error('Dados inválidos');
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
      if (!token) throw new Error('Token não encontrado');

      const { data } = await axios.put('/auth/usuario-perfil', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (data?.success && data.usuario) {
        setUser(data.usuario);
        return null;
      } else {
        return data?.error || 'Erro ao atualizar perfil';
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return error.response?.data?.error || 'Erro ao atualizar perfil';
    } finally {
      setLoading(false);
    }
  };

  const signup = async (nome, email, senha, tipoUsuario = 'usuario') => {
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/signup', { 
        nome, 
        email, 
        senha,
        tipo_usuario: tipoUsuario
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data.token && data.usuario) {
        handleAuthSuccess(data.token, data.usuario);
        return { success: true };
      } else {
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error) {
      setLoading(false);
      console.error('Erro no cadastro:', error);
      return { success: false, error: error.response?.data?.error || error.message || 'Erro ao cadastrar' };
    }
  };

  const signin = async (email, senha) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        senha
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data.token && data.usuario) {
        handleAuthSuccess(data.token, data.usuario);
        return { success: true };
      } else {
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false,
        error: error.response?.data?.error || error.message || 'Erro ao fazer login' 
      };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/forgot-password', { 
        email 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
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
      const { data } = await axios.post('/auth/reset-password', {
        email,
        newPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (data.error) {
        return data.error;
      }
      return null;
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return error.response?.data?.error || 'Erro ao redefinir senha';
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return false;

      const { data } = await axios.get('/auth/verify-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return data?.valid || false;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return false;
    }
  };

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
      signin,
      forgotPassword,
      resetPassword,
      updateProfile,
      verifyToken,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
