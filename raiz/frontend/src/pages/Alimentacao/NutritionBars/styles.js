import styled from 'styled-components';
import { AZUL, LARANJA, VERDE } from '../../Perfil/styles';

export const NutritionSummary = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const SummaryTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  color: ${LARANJA};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '📊';
    font-size: 1.2rem;
  }
`;

export const NutritionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
`;

export const BarContainer = styled.div`
  height: 8px;
  background: #f0f2f5;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const Bar = styled.div`
  height: 100%;
  background: ${props => {
    if (props.type === 'protein') return AZUL;
    if (props.type === 'carbs')   return LARANJA;
    if (props.type === 'fat')     return VERDE;
    return '#ccc';
  }};
  width: ${props => props.percentage}%;
  border-radius: 4px;
  transition: width 0.3s ease;
`;
