import styled, { keyframes } from "styled-components";

const focusAnimation = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.05); }
`;

export const InputStyled = styled.div`
  position: relative;
  width: 100%;
  
  input {
    width: 100%;
    /* Se houver emoji, aumenta o padding à esquerda para dar espaço */
    padding: 5px 50px 5px ${props => props.$showEmoji ? '35px' : '5px'};
    font-family: "Golos Text", sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    border: none;
    border-bottom: 2px solid #444;
    outline: none;
    background: white;
    transition: all 0.3s ease;

    &:focus {
      border-color: white;
      animation: ${focusAnimation} 0.2s forwards;
    }
  }

  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 22px;
    color: black;
  }

  .emoji {
    position: absolute;
    left: 3px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    opacity: ${props => props.$showEmoji ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;
