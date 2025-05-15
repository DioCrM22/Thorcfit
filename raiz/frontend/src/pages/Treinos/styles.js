import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Cores
export const AZUL = '#0066cc';
export const LARANJA = '#FF6B35';
export const VERDE = '#35eb21';
export const AMARELO = '#FFD700';
export const CINZA_CLARO = '#f0f0f0';
export const CINZA_ESCURO = '#666';

// Animações
const glow = keyframes`
  0% { box-shadow: 0 0 10px ${AMARELO}; }
  50% { box-shadow: 0 0 20px ${AMARELO}; }
  100% { box-shadow: 0 0 10px ${AMARELO}; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

// Estrutura principal
export const Page = styled.div`
  padding-top: 60px;
  min-height: 100vh;
  background: #f8f9fa;
  font-family: "Golos Text", sans-serif;
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

// Lista de treinos
export const TreinosList = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const TreinoCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }
`;

export const GifContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  overflow: hidden;
  border-bottom: 1px solid #f0f0f0;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const TimeBadge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${AZUL};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const RepInfo = styled.span`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: ${AZUL};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

export const TreinoInfo = styled.div`
  padding: 16px;

  h3 {
    margin: 0 0 8px;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    color: #666;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 16px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

// Botões
const BaseButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-family: "Golos Text", sans-serif;
  justify-content: center;
  min-width: 120px;
`;

export const ExecuteButton = styled(BaseButton)`
  background: ${VERDE};
  color: white;
  font-weight: 600;
  flex: 1;

  &:hover {
    background: #2bc418;
  }
`;

export const ContinueButton = styled(BaseButton)`
  background: ${LARANJA};
  color: white;
  font-weight: 600;
  flex: 1;

  &:hover {
    background: #e05a28;
  }
`;

export const DeleteButton = styled(BaseButton)`
  background: ${CINZA_CLARO};
  color: ${CINZA_ESCURO};
  flex: 1;

  &:hover {
    background: #e0e0e0;
  }
`;

export const FinishedButton = styled(BaseButton)`
  background: ${AZUL};
  color: white;
  flex: 1;
  cursor: default;
`;

export const StopButton = styled(BaseButton)`
  background: ${LARANJA};
  color: white;
  font-size: 16px;

  &:hover {
    background: #e05a28;
  }
`;

// Tela de exercício em tela cheia
export const FullScreenOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const FullScreenContent = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;

export const ExerciseDescription = styled.div`
  padding: 16px;
  text-align: center;
  
  h3 {
    margin: 0 0 8px;
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    color: #666;
    font-size: 1rem;
    line-height: 1.4;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    
    h3 {
      font-size: 1.3rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

export const Timer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  background: rgba(0,0,0,0.7);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: bold;
`;

export const ControlGroup = styled.div`
  padding: 20px;
  display: flex;
  gap: 12px;
  justify-content: center;
`;

// Tela de descanso
export const RestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  background: ${AMARELO};
  height: 100%;
  animation: ${glow} 2s infinite;
`;

export const RestTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

export const RestTimer = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

export const RestText = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

// Tela de conclusão
export const CompletionOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CompletionContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoGlow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0) 70%);
`;

export const CompletionLogo = styled.img`
  width: 100%;
  height: auto;
  z-index: 1;
  position: relative;
`;

export const CompletionText = styled.h2`
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-top: 20px;
`;