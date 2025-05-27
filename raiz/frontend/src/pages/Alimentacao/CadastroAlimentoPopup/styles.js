import styled, { keyframes } from 'styled-components';
<<<<<<< HEAD
import { AZUL, LARANJA } from '../../Perfil/styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
=======
import { AZUL, LARANJA, VERDE } from '../../PerfilUsuario/styles';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
>>>>>>> diogo
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
<<<<<<< HEAD
  background: rgba(0, 0, 0, 0.5);
=======
  background: rgba(0, 0, 0, 0.6);
>>>>>>> diogo
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
<<<<<<< HEAD
=======
  backdrop-filter: blur(3px);
>>>>>>> diogo
`;

export const Modal = styled.div`
  background: white;
<<<<<<< HEAD
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;
  font-family: 'Golos Text', sans-serif;
=======
  border-radius: 16px;
  padding: 1.5rem;
  width: 90%;
  max-width: 420px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: 'Golos Text', sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, ${AZUL}, ${VERDE}, ${LARANJA});
    background-size: 200% 200%;
    animation: ${gradientBG} 6s ease infinite;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 95%;
    border-radius: 12px;
  }
>>>>>>> diogo
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
<<<<<<< HEAD
  margin-bottom: 1.5rem;
=======
  margin-bottom: 1.8rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(58, 134, 255, 0.3), transparent);
  }
>>>>>>> diogo

  h2 {
    margin: 0;
    color: ${LARANJA};
    font-family: 'Poppins', sans-serif;
<<<<<<< HEAD
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
=======
    font-weight: 800;
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);

    &::before {
      content: '🍎';
      font-size: 1.4rem;
      animation: ${bounce} 2s infinite;
    }

    @media (max-width: 480px) {
      font-size: 1.3rem;
      letter-spacing: 0.5px;
    }
>>>>>>> diogo
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
<<<<<<< HEAD
  font-size: 1.5rem;
=======
  font-size: 1.8rem;
>>>>>>> diogo
  cursor: pointer;
  color: ${AZUL};
  padding: 0.5rem;
  line-height: 1;
<<<<<<< HEAD
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
=======
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;

  &:hover {
    background: rgba(58, 134, 255, 0.1);
    transform: rotate(90deg) scale(1.1);
    color: ${(0.1, AZUL)};
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    width: 32px;
    height: 32px;
>>>>>>> diogo
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
=======
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
>>>>>>> diogo
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
  margin-bottom: 1.2rem;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #333;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
=======
  margin-bottom: 0.5rem;
  position: relative;
`;

export const Label = styled.label`
  margin-bottom: 0.4rem;
  font-weight: 700;
  color: #444;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '${props => {
      switch(props.htmlFor) {
        case 'nome': return '📝';
        case 'calorias': return '🔥';
        case 'proteinas': return '💪';
        case 'carboidratos': return '🍞';
        case 'gorduras': return '🥑';
        case 'porcao_padrao': return '⚖️';
        default: return '🔹';
      }
    }}';
    font-size: 1.1rem;
  }
>>>>>>> diogo
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
<<<<<<< HEAD
`;

export const Input = styled.input`
  padding: 0.8rem;
  padding-right: ${props => props.hasUnit ? '2.5rem' : '0.8rem'};
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  transition: all 0.2s ease;
=======
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(58, 134, 255, 0.15);
  }
`;

export const Input = styled.input`
  padding: 1.2rem;
  padding-right: ${props => props.hasUnit ? '2rem' : '0.5rem'};
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  font-size: 0.9rem;
  width: 100%;
  transition: all 0.3s ease;
  font-weight: 500;
  background: #f9f9f9;
  height: 42px;
>>>>>>> diogo

  &:focus {
    outline: none;
    border-color: ${AZUL};
<<<<<<< HEAD
    box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
=======
    box-shadow: 0 0 0 4px rgba(58, 134, 255, 0.2);
    background: white;
  }

  &::placeholder {
    color: #aaa;
    font-weight: 400;
>>>>>>> diogo
  }
`;

export const Unit = styled.span`
  position: absolute;
<<<<<<< HEAD
  right: 0.8rem;
  color: #777;
  font-size: 0.9rem;
  pointer-events: none;
=======
  right: 1rem;
  color: #666; 
  font-size: 0.8rem; 
  font-weight: 500; 
  pointer-events: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  height: 100%;
>>>>>>> diogo
`;

export const ButtonContainer = styled.div`
  display: flex;
<<<<<<< HEAD
  gap: 1rem;
  margin-top: 1.5rem;
=======
  gap: 0.8rem;
  margin-top: 1.5rem;
  width: 100%;
  justify-content: center;
  padding: 0 1rem; 

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }
>>>>>>> diogo
`;

export const PrimaryButton = styled.button`
  background: ${AZUL};
  color: white;
  border: none;
<<<<<<< HEAD
  padding: 1rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  text-transform: uppercase;
  flex: 1;

  &:hover {
    background: #2a75f5;
  }

  &:active {
    transform: scale(0.98);
=======
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  min-width: 160px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  box-shadow: 0 2px 6px rgba(58, 134, 255, 0.3);
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  &::before {
    content: '💾';
    font-size: 0.9rem;
  }

  &:hover {
    background: ${AZUL}DD;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(58, 134, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
>>>>>>> diogo
  }
`;

export const SecondaryButton = styled.button`
  background: white;
<<<<<<< HEAD
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: 700;
  padding: 1rem;
=======
  border: 2px solid ${LARANJA};
  color: ${LARANJA};
  font-weight: 700;
  padding: 0.6rem 1.2rem;
>>>>>>> diogo
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
<<<<<<< HEAD
  flex: 1;

  &:hover {
    background: #f0f7ff;
=======
  letter-spacing: 0.3px;
  min-width: 160px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  box-shadow: 0 2px 6px rgba(255, 107, 0, 0.1);
  white-space: nowrap;

  &::before {
    content: '✖️';
    font-size: 0.9rem;
  }

  &:hover {
    background: rgba(255, 107, 0, 0.08);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 107, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Efeito de bolhas flutuantes no background
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
>>>>>>> diogo
  }
`;