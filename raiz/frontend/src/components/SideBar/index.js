import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [imageSrc, setImageSrc] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (user?.id) {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

      // Definir imagem de perfil
      if (user.metodo_login === 'google') {
        setImageSrc(user.foto_perfil || "/assets/images/default-avatar.png");
      } else {
        axios
          .get(`${API_URL}/api/foto-perfil-base64/${user.id}`)
          .then((res) => res.data.image && setImageSrc(res.data.image))
          .catch(() => setImageSrc(null));
      }

      // Buscar detalhes do usuário
      axios
        .get(`${API_URL}/api/usuario-detalhes/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        })
        .then((response) => setUserDetails(response.data))
        .catch((error) => console.error('Erro ao buscar detalhes:', error));
    }
  }, [user]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  const formatUserInfo = () => {
    const info = [];
    
    // Email sempre aparece
    info.push(user?.email || 'Email não informado');
    
    // Telefone (se existir)
    if (userDetails?.telefone) {
      const phone = userDetails.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      info.push(phone);
    }
    
    // Idade (se existir data de nascimento)
    if (userDetails?.data_nascimento) {
      info.push(`${calculateAge(userDetails.data_nascimento)} anos`);
    }
    
    // Altura e peso
    if (userDetails?.altura) info.push(`${userDetails.altura}cm`);
    if (userDetails?.peso) info.push(`${userDetails.peso}kg`);
    
    return info.join(' | ');
  };

  return (
    <S.Drawer open={open}>
      <S.CloseButton>
        <X size={20} onClick={onClose} style={{ cursor: 'pointer' }} />
      </S.CloseButton>

      <S.ProfileSection>
        <S.Avatar
          src={imageSrc || "/assets/images/default-avatar.png"}
          alt="Foto de perfil"
        />

        <S.UserInfoContainer>
          <S.UserName>{user?.nome || 'Usuário'}</S.UserName>
          
          <S.InfoDivider />
          
          <S.UserInfoLine>
            {formatUserInfo()}
          </S.UserInfoLine>
          
          {userDetails?.objetivo && (
            <>
              <S.InfoDivider />
              <S.ObjectiveText>
                <strong>Objetivo:</strong> {userDetails.objetivo}
              </S.ObjectiveText>
            </>
          )}
        </S.UserInfoContainer>
      </S.ProfileSection>

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