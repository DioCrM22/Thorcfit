import React from 'react';
import {
  NutritionSummary,
  SummaryTitle,
  NutritionInfo,
  BarContainer,
  Bar
} from './styles';

const NutritionBars = ({ nutrition }) => (
  <NutritionSummary>
    <SummaryTitle>Resumo Nutricional</SummaryTitle>

    <NutritionInfo>
      <span>Calorias</span>
      <span>
        {nutrition.calories} / {nutrition.targetCalories} kcal
      </span>
    </NutritionInfo>
    <BarContainer>
      <Bar percentage={(nutrition.calories / nutrition.targetCalories) * 100} />
    </BarContainer>

    <NutritionInfo>
      <span>Proteínas</span>
      <span>{nutrition.protein}g</span>
    </NutritionInfo>
    <BarContainer>
      <Bar percentage={(nutrition.protein / 150) * 100} type="protein" />
    </BarContainer>

    <NutritionInfo>
      <span>Carboidratos</span>
      <span>{nutrition.carbs}g</span>
    </NutritionInfo>
    <BarContainer>
      <Bar percentage={(nutrition.carbs / 250) * 100} type="carbs" />
    </BarContainer>

    <NutritionInfo>
      <span>Gorduras</span>
      <span>{nutrition.fat}g</span>
    </NutritionInfo>
    <BarContainer>
      <Bar percentage={(nutrition.fat / 70) * 100} type="fat" />
    </BarContainer>
  </NutritionSummary>
);

export default NutritionBars;
