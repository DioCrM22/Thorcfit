// src/pages/Alimentacao/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiPlus, FiMinus, FiCalendar } from 'react-icons/fi';
import NavBar from '../../components/NavBar';
import NutritionBars from './NutritionBars';
import MealCard from './MealCard';
import * as S from './styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AlimentacaoPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [waterIntake, setWaterIntake] = useState(1500);
  const [showCalendar, setShowCalendar] = useState(false);
  const totalWaterGoal = 2500;

  // Sample nutrition data
  const dailyNutrition = {
    calories: 1850,
    targetCalories: 2200,
    protein: 120,
    carbs: 210,
    fat: 65
  };

  const meals = [
    {
      id: 1,
      name: 'Café da Manhã',
      items: [
        { name: 'Omelete', calories: 350, protein: 25, carbs: 2, fat: 28 },
        { name: 'Pão Integral', calories: 160, protein: 8, carbs: 30, fat: 2 }
      ]
    },
    {
      id: 2,
      name: 'Almoço',
      items: [
        { name: 'Arroz Integral', calories: 200, protein: 4, carbs: 44, fat: 1.5 },
        { name: 'Frango Grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: 'Salada', calories: 50, protein: 2, carbs: 8, fat: 0 }
      ]
    },
    {
      id: 3,
      name: 'Jantar',
      items: [
        { name: 'Salmão', calories: 280, protein: 34, carbs: 0, fat: 15 },
        { name: 'Brócolis', calories: 55, protein: 5, carbs: 11, fat: 0.6 }
      ]
    },
    {
      id: 4,
      name: 'Ceia',
      items: []
    }
  ];

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
    setWaterIntake(prev => {
      const newValue = Math.max(0, Math.min(totalWaterGoal, prev + amount));
      return newValue;
    });
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
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
          <MealCard key={meal.id} meal={meal} />
        ))}
      </S.Container>
    </>
  );
};

export default AlimentacaoPage;