// src/pages/Alimentacao/Relatorio/styles.js
import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

export const Titulo = styled.h1`
  font-size: 1.8rem;
  color: #3a86ff;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export const Data = styled.p`
  text-align: center;
  color: #888;
`;

export const Sessao = styled.div`
  margin: 20px 0;

  h3 {
    color: #ff6b35;
    margin-bottom: 8px;
  }

  p, ul, li {
    font-size: 1rem;
    line-height: 1.6;
  }

  ul {
    padding-left: 20px;
  }

  @media (max-width: 600px) {
    h3 {
      font-size: 1.1rem;
    }

    p, li {
      font-size: 0.95rem;
    }
  }
`;

export const BotaoBaixar = styled.button`
  background: #3a86ff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 30px;

  &:hover {
    background: ${darken(0.1, '#3a86ff')};
  }

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;

export const MensagemAguardando = styled.div`
  text-align: center;
  margin-top: 40px;
  color: #666;

  svg {
    color: #ff6b35;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  span {
    font-size: 0.9rem;
    color: #999;
  }

  @media (max-width: 600px) {
    p {
      font-size: 1rem;
    }
    span {
      font-size: 0.85rem;
    }
  }
`;

export const Loading = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 40px;
  color: #666;
`;
