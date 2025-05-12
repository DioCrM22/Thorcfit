import React from 'react';
import * as S from './styles';

export default function MeusTreinosButton({ onClick, active }) {
  return (
    <S.FloatingButton 
      onClick={onClick}
      active={active}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ top: '90px' }}
    >
      <span style={{ 
        fontSize: '22px',
        filter: active ? 'none' : 'grayscale(50%) opacity(0.8)' }}>👤</span>
    </S.FloatingButton>
  );
}