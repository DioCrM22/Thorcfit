import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Page = styled.div`
  font-family: 'Golos Text', sans-serif;
  min-height: 100vh;
  padding-top: 70px;
  background-color: #f5f5f5;
  position: relative;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 16px;
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
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 16px;
  color: #0066cc;
  text-align: center;
  font-family: "Golos Text", sans-serif;
  animation: ${slideUp} 0.7s ease-in-out both;
`;

export const FloatingButtons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10;

  @media (max-width: 768px) {
    top: 15px;
    right: 10px;
  }
`;

export const AmigosButton = styled.button`
  background: #3a86ff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px; 
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px; 
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);

  &:hover {
    background: #2667cc;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const SolicitacoesButton = styled(AmigosButton)`
  background: #FF6B35;

  &:hover {
    background:rgb(201, 90, 26);
  }
`;