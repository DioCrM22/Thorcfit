import styled from 'styled-components';
import { motion } from 'framer-motion';

const AZUL = '#3a86ff';
const VERDE = '#35eb21';
const VERMELHO = '#ff4444';
const CINZA = '#666';

export const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  font-family: 'Golos Text', sans-serif;
  position: relative; /* Adicionado */
  
  * {
    font-family: 'Golos Text', sans-serif;
  }

  @media (max-width: 768px) {
    padding: 60px;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 15px;
  position: relative;

  /* Aumente o gap para desktop */
  gap: 60px; /* Aumentado de 40px para 60px */

  @media (max-width: 1024px) {
    gap: 40px;
  }

  @media (max-width: 768px) {
    gap: 30px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

export const Logo = styled(motion.img)`
  height: 200px;
  margin-top: 0px;
  position: relative;
  z-index: 1; /* Alterado de -2 para 1 */

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 480px) {
    height: 150px;
  }
`;

export const NavBarContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
`;

export const SearchContainer = styled.div`
  margin: 20px 0;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.2);
  }

  @media (max-width: 480px) {
    padding: 12px 15px;
    font-size: 14px;
  }
`;

export const FilterGroup = styled(motion.div)`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FilterButton = styled(motion.button)`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  background-color: ${props => props.active ? AZUL : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? AZUL : '#e0e0e0'};
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const UserCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  display: flex;
  gap: 20px;
  align-items: center;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    gap: 15px;
    padding: 15px;
  }
`;

export const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${AZUL};

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 18px;
  }
  
  p {
    margin: 4px 0;
    color: ${CINZA};
    font-size: 14px;
  }
`;

export const UserTypeBadge = styled.span`
  display: inline-block;
  margin-top: 8px;
  padding: 6px 12px;
  background-color: ${VERDE};
  color: white;
  font-weight: 700;
  border-radius: 20px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

export const AddButton = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${VERDE};
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: #e05a2b;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

export const DeleteButton = styled(motion.button)`
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${VERMELHO};
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: #cc0000;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

export const CheckBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${VERDE};
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyMessage = styled(motion.div)`
  text-align: center;
  padding: 40px 20px;
  color: ${CINZA};

  p {
    margin-top: 15px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

/* Estilos do Modal */
export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  h3 {
    margin-top: 0;
    color: #333;
    font-size: 20px;
  }
  
  p {
    margin-bottom: 10px;
    color: #666;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
`;

export const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  font-size: 14px;
  
  ${props => props.cancel ? `
    background-color: #f0f0f0;
    color: #333;
    
    &:hover {
      background-color: #e0e0e0;
    }
  ` : `
    background-color: ${VERMELHO};
    color: white;
    
    &:hover {
      background-color: #cc0000;
    }
  `}

  @media (max-width: 480px) {
    padding: 8px 16px;
  }
`;