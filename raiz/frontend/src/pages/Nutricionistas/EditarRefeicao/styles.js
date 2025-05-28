import styled, { keyframes } from 'styled-components';

export const AZUL = '#3a86ff';
export const LARANJA = '#ff6b35';
export const VERDE = '#2ecc71';

/* Animações */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/* Overlay */
export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
  padding: 1rem;
`;

/* Modal */
export const Modal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: ${fadeIn} 0.4s ease;
  font-family: 'Golos Text', sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, ${AZUL}, ${VERDE}, ${LARANJA});
    background-size: 200% 200%;
    animation: ${gradientBG} 6s ease infinite;
  }
`;

/* Header */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
    color: ${LARANJA};
    font-weight: 800;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);

    &::before {
      content: '🍽️';
      font-size: 1.3rem;
      animation: ${bounce} 2s infinite;
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: ${AZUL};
  padding: 0.5rem;
  line-height: 1;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;

  &:hover {
    background: rgba(58,134,255,0.1);
    transform: rotate(90deg) scale(1.1);
  }
`;

/* Formulário */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.4rem;
  font-weight: 700;
  color: #444;
  font-size: 0.95rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  background: #f9f9f9;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    box-shadow: 0 0 0 4px rgba(58,134,255,0.2);
    background: white;
  }
`;

export const Select = styled.select`
  padding: 0.8rem;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  background: #f9f9f9;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    box-shadow: 0 0 0 4px rgba(58,134,255,0.2);
    background: white;
  }
`;

/* Lista de Alimentos */
export const AlimentoLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-height: 300px;
  overflow-y: auto;
`;

export const AlimentoItem = styled.div`
  background: #f5f5f5;
  padding: 0.8rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid ${AZUL};
`;

/* Resumo */
export const Resumo = styled.div`
  background: #f9f9f9;
  padding: 1.2rem;
  border-radius: 8px;
  margin-bottom: 1rem;

  h3 {
    margin-top: 0;
    color: ${AZUL};
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
  }

  p {
    margin: 0.5rem 0;
  }

  ul {
    padding-left: 1.5rem;
    margin-top: 0.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    background: white;
    padding: 0.5rem;
    border-radius: 4px;
  }
`;

/* Botões */
export const AddButton = styled.button`
  background: ${AZUL};
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #2a75f5;
    transform: translateY(-2px);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-direction: column;

  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

export const PrimaryButton = styled.button`
  background: ${VERDE};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    background: ${AZUL};
    transform: translateY(-2px);
    animation: ${pulse} 1s ease infinite;
  }
`;

export const SecondaryButton = styled.button`
  background: white;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  padding: 1rem;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(58,134,255,0.1);
    transform: translateY(-2px);
  }
`;

/* Decoração */
export const Bubble = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(58, 134, 255, 0.1);
  opacity: 0.6;
  z-index: -1;

  &:nth-child(1) {
    width: 80px;
    height: 80px;
    top: -20px;
    right: -20px;
    animation: float 8s ease-in-out infinite;
  }

  &:nth-child(2) {
    width: 120px;
    height: 120px;
    bottom: -30px;
    left: -30px;
    animation: float 10s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`;
