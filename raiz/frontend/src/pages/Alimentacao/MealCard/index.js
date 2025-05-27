// src/pages/Alimentacao/MealCard/index.js
import React from 'react';
<<<<<<< HEAD
=======
import { FiTrash2 } from 'react-icons/fi';
>>>>>>> diogo
import {
  MealCardContainer,
  MealHeader,
  MealTitle,
  AddButton,
  MealContent,
<<<<<<< HEAD
  EmptyMeal
=======
  EmptyMeal,
  FoodItem,
  FoodHeader,
  RemoveButton
>>>>>>> diogo
} from './styles';

import {
  NutritionInfo,
  BarContainer,
  Bar
} from '../NutritionBars/styles';

<<<<<<< HEAD
const MealCard = ({ meal }) => {
=======
const MealCard = ({ meal, onAddFood, onRemoveFood }) => {
>>>>>>> diogo
  return (
    <MealCardContainer>
      <MealHeader>
        <MealTitle>{meal.name}</MealTitle>
<<<<<<< HEAD
        <AddButton>
=======
        <AddButton onClick={onAddFood}>
>>>>>>> diogo
          <span>+</span> Adicionar
        </AddButton>
      </MealHeader>

      <MealContent>
        {meal.items.length > 0 ? (
          meal.items.map((item, index) => (
<<<<<<< HEAD
            <div key={index}>
              {/* Nome do alimento e calorias */}
              <NutritionInfo>
                <span>{item.name}</span>
                <span>{item.calories} kcal</span>
              </NutritionInfo>

              {/* Macro nutrientes */}
=======
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

>>>>>>> diogo
              <NutritionInfo>
                <span>P: {item.protein}g</span>
                <span>C: {item.carbs}g</span>
                <span>G: {item.fat}g</span>
              </NutritionInfo>

<<<<<<< HEAD
              {/* Barras de progresso para cada macro */}
=======
>>>>>>> diogo
              <BarContainer>
                <Bar percentage={(item.protein / 40) * 100} type="protein" />
                <Bar percentage={(item.carbs / 60) * 100} type="carbs" />
                <Bar percentage={(item.fat / 20) * 100} type="fat" />
              </BarContainer>
<<<<<<< HEAD
            </div>
=======
            </FoodItem>
>>>>>>> diogo
          ))
        ) : (
          <EmptyMeal>Nenhum alimento registrado</EmptyMeal>
        )}
      </MealContent>
    </MealCardContainer>
  );
};

<<<<<<< HEAD
export default MealCard;
=======
export default MealCard;
>>>>>>> diogo
