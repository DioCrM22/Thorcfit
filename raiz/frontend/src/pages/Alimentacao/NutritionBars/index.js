import React from 'react';
import {
  NutritionSummary,
  SummaryTitle,
  NutritionInfo,
  BarContainer,
  Bar
} from './styles';

const NutritionBars = ({ nutrition }) => {
  // Garantir que os valores sejam números válidos
  const safeNutrition = {
    calories: Math.round(nutrition.calories || 0),
    targetCalories: nutrition.targetCalories || 2200,
    protein: Math.round(nutrition.protein || 0),
    targetProtein: nutrition.targetProtein || 150,
    carbs: Math.round(nutrition.carbs || 0),
    targetCarbs: nutrition.targetCarbs || 250,
    fat: Math.round(nutrition.fat || 0),
    targetFat: nutrition.targetFat || 70
  };

  // Calcular percentuais
  const caloriesPercentage = Math.min((safeNutrition.calories / safeNutrition.targetCalories) * 100, 100);
  const proteinPercentage = Math.min((safeNutrition.protein / safeNutrition.targetProtein) * 100, 100);
  const carbsPercentage = Math.min((safeNutrition.carbs / safeNutrition.targetCarbs) * 100, 100);
  const fatPercentage = Math.min((safeNutrition.fat / safeNutrition.targetFat) * 100, 100);

  return (
    <NutritionSummary>
      <SummaryTitle>Resumo Nutricional</SummaryTitle>

      <NutritionInfo>
        <span>Calorias</span>
        <span>
          {safeNutrition.calories} / {safeNutrition.targetCalories} kcal ({Math.round(caloriesPercentage)}%)
        </span>
      </NutritionInfo>
      <BarContainer>
        <Bar percentage={caloriesPercentage} />
      </BarContainer>

      <NutritionInfo>
        <span>Proteínas</span>
        <span>
          {safeNutrition.protein} / {safeNutrition.targetProtein}g ({Math.round(proteinPercentage)}%)
        </span>
      </NutritionInfo>
      <BarContainer>
        <Bar percentage={proteinPercentage} type="protein" />
      </BarContainer>

      <NutritionInfo>
        <span>Carboidratos</span>
        <span>
          {safeNutrition.carbs} / {safeNutrition.targetCarbs}g ({Math.round(carbsPercentage)}%)
        </span>
      </NutritionInfo>
      <BarContainer>
        <Bar percentage={carbsPercentage} type="carbs" />
      </BarContainer>

      <NutritionInfo>
        <span>Gorduras</span>
        <span>
          {safeNutrition.fat} / {safeNutrition.targetFat}g ({Math.round(fatPercentage)}%)
        </span>
      </NutritionInfo>
      <BarContainer>
        <Bar percentage={fatPercentage} type="fat" />
      </BarContainer>

      {/* Indicador de progresso geral */}
      <NutritionInfo style={{ marginTop: '1rem', fontWeight: 'bold' }}>
        <span>Progresso Geral</span>
        <span>{Math.round((caloriesPercentage + proteinPercentage + carbsPercentage + fatPercentage) / 4)}%</span>
      </NutritionInfo>
    </NutritionSummary>
  );
};

export default NutritionBars;