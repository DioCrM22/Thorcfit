// src/pages/Alimentacao/MealCard/index.js
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import {
  MealCardContainer,
  MealHeader,
  MealTitle,
  AddButton,
  MealContent,
  EmptyMeal,
  FoodItem,
  FoodHeader,
  RemoveButton
} from './styles';

import {
  NutritionInfo,
  BarContainer,
  Bar
} from '../NutritionBars/styles';

const MealCard = ({ meal, onAddFood, onRemoveFood }) => {
  return (
    <MealCardContainer>
      <MealHeader>
        <MealTitle>{meal.name}</MealTitle>
        <AddButton onClick={onAddFood}>
          <span>+</span> Adicionar
        </AddButton>
      </MealHeader>

      <MealContent>
        {meal.items.length > 0 ? (
          meal.items.map((item, index) => (
            <FoodItem key={index}>
              <FoodHeader>
                <span>{item.name}</span>
                <RemoveButton onClick={() => onRemoveFood(meal.id, index)}>
                  <FiTrash2 size={16} />
                </RemoveButton>
              </FoodHeader>
              
              <NutritionInfo>
                <span>{item.calories} kcal</span>
              </NutritionInfo>

              <NutritionInfo>
                <span>P: {item.protein}g</span>
                <span>C: {item.carbs}g</span>
                <span>G: {item.fat}g</span>
              </NutritionInfo>

              <BarContainer>
                <Bar percentage={(item.protein / 40) * 100} type="protein" />
                <Bar percentage={(item.carbs / 60) * 100} type="carbs" />
                <Bar percentage={(item.fat / 20) * 100} type="fat" />
              </BarContainer>
            </FoodItem>
          ))
        ) : (
          <EmptyMeal>Nenhum alimento registrado</EmptyMeal>
        )}
      </MealContent>
    </MealCardContainer>
  );
};

export default MealCard;
