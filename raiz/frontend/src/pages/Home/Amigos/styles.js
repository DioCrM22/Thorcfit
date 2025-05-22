// styles.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AZUL = '#0066cc';
const LARANJA = '#FF6B35';
const VERDE = '#35eb21';
const CINZA_CLARO = '#f5f5f5';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  min-height: 100vh;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 20px;
  position: relative;
  border-bottom: 2px solid ${AZUL};
`;

export const Title = styled.h1`
  font-family: "Golos Text", sans-serif;
  font-size: 28px;
  margin: 0 auto;
  color: ${AZUL};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

export const TabButton = styled(motion.button)`
  flex: 1;
  padding: 12px;
  border: none;
  background: ${props => props.$active ? AZUL : CINZA_CLARO};
  color: ${props => props.$active ? 'white' : '#333'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  margin: 0 5px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const FriendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`;

export const FriendCard = styled(motion.li)`
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

export const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${AZUL};
`;

export const UserInfo = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 5px 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    margin: 3px 0;
    color: #666;
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled(motion.button)`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: white;
  background-color: ${props => props.$color === 'verde' ? VERDE : LARANJA};
  transition: all 0.2s;

  @media (max-width: 480px) {
    width: 100%;
  }
`;