// styles.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AZUL = '#0066cc';
const LARANJA = '#FF6B35';
const VERDE = '#35eb21';

export const FriendCard = styled(motion.li).attrs(props => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: props.$delay || 0, duration: 0.3 }
}))`
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column; 
  gap: 15px;
`;

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

export const FriendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
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

export const ActionButton = styled(motion.button).attrs({
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
})`
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