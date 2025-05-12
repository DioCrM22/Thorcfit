import styled from 'styled-components';
import { motion } from 'framer-motion';

// Cores
export const AZUL = '#0066cc';
export const LARANJA = '#FF6B35';
export const VERDE = '#35eb21';
export const VERMELHO = '#FF3333';
export const ROXO = '#8A2BE2';
export const CINZA_CLARO = '#f0f0f0';
export const CINZA_ESCURO = '#666';


export const Page = styled.div`
  padding-top: 70px;
  min-height: 100vh;
  background: #f8f9fa;
  font-family: "Golos Text", sans-serif;
  position: relative;
`;

export const Content = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const ProfileHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    text-align: center;
  }
`;

export const CenteredLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 160px;
    height: auto;
    margin-bottom: 10px;
  }
`;

export const ViewModeTitle = styled.h2`
  text-align: center;
  color: #FF6B35;
  margin: 20px 0;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: "Golos Text", sans-serif;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  min-width: 100px;
  border-radius: 50%;
  border: 3px solid ${AZUL};
  padding: 3px;
  background: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    min-width: 80px;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const ProfileName = styled.h2`
  margin: 0 0 5px;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const ProfileDetail = styled.p`
  margin: 4px 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 480px) {
    justify-content: center;
    font-size: 0.85rem;
  }
`;

export const ProfileType = styled.span`
  display: inline-block;
  margin-top: 5px;
  padding: 3px 8px;
  background: ${AZUL};
  color: white;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const RemoveButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${VERMELHO};
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1;

  &:hover {
    background: #e60000;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const PrimaryButton = styled(motion.button)`
  flex: 1;
  padding: 12px;
  background: ${AZUL};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 160px;

  &:hover {
    background: #005bb7;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SecondaryButton = styled(motion.button)`
  flex: 1;
  padding: 12px;
  background: ${props => props.active ? AZUL : CINZA_CLARO};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 120px;

  &:hover {
    background: ${props => props.active ? '#005bb7' : '#e0e0e0'};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const TertiaryButton = styled(motion.button)`
  flex: 1;
  padding: 12px;
  background: ${CINZA_CLARO};
  color: #333;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 100px;

  &:hover {
    background: #e0e0e0;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const TreinadoresList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const TreinadorCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

export const TreinadorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${AZUL};
`;

export const TreinadorInfo = styled.div`
  flex: 1;
`;

export const TreinadorName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
`;

export const TreinadorDetail = styled.div`
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const FilterGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const FilterButton = styled(motion.button)`
  padding: 8px 12px;
  background: ${props => props.active ? AZUL : CINZA_CLARO};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

export const TabButton = styled(motion.button)`
  flex: 1;
  padding: 12px 0;
  background: ${props => props.active ? AZUL : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  border-radius: 8px 8px 0 0;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 10px 0;
  }
`;

export const TreinosGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const TreinoCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
`;

export const TreinoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const TreinoDate = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

export const TreinoType = styled.span`
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 12px;
  background: ${props => props.tipo === 'pessoal' ? '#e6f2ff' : '#fff0e6'};
  color: ${props => props.tipo === 'pessoal' ? AZUL : LARANJA};
`;

export const TreinoName = styled.h3`
  margin: 0 0 10px;
  color: #333;
  font-size: 1.1rem;
  flex-grow: 1;
`;

export const TreinoDetail = styled.p`
  margin: 5px 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const TreinoAction = styled(motion.button)`
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background: ${props => 
    props.status === 'pendente' ? VERDE : 
    props.status === 'em-andamento' ? LARANJA : 
    AZUL};
  color: white;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${props => 
      props.status === 'pendente' ? '#2bc418' : 
      props.status === 'em-andamento' ? '#e65c00' : 
      '#005bb7'};
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  grid-column: 1 / -1;
`;

export const ConfirmModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;

  h3 {
    margin-top: 0;
    color: #333;
  }

  p {
    margin-bottom: 20px;
    color: #666;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const ModalCancelButton = styled.button`
  padding: 8px 16px;
  background: ${CINZA_CLARO};
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e0e0e0;
  }
`;

export const ModalConfirmButton = styled.button`
  padding: 8px 16px;
  background: ${VERMELHO};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e60000;
  }
`;

export const FloatingButton = styled(motion.button)`
  position: fixed;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.active ? '#0066cc' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 100;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    right: 15px;
  }
`;