import styled, { keyframes } from 'styled-components';
import { AZUL, LARANJA, VERDE } from '../../PerfilUsuario/styles';

// Animações
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

export const Modal = styled.div`
  background: white;
  border-radius: 16px;
  width: clamp(320px, 95vw, 420px);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;

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
`;

export const Header = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${LARANJA};
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '🍎';
      animation: ${bounce} 1.5s infinite;
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.8rem;
  color: ${AZUL};
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 50%;
  line-height: 1;

  &:hover {
    background: rgba(58, 134, 255, 0.1);
    transform: rotate(90deg);
  }
`;

// Conteúdo
export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

// Formulário
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
  color: #444;
  font-weight: 700;

  &::before {
    content: '${props => {
      switch(props.htmlFor) {
        case 'nome': return '📝';
        case 'calorias': return '🔥';
        case 'proteinas': return '💪';
        case 'carboidratos': return '🍞';
        case 'gorduras': return '🥑';
        case 'porcao_padrao': return '⚖️';
        default: return '•';
      }
    }}';
    font-size: 1.1rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  background: #fafafa;
  transition: all 0.2s;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    box-shadow: 0 0 0 4px rgba(58, 134, 255, 0.2);
    background: white;
  }
`;

export const Unit = styled.span`
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: #666;
`;

// Botões menores e otimizados
export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  background: ${VERDE};
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  flex: 1;
  min-width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    background: ${AZUL};
    transform: translateY(-2px);
  }

  &::before {
    content: '💾';
  }
`;

export const SecondaryButton = styled.button`
  background: white;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  flex: 1;
  min-width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    background: rgba(58, 134, 255, 0.05);
    transform: translateY(-2px);
  }

  &::before {
    content: '✖';
  }
`;

// Decoração
export const Bubble = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(58, 134, 255, 0.08);
  z-index: -1;
  opacity: 0.7;

  &:nth-child(1) {
    width: 60px;
    height: 60px;
    top: -15px;
    right: -15px;
    animation: ${float} 6s ease-in-out infinite;
  }

  &:nth-child(2) {
    width: 80px;
    height: 80px;
    bottom: -20px;
    left: -20px;
    animation: ${float} 8s ease-in-out infinite reverse;
  }
`;
