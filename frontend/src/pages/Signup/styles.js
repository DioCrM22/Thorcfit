import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
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
  background: #fff;
  padding: 32px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 430px;
  animation: ${fadeIn} 0.5s ease;
  @media (max-width: 430px) {
    padding: 20px;
    max-width: 95%;
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
    transform: scale(1.03);
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

export const ErrorMessage = styled.div`
  background: #ffd4d4;
  color: #c00;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
`;

export const FooterText = styled.p`
  text-align: center;
  font-size: 20px;
  color: black;
  font-weight: bold;
  a {
    color:rgb(42, 94, 236);
    font-weight: bold;
    text-decoration: none;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 12px;
  transition: transform 0.2s;
  &:focus-within {
    transform: scale(1.05);
  }
`;

export const PasswordRules = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

export const ValidationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 2px 20px;
  font-weight: bold;
  color: ${(props) => (props.$valid ? "#2ecc71" : "#e74c3c")};
`;
