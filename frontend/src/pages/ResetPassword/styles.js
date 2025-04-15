import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #004080, #0066cc);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const FormBox = styled.div`
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
  max-width: 430px;
  animation: ${slideIn} 0.5s ease;
  box-shadow: 4px 8px rgba(0,0,0,0.2);
  
  display: flex;
  flex-direction: column;

  @media (max-width: 430px) {
    padding: 20px 30px 15px 30px;
    gap: 9px;
  }
`;

export const LogoIcon = styled.div`
  text-align: center;
  margin-bottom: 10px;
  img {
    max-width: 200px;
  }
`;

const colorChange = keyframes`
  0% {
    color: rgb(42, 94, 236);
    transform: scale(1);
  }
  80% {
    color: rgb(42, 94, 236);
    transform: scale(1.2);
  }
  100% {
    color: #ff7f00;
    transform: scale(1);
    text-transform: uppercase;
  }
`;

export const Title = styled.h2`
  font-family: "Golos Text", sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(42, 94, 236);
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
  letter-spacing: 1.5px;
  
  // Estilos de hover no container principal
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  @media (max-width: 500px) {
    font-size: 1.3rem;
  }
`;

export const AnimatedSpan = styled.span`
  display: inline-block; /* Necessário para as transformações */
  animation: ${colorChange} 1.5s ease-in-out 2s 1 forwards;
  
  @media (max-width: 500px) {
    animation: ${colorChange} 1s ease-in-out 2s 1 forwards;
  }
`;

export const FooterText = styled.span`
  font-size: 18px;
  color: black;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  

  a {
    color: #2a5eec;
    text-decoration: none;
    font-weight: bold;
  } 
`;

export const MessageBox = styled.div`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  justify-content: start;
  word-break: break-word;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;

  &.success {
    background-color: #eafaf1;
    color: #2ecc71;
    border: 1px solid #b7e5cd;
  }

  &.error {
    background-color: #fdecea;
    color: #e74c3c;
    border: 1px solid #f5c6cb;
  }

  &::before {
    content: 'ℹ️';
    margin-right: 10px;
    font-size: 16px;
  }

  &.success::before {
    content: '✅';
  }

  &.error::before {
    content: '❌';
  }
`;

