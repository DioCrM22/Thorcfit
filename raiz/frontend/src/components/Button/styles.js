import styled, { keyframes } from "styled-components";

const hoverAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
`;

export const Btn = styled.button`
  background-color: #ff7f00;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 16px 30px;
  margin: 15px 0 10px;
  font-family: "Golos Text", sans-serif;
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #ff6a00;
    animation: ${hoverAnimation} 0.5s ease;
    box-shadow: 0 4px 15px rgba(202, 92, 18, 0.86);
    
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    font-size: 20px;
    padding: 14px 25px;
  }
`;