import styled, { keyframes } from "styled-components";

/* ============ ANIMAÇÕES ============ */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const colorChange = keyframes`
  0% { color: rgb(42, 94, 236); transform: scale(1); }
  80% { color: rgb(42, 94, 236); transform: scale(1.2); }
  100% { color: #ff7f00; transform: scale(1); text-transform: uppercase; }
`;

const popupFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popupContentSlide = keyframes`
  from { transform: translateY(30px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
`;

/* ============ LAYOUT PRINCIPAL ============ */
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

/* ============ CABEÇALHO ============ */
export const LogoIcon = styled.div`
  text-align: center;
  margin-bottom: 10px;
  
  img {
    max-width: 200px;
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
  display: inline-block;
  animation: ${colorChange} 1.5s ease-in-out 2s 1 forwards;
  
  @media (max-width: 500px) {
    animation: ${colorChange} 1s ease-in-out 2s 1 forwards;
  }
`;

/* ============ FORMULÁRIO ============ */
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

/* ============ RODAPÉ ============ */
export const FooterText = styled.p`
  text-align: center;
  font-size: 20px;
  color: black;
  font-weight: bold;
  
  a {
    color: rgb(42, 94, 236);
    font-weight: bold;
    text-decoration: none;
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

/* ============ POPUP DE SUCESSO ============ */
export const SuccessPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${popupFadeIn} 0.3s ease-out;
`;

export const SuccessPopupContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: ${popupContentSlide} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
`;

export const SuccessPopupLogo = styled.div`
  margin-bottom: 20px;
  
  img {
    max-width: 150px;
    height: auto;
  }
`;

export const SuccessPopupTitle = styled.h3`
  font-size: 1.5rem;
  color: #2a5eec;
  margin-bottom: 15px;
  font-weight: 600;
`;