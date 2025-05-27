// src/pages/Alimentacao/MealCard/styles.js
import styled from 'styled-components';
import { LARANJA } from '../../PerfilUsuario/styles';

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
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f7ff;
  }
`;

export const MealContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const EmptyMeal = styled.div`
  text-align: center;
  padding: 1rem;
  color: #6c757d;
  font-style: italic;
`;

export const FoodItem = styled.div`
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const FoodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  span {
    font-weight: 600;
    color: #333;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(220, 53, 69, 0.1);
  }
`;
