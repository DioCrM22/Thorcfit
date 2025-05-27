import styled, { keyframes } from 'styled-components';

export const AZUL = '#0066cc';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 1rem;

  @media (max-width: 480px) {
    align-items: flex-start;
    padding-top: 2rem;
  }
`;

export const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  animation: ${fadeIn} 0.4s ease;
  font-family: 'Golos Text', sans-serif;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);

  @media (max-width: 480px) {
    padding: 1.2rem;
    border-radius: 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.4rem;
    font-weight: bold;
    color: #ff6b35;
    text-transform: uppercase;

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }
`;

export const CloseButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #3a86ff;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  color: #444;
`;

export const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

export const Select = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

export const AddButton = styled.button`
  background: ${AZUL};
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: #2a75f5;
    transform: translateY(-2px);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    margin-top: 1.2rem;
  }
`;

export const PrimaryButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: #3a86ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #2a75f5;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

export const SecondaryButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: white;
  color: #3a86ff;
  font-weight: bold;
  border: 2px solid #3a86ff;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #f0f8ff;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

export const AlimentoLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    max-height: 140px;
  }
`;

export const AlimentoItem = styled.div`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid ${AZUL};

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.6rem;
  }
`;

export const Resumo = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
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
    padding: 0.5rem;
    background: white;
    border-radius: 4px;
  }
`;
