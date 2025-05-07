import styled from 'styled-components';
import { motion } from 'framer-motion';

const AZUL = '#3a86ff';
const LARANJA = '#FF6B35';
const VERDE = '#35eb21';
const VERMELHO = '#ff4444';

export const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  font-family: 'Golos Text', sans-serif;
  
  * {
    font-family: 'Golos Text', sans-serif;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  margin-bottom: 20px;
  position: relative;
  gap: 20px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 10;
  transition: transform 0.2s ease;

  span.material-icons { 
    color: #000 !important; 
    font-size: 32px;
    font-weight: 900;
    text-shadow: 0 2px 2px rgba(0,0,0,0.1);
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const Logo = styled(motion.img)`
  height: 200px;
  margin: 10px auto;
`;

export const TitleContainer = styled.div`
  display: flex;
  font-family: 'Golos Text', sans-serif;
  gap: 5px;
  margin-top: 15px;
`;

export const TitleBlue = styled.span`
  font-size: 36px;
  font-family: 'Golos Text', sans-serif;
  font-weight: 700;
  color: ${AZUL};
`;

export const TitleOrange = styled.span`
  font-size: 36px;
  font-weight: 700;
  font-family: 'Golos Text', sans-serif;
  color: ${LARANJA};
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
  font-size: 18px;
  font-family: 'Golos Text', sans-serif;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.2);
  }
`;

export const FilterGroup = styled(motion.div)`
  display: flex;
  gap: 6px;
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
  font-family: 'Golos Text', sans-serif;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${props => props.active ? AZUL : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? AZUL : '#e0e0e0'};
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
  flex-direction: column;
  gap: 15px;
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

export const UserImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${AZUL};
  align-self: center;
`;

export const UserInfo = styled.div`
  text-align: center;
  
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

export const ActionGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const AddButton = styled(motion.button)`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Golos Text', sans-serif;
  background-color: ${VERDE};
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
`;

export const DeleteButton = styled(motion.button)`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Golos Text', sans-serif;
  background-color: ${VERMELHO};
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
`;

export const CheckBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${AZUL};
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;