import styled, { keyframes } from 'styled-components';
import { AZUL, LARANJA } from '../../Perfil/styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
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
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  animation: ${fadeIn} 0.3s ease-out;
  font-family: 'Golos Text', sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    color: ${LARANJA};
    font-family: 'Poppins', sans-serif;
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
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
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
`;

export const SecondaryButton = styled.button`
  background: white;
  border: 2px solid ${AZUL};
  color: ${AZUL};
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
