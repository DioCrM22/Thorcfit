// src/pages/Alimentacao/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiPlus, FiMinus, FiCalendar } from 'react-icons/fi';
import NavBar from '../../components/NavBar';
import NutritionBars from './NutritionBars';
import MealCard from './MealCard';
import AddAlimentoPopup from './AddAlimentoPopup';
import * as S from './styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AlimentacaoPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [waterIntake, setWaterIntake] = useState(1500);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddFood, setShowAddFood] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: 'Café da Manhã',
      items: []
    },
    {
      id: 2,
      name: 'Almoço',
      items: []
    },
    {
      id: 3,
      name: 'Jantar',
      items: []
    },
    {
      id: 4,
      name: 'Ceia',
      items: []
    }
  ]);

  const totalWaterGoal = 2500;

  const dailyNutrition = {
    calories: meals.reduce((sum, meal) => sum + meal.items.reduce((s, item) => s + item.calories, 0), 0),
    targetCalories: 2200,
    protein: meals.reduce((sum, meal) => sum + meal.items.reduce((s, item) => s + item.protein, 0), 0),
    carbs: meals.reduce((sum, meal) => sum + meal.items.reduce((s, item) => s + item.carbs, 0), 0),
    fat: meals.reduce((sum, meal) => sum + meal.items.reduce((s, item) => s + item.fat, 0), 0)
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' });
  };

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
    setShowCalendar(false);
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
    setShowCalendar(false);
  };

  const handleWaterChange = (amount) => {
    setWaterIntake(prev => Math.max(0, Math.min(totalWaterGoal, prev + amount)));
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleAddFood = (mealId) => {
    setCurrentMeal(mealId);
    setShowAddFood(true);
  };

  const handleSaveFood = (newFood) => {
    setMeals(prevMeals => prevMeals.map(meal => 
      meal.id === currentMeal 
        ? { ...meal, items: [...meal.items, newFood] } 
        : meal
    ));
    setShowAddFood(false);
  };

  const handleRemoveFood = (mealId, foodIndex) => {
    setMeals(prevMeals => prevMeals.map(meal => 
      meal.id === mealId 
        ? { ...meal, items: meal.items.filter((_, index) => index !== foodIndex) } 
        : meal
    ));
  };

  return (
    <>
      <NavBar title="ALIMENTAÇÃO FIT" showBack onBack={() => navigate('/home')} />

      <S.Container>
        {/* Seletor de Data */}
        <S.DaySelector>
          <S.DayButton onClick={() => changeDate(-1)}>
            <FiChevronLeft size={20} />
          </S.DayButton>

          <S.CurrentDayContainer>
            <S.CurrentDay>
              {currentDate.toDateString() === new Date().toDateString() ? '🎯 Hoje' : 
              currentDate.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString() ? '⏭️ Amanhã' : 
              formatDate(currentDate)}
              
              <S.CalendarButton onClick={toggleCalendar}>
                <FiCalendar size={18} />
              </S.CalendarButton>
              
              {showCalendar && (
                <S.CalendarPopup>
                  <Calendar 
                    onChange={handleDateChange}
                    value={currentDate}
                    locale="pt-BR"
                  />
                </S.CalendarPopup>
              )}
            </S.CurrentDay>
          </S.CurrentDayContainer>

          <S.DayButton onClick={() => changeDate(1)}>
            <FiChevronRight size={20} />
          </S.DayButton>
        </S.DaySelector>

        {/* Resumo Nutricional */}
        <NutritionBars nutrition={dailyNutrition} />

        {/* Hidratação */}
        <S.WaterTracker>
          <S.WaterHeader>
            <S.WaterTitle>💧 Hidratação Diária</S.WaterTitle>
          </S.WaterHeader>
          
          <S.WaterContent>
            <S.WaterGlassContainer>
              {/* Garrafa de consumo */}
              <S.WaterGlass>
                <S.WaterDrop top="10px" left="30%" />
                <S.WaterDrop top="20px" left="70%" />
                <S.GlassTop />
                <S.GlassBody>
                  <S.WaterFill percentage={(waterIntake / totalWaterGoal) * 100}>
                    <S.BottleCapacity inside percentage={(waterIntake / totalWaterGoal) * 100}>
                      {(waterIntake / 1000).toFixed(1)}L
                    </S.BottleCapacity>
                  </S.WaterFill>
                </S.GlassBody>
                <S.GlassBottom />
                <S.WaterLabel>Seu consumo</S.WaterLabel>
              </S.WaterGlass>
              
              {/* Garrafa de meta */}
              <S.WaterGlass>
                <S.WaterDrop top="10px" left="40%" />
                <S.WaterDrop top="25px" left="60%" />
                <S.GlassTop />
                <S.GlassBody>
                  <S.WaterFill percentage={100}>
                    <S.BottleCapacity inside percentage={100}>
                      {(totalWaterGoal / 1000).toFixed(1)}L
                    </S.BottleCapacity>
                  </S.WaterFill>
                </S.GlassBody>
                <S.GlassBottom />
                <S.WaterLabel>Meta diária</S.WaterLabel>
              </S.WaterGlass>
            </S.WaterGlassContainer>
            
            <S.WaterControls>
              <S.WaterButton 
                onClick={() => handleWaterChange(-250)}
                disabled={waterIntake <= 0}
                aria-label="Remover água"
              >
                <FiMinus />
              </S.WaterButton>
              
              <S.WaterAmountControl>
                <span>250ml</span>
              </S.WaterAmountControl>
              
              <S.WaterButton 
                onClick={() => handleWaterChange(250)}
                disabled={waterIntake >= totalWaterGoal}
                aria-label="Adicionar água"
              >
                <FiPlus />
              </S.WaterButton>
            </S.WaterControls>
          </S.WaterContent>
        </S.WaterTracker>

        {/* Refeições */}
        {meals.map(meal => (
          <MealCard 
            key={meal.id} 
            meal={meal} 
            onAddFood={() => handleAddFood(meal.id)}
            onRemoveFood={handleRemoveFood}
          />
        ))}
      </S.Container>

      {/* Popup para adicionar alimento */}
      <AddAlimentoPopup
        isOpen={showAddFood}
        onClose={() => setShowAddFood(false)}
        onSave={handleSaveFood}
        mealId={currentMeal}
      />
    </>
  );
};

export default AlimentacaoPage;