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
  // Calcular totais da refeição
  const mealTotals = meal.items.reduce((totals, item) => ({
    calories: totals.calories + (item.calorias || item.calories || 0),
    protein: totals.protein + (item.proteinas || item.protein || 0),
    carbs: totals.carbs + (item.carboidratos || item.carbs || 0),
    fat: totals.fat + (item.gorduras || item.fat || 0)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

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
          <>
            {meal.items.map((item, index) => (
              <FoodItem key={index}>
                <FoodHeader>
                  <span>{item.nome || item.name}</span>
                  <RemoveButton onClick={() => onRemoveFood(meal.id, index)}>
                    <FiTrash2 size={16} />
                  </RemoveButton>
                </FoodHeader>
                
                <NutritionInfo>
                  <span>{Math.round(item.calorias || item.calories || 0)} kcal</span>
                  {item.quantidade && item.porcao && (
                    <span>{item.quantidade} {item.porcao}</span>
                  )}
                </NutritionInfo>

                <NutritionInfo>
                  <span>P: {Math.round(item.proteinas || item.protein || 0)}g</span>
                  <span>C: {Math.round(item.carboidratos || item.carbs || 0)}g</span>
                  <span>G: {Math.round(item.gorduras || item.fat || 0)}g</span>
                </NutritionInfo>

                <BarContainer>
                  <Bar percentage={Math.min(((item.proteinas || item.protein || 0) / 40) * 100, 100)} type="protein" />
                  <Bar percentage={Math.min(((item.carboidratos || item.carbs || 0) / 60) * 100, 100)} type="carbs" />
                  <Bar percentage={Math.min(((item.gorduras || item.fat || 0) / 20) * 100, 100)} type="fat" />
                </BarContainer>
              </FoodItem>
            ))}
            
            {/* Resumo da refeição */}
            <FoodItem style={{ backgroundColor: '#f8f9fa', border: '2px solid #e9ecef' }}>
              <FoodHeader>
                <span><strong>Total da Refeição</strong></span>
              </FoodHeader>
              
              <NutritionInfo>
                <span><strong>{Math.round(mealTotals.calories)} kcal</strong></span>
              </NutritionInfo>

              <NutritionInfo>
                <span>P: {Math.round(mealTotals.protein)}g</span>
                <span>C: {Math.round(mealTotals.carbs)}g</span>
                <span>G: {Math.round(mealTotals.fat)}g</span>
              </NutritionInfo>
            </FoodItem>
          </>
        ) : (
          <EmptyMeal>Nenhum alimento registrado</EmptyMeal>
        )}
      </MealContent>
    </MealCardContainer>
  );
};

export default MealCard;

