// src/pages/Alimentacao/MealCard/styles.js
import styled from 'styled-components';
import { LARANJA } from '../../Perfil/styles';

export const MealCardContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const MealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const MealTitle = styled.h3`
  margin: 0;
  color: ${LARANJA};
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '🍽️';
    font-size: 1.1rem;
  }
`;

export const AddButton = styled.button`
  background: none;
  border: none;
  color: #3a86ff;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
`;

export const MealContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyMeal = styled.div`
  text-align: center;
  padding: 1rem;
  color: #6c757d;
  font-style: italic;
`;
