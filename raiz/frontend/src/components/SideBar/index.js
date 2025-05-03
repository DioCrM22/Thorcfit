import React, { useRef, useState, useEffect } from 'react';
import * as S from './styles';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.min.css';

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // State para exibir imagem do banco
  const [imageSrc, setImageSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState(null);
  const fileInputRef = useRef(null);

  // Buscar foto de perfil em Base64 ao montar ou quando user mudar
  useEffect(() => {
    if (user?.id) {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      axios
        .get(`${API_URL}/api/foto-perfil-base64/${user.id}`)
        .then((res) => {
          if (res.data.image) {
            setImageSrc(res.data.image);
          }
        })
        .catch(() => setImageSrc(null));
    }
  }, [user]);

  const notify = (type, message) => {
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      notify('error', 'Selecione um arquivo de imagem válido');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCrop = async () => {
    if (!cropper) {
      alert('Selecione uma área para recortar');
      return;
    }

    try {
      const canvas = cropper.getCroppedCanvas({
        width: 500,
        height: 500,
        minWidth: 256,
        minHeight: 256,
        fillColor: '#fff',
        imageSmoothingQuality: 'high'
      });

      const originalButtonText = document.querySelector('.crop-button').textContent;
      document.querySelector('.crop-button').textContent = 'Processando...';
      document.querySelector('.crop-button').disabled = true;

      canvas.toBlob(async (blob) => {
        try {
          if (!blob) throw new Error('Falha ao processar a imagem');

          const token = localStorage.getItem('authToken');
          
          // Verificação mais robusta do token
          if (!token) {
            throw new Error('Sessão expirada');
          }

          // Verifica se o token está expirado
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          if (decodedToken.exp * 1000 < Date.now()) {
            throw new Error('Sessão expirada');
          }

          const formData = new FormData();
          formData.append('foto_perfil', blob, `perfil-${Date.now()}.png`);

          const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000);

          const response = await axios.post(
            `${API_URL}/api/upload-foto`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              },
              signal: controller.signal,
              timeout: 20000 // Timeout adicional como fallback
            }
          );

          clearTimeout(timeoutId);

          if (!response.data.success) {
            throw new Error(response.data.error || 'Erro no servidor');
          }

          // Atualização otimizada sem reload completo
          alert('Foto atualizada com sucesso!');
          setImage(null);
          
          // Atualiza a foto de perfil localmente
          const reader = new FileReader();
          reader.onload = () => {
            setImageSrc(reader.result);
          };
          reader.readAsDataURL(blob);

        } catch (err) {
          console.error('Erro no upload:', {
            message: err.message,
            stack: err.stack,
            response: err.response?.data
          });

          let errorMessage = 'Erro ao enviar imagem';
          
          if (err.message === 'Sessão expirada') {
            errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
            localStorage.removeItem('authToken');
            navigate('/login');
          } else if (err.response) {
            if (err.response.status === 401) {
              errorMessage = 'Não autorizado - Faça login novamente';
              localStorage.removeItem('authToken');
              navigate('/login');
            } else if (err.response.status === 413) {
              errorMessage = 'Imagem muito grande (máx. 10MB)';
            } else if (err.response.status === 404) {
              errorMessage = 'Endpoint não encontrado';
            }
          } else if (err.name === 'AbortError') {
            errorMessage = 'Tempo excedido - Servidor não respondeu';
          } else if (err.message.includes('Network Error')) {
            errorMessage = 'Servidor indisponível - Verifique sua conexão';
          }

          alert(errorMessage);
        } finally {
          document.querySelector('.crop-button').textContent = originalButtonText;
          document.querySelector('.crop-button').disabled = false;
        }
      }, 'image/png', 0.95);

    } catch (err) {
      console.error('Erro no crop:', err);
      alert('Erro ao processar a imagem - Tente novamente');
      document.querySelector('.crop-button').textContent = 'CONFIRMAR';
      document.querySelector('.crop-button').disabled = false;
    }
  };

  return (
    <S.Drawer open={open}>
      <S.CloseButton>
        <X size={20} onClick={onClose} style={{ cursor: 'pointer' }} />
      </S.CloseButton>

      <S.ProfileSection>
        <S.Avatar
          src={imageSrc || "/assets/images/default-avatar.png"}
          alt="FOTO DE PERFIL"
        />
        <S.ChangePhotoButton onClick={() => fileInputRef.current.click()}>
          ALTERAR IMAGEM
        </S.ChangePhotoButton>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </S.ProfileSection>

      {image && (
        <S.CropModal>
          <S.CropContainer>
            <Cropper
              src={image}
              style={{ height: 300, width: '100%' }}
              aspectRatio={1}
              guides={true}
              viewMode={1}
              autoCropArea={1}
              background={false}
              onInitialized={(instance) => setCropper(instance)}
            />
            <S.CropActions>
              <S.CropButton className="crop-button" onClick={handleCrop}>CONFIRMAR</S.CropButton>
              <S.CropCancelButton onClick={() => setImage(null)}>CANCELAR</S.CropCancelButton>
            </S.CropActions>
          </S.CropContainer>
        </S.CropModal>
      )}

      <S.Title>
        <span>THORC</span>
        <span>FIT</span>
      </S.Title>

      <S.NavList>
        <S.NavItem onClick={() => handleNavigate('/perfil')}>PERFIL</S.NavItem>
        <S.NavItem onClick={() => handleNavigate('/treinos')}>VER TREINOS</S.NavItem>
        <S.NavItem onClick={() => handleNavigate('/rotina')}>MONITORAR ROTINA</S.NavItem>
        <S.NavItem onClick={() => handleNavigate('/alimentacao')}>ALIMENTAÇÃO</S.NavItem>
        <S.NavItemExit onClick={logout}>SAIR</S.NavItemExit>
      </S.NavList>
    </S.Drawer>
  );
}