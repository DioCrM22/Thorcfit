// src/pages/Alimentacao/styles.js
import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';
import { AZUL, LARANJA } from '../PerfilUsuario/styles';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const bubble = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 0.8; }
  50% { transform: translateY(5px) scale(1.05); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 0.8; }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const dropFall = keyframes`
  0% { transform: rotate(-45deg) translateY(0) translateX(-50%); opacity: 0; }
  20% { opacity: 0.8; }
  100% { transform: rotate(-45deg) translateY(20px) translateX(-50%); opacity: 0; }
`;

export const Container = styled.div`
  padding: 1rem;
  max-width: 500px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
  margin-top: 60px;
  font-family: "Golos Text", sans-serif;
  

  @media (max-width: 480px) {
    margin-top: 56px;
    padding: 0.8rem;
  }
`;

export const DaySelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.8rem 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  position: relative;
`;

export const DayButton = styled.button`
  background: ${AZUL};
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1;

  &:hover {
    background: ${darken(0.1, AZUL)};
    transform: scale(1.1);
    animation: ${pulse} 0.5s ease;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

export const CurrentDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Golos Text", sans-serif;
  align-items: center;
  position: relative;
  flex-grow: 1;
  margin: 0 10px;
`;

export const CurrentDay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.7);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: center;
  min-width: 200px;
  justify-content: center;
  font-family: "Golos Text", sans-serif;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
    min-width: auto;
  }
`;

export const CalendarButton = styled.button`
  background: none;
  border: none;
  color: ${AZUL};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s ease;
  margin-left: 0.5rem;

  &:hover {
    background: #f0f7ff;
    transform: scale(1.1);
  }
`;

export const CalendarPopup = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  z-index: 10;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  padding: 1rem;
  animation: ${slideDown} 0.3s ease-out;
  width: 280px;
  font-family: "Golos Text", sans-serif;

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

export const WaterTracker = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid #e0e0e0;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${AZUL}, ${darken(0.1, AZUL)});
  }
`;

export const WaterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const WaterTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: ${AZUL};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: "Golos Text", sans-serif;
  
  background: linear-gradient(45deg, ${AZUL}, ${darken(0.1, AZUL)});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const WaterAmount = styled.div`
  font-weight: 700;
  color: ${LARANJA};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);

  span {
    font-size: 1.2rem;
  }
`;

export const WaterContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WaterGlassContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  gap: 1rem;
  margin: 1.rem 0;
`;

export const WaterGlass = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 200px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const GlassTop = styled.div`
  width: 110px;
  height: 15px;
  background: linear-gradient(to right, #f0f0f0,rgb(161, 160, 160));
  border-radius: 5px 5px 0 0;
  position: relative;
  z-index: 1;
  
  /* Detalhe do gargalo */
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 10px;
    background: inherit;
    border-radius: 5px 5px 0 0;
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 20px;
    
    &::after {
      width: 30px;
      height: 8px;
    }
  }
`;


export const GlassBody = styled.div`
  width: 110px;
  height: 190px;
  background: rgba(230, 242, 255, 0.5);
  border: 5px solid #e0e0e0;
  border-radius: 20px 20px 60px 60px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.1);
  
  /* Efeito 3D no vidro */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px 15px 55px 55px;
    box-shadow: inset 5px 5px 10px rgba(255,255,255,0.5),
                inset -5px -5px 10px rgba(0,0,0,0.1);
    pointer-events: none;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 160px;
    border-radius: 15px 15px 10px 10px;
    
    &::before {
      border-radius: 10px 10px 5px 5px;
    }
  }
`;

export const GlassBottom = styled.div`
  width: 110px;
  height: 5px;
  background: linear-gradient(to right, #e0e0e0, #f0f0f0);
  border-radius: 0 0 30px 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    width: 70px;
    height: 5px;
    border-radius: 0 0 40px 40px;
  }
`;

export const WaterFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => props.percentage}%;
  background: linear-gradient(to top, ${AZUL}, #3a86ff);
  transition: height 0.7s cubic-bezier(0.65, 0, 0.35, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  animation: ${bubble} 2s infinite ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.3) 100%
    );
     animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(-50%); }
    50% { transform: translateY(-5px) translateX(-50%); }
  }
`;

export const WaterLabel = styled.span`
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.1rem;

  &::before {
    content: '${props => props.children.includes('Meta') ? '🎯' : '🥤'}';
  }
`;

export const WaterControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: #f5f9ff;
  padding: 1rem;
  border-radius: 12px;
`;

export const WaterDrop = styled.div`
  position: absolute;
  top: ${props => props.top || '-10px'};
  left: ${props => props.left || '50%'};
  width: 12px;
  height: 12px;
  background: ${AZUL};
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg) translateX(-50%);
  opacity: 0.8;
  animation: ${dropFall} 2s infinite ease-in;
  animation-delay: ${props => props.delay || '0s'};

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    right: -5px;
    width: 6px;
    height: 6px;
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
  }

  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }
`;

export const BottleCapacity = styled.div`
  position: absolute;
  top: ${props => props.inside ? '50%' : '-25px'};
  left: 50%;
  transform: translateX(-50%) ${props => props.inside ? 'translateY(-50%)' : 'none'};
  background: ${props => props.inside ? `rgba(255,255,255,${props.percentage === 100 ? '0.9' : '0.7'})` : 'white'};
  padding: 0.3rem 0.5rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: bold;
  color: ${props => props.percentage === 100 ? AZUL : (props.percentage > 50 ? 'white' : AZUL)};
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 2;
  white-space: nowrap;
  text-shadow: ${props => props.percentage === 100 ? 'none' : (props.percentage > 50 ? '0 1px 3px rgba(0,0,0,0.3)' : 'none')};

  &::before {
    content: '💧';
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
    ${props => props.inside && 'top: 40%;'}
  }
`;

export const WaterButton = styled.button`
  background: ${AZUL};
  color: white;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);

  &:hover {
    background: ${props => props.disabled ? '#ccc' : darken(0.1, AZUL)};
    transform: ${props => props.disabled ? 'none' : 'scale(1.1)'};
    animation: ${props => !props.disabled && css`${pulse} 0.5s ease`};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

export const WaterAmountControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  gap: 0.2rem;

  span {
    font-weight: bold;
    color: ${AZUL};
  }

  small {
    font-size: 0.7rem;
    opacity: 0.8;
  }
`;