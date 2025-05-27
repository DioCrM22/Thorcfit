import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  min-height: 100vh;
  /* Utilizando o mesmo background do signup para consistência */
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

export const OrangeLink = styled(Link)`
  color: #ff7f00;
  font-weight: 700;
  text-decoration: none;
  margin-bottom: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    text-shadow: 0 2px 4px rgba(255, 127, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const DefaultLink = styled(Link)`
  color: #2a5eec;
  text-decoration: none;
  font-weight: 700;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const LinkText = styled.div`
  text-align: center;
  font-size: 18px;
  color: black;
  line-height: 1.5rem;
  font-weight: 700;
  
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 20px;
  
  img {
    width: 50px;
    height: 50px;
    transition: transform 0.3s ease;
  }

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 2px solid #ccc;
  }
  
  &::before {
    margin-right: 10px;
  }
  
  &::after {
    margin-left: 10px;
  }
  
  span {
    font-size: 30px;
    color: #ccc;
  }
`;

const hoverAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const InstagramButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:rgb(238, 235, 233);
  border: none;
  padding: 16px 30px;
  border-radius: 10px;
  font-family: "Golos Text", sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  width: 100%;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    animation: ${hoverAnimation} 0.5s ease;
  }

  &:active {
    transform: scale(0.98);
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

export const FooterText = styled.span`
  font-size: 18px;
  color: black;
  font-weight: bold;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  background: #ffd4d4;
  color: #c00;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
`;


