// src/pages/Alimentacao/MealCard/index.js
import React from 'react';
import {
  MealCardContainer,
  MealHeader,
  MealTitle,
  AddButton,
  MealContent,
  EmptyMeal
} from './styles';

import {
  NutritionInfo,
  BarContainer,
  Bar
} from '../NutritionBars/styles';

const MealCard = ({ meal }) => {
  return (
    <MealCardContainer>
      <MealHeader>
        <MealTitle>{meal.name}</MealTitle>
        <AddButton>
          <span>+</span> Adicionar
        </AddButton>
      </MealHeader>

      <MealContent>
        {meal.items.length > 0 ? (
          meal.items.map((item, index) => (
            <div key={index}>
              {/* Nome do alimento e calorias */}
              <NutritionInfo>
                <span>{item.name}</span>
                <span>{item.calories} kcal</span>
              </NutritionInfo>

              {/* Macro nutrientes */}
              <NutritionInfo>
                <span>P: {item.protein}g</span>
                <span>C: {item.carbs}g</span>
                <span>G: {item.fat}g</span>
              </NutritionInfo>

              {/* Barras de progresso para cada macro */}
              <BarContainer>
                <Bar percentage={(item.protein / 40) * 100} type="protein" />
                <Bar percentage={(item.carbs / 60) * 100} type="carbs" />
                <Bar percentage={(item.fat / 20) * 100} type="fat" />
              </BarContainer>
            </div>
          ))
        ) : (
          <EmptyMeal>Nenhum alimento registrado</EmptyMeal>
        )}
      </MealContent>
    </MealCardContainer>
  );
};

export default MealCard;
