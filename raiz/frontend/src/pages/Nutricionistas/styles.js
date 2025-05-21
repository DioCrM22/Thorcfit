import styled from 'styled-components';
import { motion } from 'framer-motion';

const AZUL = '#3a86ff';
const VERDE = '#35eb21';
const CINZA = '#666';

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
  margin-bottom: 30px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 12px;
  font-size: 16px;
  background: transparent;
  
  &:focus {
    outline: none;
  }
`;

export const ProfessionalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ProfessionalCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  
  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${AZUL};
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
  
  .status {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    
    .badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      
      &.ativo {
        background: ${VERDE}20;
        color: ${VERDE};
      }
      
      &.inativo {
        background: #ff444420;
        color: #ff4444;
      }
    }
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 480px) {
    width: 100%;
    button {
      flex: 1;
    }
  }
`;

export const PlanButton = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${AZUL};
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${CINZA};
  
  p {
    margin-top: 15px;
  }
`;