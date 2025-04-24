// components/NavBar/index.js
import React from 'react';
import { Menu } from 'lucide-react';
import * as S from './styles';

export default function NavBar({ onMenuClick }) {
  return (
    <S.Bar>
      <Menu size={24} onClick={onMenuClick} style={{ cursor: 'pointer' }} />
      <S.Title>
        <span>Thorc</span>
        <span>Fit</span>
      </S.Title>
    </S.Bar>
  );
}