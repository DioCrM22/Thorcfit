// src/pages/Amigos/index.js
import React from 'react';
import * as S from './styles';

export default function Amigos() {
  return (
    <S.Container>
      <S.Title><span>Adicionar</span><span>Amigos</span></S.Title>
      <S.Logo src="/assets/images/logo.png" alt="Logo" />

      <S.Form>
        <S.Input type="email" placeholder="Email do amigo" />
        <S.ActionRow>
          <S.CancelButton>Cancelar</S.CancelButton>
          <S.SubmitButton>Mandar Solicitação</S.SubmitButton>
        </S.ActionRow>
        <S.Button>Alterar</S.Button>
      </S.Form>
    </S.Container>
  );
}