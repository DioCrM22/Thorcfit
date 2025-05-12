import styled from 'styled-components';
import { FiArrowLeft, FiMenu } from 'react-icons/fi';

const AZUL = '#0066cc';
const LARANJA = '#FF6B35';

export const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;

  @media (max-width: 480px) {
    padding: 0 10px;
    height: 56px;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 20px;

  @media (max-width: 480px) {
    left: 10px;
    padding: 6px;
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 20px;

  @media (max-width: 480px) {
    left: 10px;
    padding: 6px;
  }
`;

export const BackIcon = styled(FiArrowLeft)`
  color: #333;
  font-size: 24px;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(-2px);
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const MenuIcon = styled(FiMenu)`
  color: #333;
  font-size: 24px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const Title = styled.h1`
  font-family: "Golos Text", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: none;  // Alterado de 'uppercase' para 'none'
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0 10px;

  @media (max-width: 480px) {
    font-size: 1.3rem;
    padding: 0 5px;
  }

  @media (max-width: 360px) {
    font-size: 1.1rem;
  }
`;

export const BlueText = styled.span`
  color: ${AZUL};
`;

export const OrangeText = styled.span`
  color: ${LARANJA};
`;