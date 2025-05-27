<<<<<<< HEAD
import styled, { keyframes } from 'styled-components';
import { AZUL, LARANJA } from '../../Perfil/styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
=======
// src/pages/Alimentacao/AddAlimentoPopup/styles.js
import styled, { keyframes } from 'styled-components';
import { AZUL, LARANJA, VERDE } from '../../PerfilUsuario/styles';

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
>>>>>>> diogo
`;

export const Overlay = styled.div`
  position: fixed;
<<<<<<< HEAD
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
=======
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  animation: ${fadeIn} 0.3s ease-out;
  font-family: 'Golos Text', sans-serif;
=======
  border-radius: 16px;
  padding: 1.5rem;
  width: 90%;
  max-width: 420px;
  max-height: 90vh;
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
    padding: 1.2rem;
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
=======
  margin-bottom: 1.5rem;
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
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${AZUL};
=======
    font-weight: 800;
    font-size: 1.5rem;
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
    background: rgba(58, 134, 255, 0.1);
    transform: rotate(90deg) scale(1.1);
    color: ${AZUL};
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
  margin-top: 1rem;

  label {
    margin: 0.5rem 0 0.2rem;
    font-weight: bold;
    color: #444;
  }

  select, input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

export const SaveButton = styled.button`
  background: ${AZUL};
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
=======
  gap: 1.2rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  position: relative;
`;

export const Label = styled.label`
  margin-bottom: 0.6rem;
  font-weight: 700;
  color: #444;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '${props => {
      if (props.htmlFor === 'quantidade') return '⚖️';
      return '🔹';
    }}';
    font-size: 1.1rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(58, 134, 255, 0.15);
  }
`;

export const Unit = styled.span`
  position: absolute;
  right: 1rem;
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
  pointer-events: none;
`;

export const Input = styled.input`
  padding: 1rem;
  padding-right: ${props => props.hasUnit ? '3.5rem' : '1rem'};
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  font-weight: 500;
  background: #f9f9f9;
  height: 42px;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    box-shadow: 0 0 0 4px rgba(58, 134, 255, 0.2);
    background: white;
  }

  &::placeholder {
    color: #aaa;
    font-weight: 400;
  }
`;

export const Select = styled.select`
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  font-weight: 500;
  background: #f9f9f9;
  height: 42px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    box-shadow: 0 0 0 4px rgba(58, 134, 255, 0.2);
    background: white;
  }
`;

export const ButtonGroup = styled.div`
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
  padding: 1.1rem;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(58, 134, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '🍽️';
    font-size: 1.2rem;
  }

  &:hover {
    background: ${AZUL};
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(58, 134, 255, 0.4);
    animation: ${pulse} 1s ease infinite;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
>>>>>>> diogo
`;

export const SecondaryButton = styled.button`
  background: white;
  border: 2px solid ${AZUL};
  color: ${AZUL};
<<<<<<< HEAD
  font-weight: bold;
  padding: 0.8rem;
  border-radius: 8px;
  margin-right: 1rem;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;
=======
  font-weight: 800;
  padding: 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(255, 107, 0, 0.1);

  &::before {
    content: '📝';
    font-size: 1.1rem;
  }

  &:hover {
    background: rgba(255, 107, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 107, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

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
>>>>>>> diogo
