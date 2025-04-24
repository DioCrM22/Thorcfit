import React from 'react';
import * as S from './styles';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <S.Drawer open={open}>
      <S.CloseButton>
        <X size={20} onClick={onClose} style={{ cursor: 'pointer' }} />
      </S.CloseButton>
      <S.Logo>
      <img src="/assets/images/iconlogo.png" alt="Logo ThorcFit" />
      </S.Logo>
      <S.Title>
          <span>Thorc</span>
          <span>Fit</span>
      </S.Title>
      <S.NavList>
        <S.NavItem onClick={() => handleNavigate('/perfil')}>Perfil</S.NavItem>
        <S.NavItem onClick={() => handleNavigate('/treinos')}>Ver Treinos</S.NavItem>
        <S.NavItem onClick={() => handleNavigate('/rotina')}>Monitorar Rotina</S.NavItem>
        <S.NavItem onClick={() => handleNavigate('/alimentacao')}>Alimentação</S.NavItem>
        <S.NavItemExit onClick={() => handleNavigate('/')}>Sair</S.NavItemExit>
      </S.NavList>
    </S.Drawer>
  );
}
