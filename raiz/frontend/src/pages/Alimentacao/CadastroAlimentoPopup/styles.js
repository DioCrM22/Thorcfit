import styled, { keyframes } from 'styled-components';
import { AZUL, LARANJA } from '../../Perfil/styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;
  font-family: 'Golos Text', sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    color: ${LARANJA};
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${AZUL};
  padding: 0.5rem;
  line-height: 1;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #333;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  padding: 0.8rem;
  padding-right: ${props => props.hasUnit ? '2.5rem' : '0.8rem'};
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
  }
`;

export const Unit = styled.span`
  position: absolute;
  right: 0.8rem;
  color: #777;
  font-size: 0.9rem;
  pointer-events: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const PrimaryButton = styled.button`
  background: ${AZUL};
  color: white;
  border: none;
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
  }
`;

export const SecondaryButton = styled.button`
  background: white;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: 700;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  flex: 1;

  &:hover {
    background: #f0f7ff;
  }
`;