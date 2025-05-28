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
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const FormBox = styled.div`
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
  max-width: 430px;
  animation: ${slideIn} 0.5s ease;
  box-shadow: 4px 8px rgba(0,0,0,0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  @media (max-width: 768px) {
    padding: 20px;
    gap: 10px;
    margin: 10px;
  }
  
  @media (max-width: 430px) {
    padding: 15px;
    gap: 8px;
  }
`;

export const LogoIcon = styled.div`
  text-align: center;
  margin-bottom: 10px;
  img {
    max-width: 200px;
    height: auto;
    
    @media (max-width: 768px) {
      max-width: 180px;
    }
    
    @media (max-width: 480px) {
      max-width: 150px;
    }
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
  font-size: 1.9rem;
  font-weight: 600;
  color: rgb(42, 94, 236);
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
  letter-spacing: 1.5px;
  
  @media (max-width: 768px) {
    font-size: 1.7rem;
    letter-spacing: 1px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 8px;
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
  background-color: #ffd4d4;
  color: #c00;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  text-align: center;
`;

export const InfoMessage = styled.div`
  background-color: #d4ffd4;
  color: #008000;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  text-align: center;
`;

export const FooterText = styled.p`
  text-align: center;
  padding: 5px;
  font-size: 18px;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
  
  a {
    color: rgb(42, 94, 236);
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
  }
`;

export const PasswordRules = styled.div`
  margin-top: 12px;
  font-size: 14px;
`;

export const ValidationItem = styled.div`
  color: ${props => props.$valid ? 'green' : 'red'};
  font-weight: bold;
  margin-bottom: 5px;
`;

export const StrengthMessage = styled.div`
  margin-top: 10px;
  color: ${props => props.$strength === 'strong' ? 'green' : 'red'};
  font-weight: bold;
`;

export const MessageBox = styled.div`
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  color: ${props => props.type === 'error' ? '#c00' : 'green'};
  background: ${props => props.type === 'error' ? '#ffe0e0' : '#e0ffe0'};
  font-weight: bold;
  text-align: center;
`;

