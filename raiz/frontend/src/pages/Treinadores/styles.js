import styled from 'styled-components';
import { motion } from 'framer-motion';

const AZUL = '#3a86ff';
const VERDE = '#35eb21';
const CINZA = '#666';
const VERMELHO = '#ff4444';

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContent = styled(motion.div)`
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Golos Text', sans-serif;
  
  * {
    font-family: 'Golos Text', sans-serif;
  }
  
  @media (max-width: 768px) {
    padding: 10px;
    max-width: 100%;
  }
`;

export const Header = styled.header`
  margin-bottom: 30px;
  
  @media (max-width: 480px) {
    margin-bottom: 60px;
  }
`;

export const CenteredLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  img {
    width: 160px;
    height: auto;
    margin-bottom: 15px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #0066cc;
  text-align: center;
  text-transform: uppercase;
  font-family: "Golos Text", sans-serif;

  .highlight {
    color: #FF6B35;
  }
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
  
  @media (max-width: 480px) {
    padding: 8px 15px;
    margin-bottom: 20px;
  }
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
  
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const ProfessionalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

export const ProfessionalCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  gap: 25px;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    padding: 15px;
    gap: 15px;
  }
`;

export const UserImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${AZUL};
  
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
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
  
  .status {
    margin-top: 12px;
    display: flex;
    gap: 15px;
    align-items: center;
    flex-wrap: wrap;
    
    .badge {
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      
      &.ativo {
        background: ${VERDE}20;
        color: ${VERDE};
      }
      
      &.inativo {
        background: #ff444420;
        color: #ff4444;
      }
    }
    
    @media (max-width: 480px) {
      justify-content: center;
      gap: 10px;
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
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${AZUL};
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  
  @media (max-width: 480px) {
    padding: 10px 15px;
    font-size: 13px;
    justify-content: center;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${CINZA};
  
  p {
    margin-top: 15px;
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 40px 15px;
  }
`;

export const HistoryButton = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: #6c757d;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  
  @media (max-width: 480px) {
    padding: 10px 15px;
    font-size: 13px;
    justify-content: center;
  }
`;

export const HistoryContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  
  h5 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 16px;
  }
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background: white;
  border-radius: 6px;
  border-left: 4px solid ${props => props.status === 'ativo' ? VERDE : '#6c757d'};
  
  div {
    flex: 1;
    
    strong {
      display: block;
      margin-bottom: 5px;
      color: #333;
    }
    
    span {
      display: block;
      font-size: 12px;
      color: ${CINZA};
      margin: 2px 0;
    }
  }
  
  button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background: ${AZUL};
    color: white;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    font-size: 12px;
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    
    button {
      align-self: flex-end;
    }
  }
`;

export const DeleteButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${VERMELHO};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #cc0000;
  }
  
  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
  }
`;
