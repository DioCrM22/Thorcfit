// components/Tabs/index.js
import React from 'react';
import * as S from './styles';

export default function Tabs({ tabs, active, onChange }) {
  return (
    <S.Container>
      {tabs.map(tab => (
        <S.TabButton
          key={tab}
          active={tab === active}
          onClick={() => onChange(tab)}
        >
          {tab}
        </S.TabButton>
      ))}
    </S.Container>
  );
}