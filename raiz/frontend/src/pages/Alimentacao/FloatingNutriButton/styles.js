// src/pages/Alimentacao/FloatingNutriButton/styles.js
import styled, { css, keyframes } from 'styled-components';
import { darken } from 'polished';

const AZUL = '#3a86ff';
const LARANJA = '#ff6b35';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 120px;
  right: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  font-family: 'Golos Text', sans-serif;

  @media (max-width: 768px) {
    top: 100px;
    right: 15px;
  }

  @media (max-width: 480px) {
    top: 30px;
    right: 10px;
  }
`;

export const ToggleButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${AZUL};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(58, 134, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 101;

  &:hover {
    background: ${darken(0.1, AZUL)};
    transform: scale(1.05);
  }

  ${props =>
    props.isOpen &&
    css`
      background: ${LARANJA};
      &:hover {
        background: ${darken(0.1, LARANJA)};
      }
    `}
`;

export const Box = styled.div`
  background: white;
  border-radius: 16px;
  width: 340px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;
  border: 1px solid #e0e0e0;
  padding: 16px;

  @media (max-width: 480px) {
    width: 300px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h4`
  font-size: 1.3rem;
  color: ${AZUL};
  margin: 0;
  text-align: center;
`;

export const TextBlock = styled.div`
  font-size: 0.95rem;
  color: #444;
  line-height: 1.6;

  p {
    margin-bottom: 10px;
  }

  strong {
    color: #000;
  }
`;

export const ButtonLink = styled.button`
  background: ${AZUL};
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: ${darken(0.1, AZUL)};
    transform: translateY(-2px);
  }
`;
