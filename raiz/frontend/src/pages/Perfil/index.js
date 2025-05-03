// src/pages/Perfil/index.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import * as S from './styles';

export default function Perfil() {
  const { user } = useAuth();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/usuario/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      }).then(res => setDados(res.data));
    }
  }, [user]);

  return (
    <S.Container>
      <S.Title><span>Perfil</span><span>Fit</span></S.Title>
      <img src={dados?.foto_perfil} alt="foto" width={100} />

      <S.Form>
        <S.Input type="text" placeholder="Nome" defaultValue={dados?.nome} />
        <S.Input type="email" placeholder="Email" defaultValue={dados?.email} />
        <S.Input type="password" placeholder="Nova Senha" />
        <S.Select defaultValue={dados?.objetivo}>
          <option value="">Objetivo</option>
          <option value="Emagrecer">Emagrecer</option>
          <option value="Ganhar Massa">Ganhar Massa</option>
        </S.Select>
        <S.Input type="text" placeholder="Treinador" disabled value={dados?.treinador || 'Não atribuído'} />
        <S.Button>Salvar Alterações</S.Button>
      </S.Form>
    </S.Container>
  );
}