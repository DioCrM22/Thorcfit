// src/pages/Perfil/index.js
import React from 'react';
import * as S from './styles';

export default function Perfil() {
  return (
    <S.Container>
      <S.Title><span>Perfil</span><span>Fit</span></S.Title>
      <S.Logo src="/assets/images/logo.png" alt="Logo" />

      <S.Form>
        <S.Input type="text" placeholder="Nome" />
        <S.Input type="email" placeholder="Email" />
        <S.Input type="password" placeholder="Reset Senha" />
        <S.Select>
          <option>Objetivo</option>
          <option>Emagrecer</option>
          <option>Ganhar Massa</option>
        </S.Select>
        <S.Input type="text" placeholder="Treinador" disabled />
        <S.Button>Alterar</S.Button>
      </S.Form>
    </S.Container>
  );
}