import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiPlus, FiMinus, FiCalendar } from 'react-icons/fi';
import NavBar from '../../components/NavBar';
import NutritionBars from './NutritionBars';
import FloatingNutriButton from './FloatingNutriButton';
import MealCard from './MealCard';
import AddAlimentoPopup from './AddAlimentoPopup';
import * as S from './styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../../hooks/useAuth';

const AlimentacaoPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [waterIntake, setWaterIntake] = useState(0);
  const [totalWaterGoal, setTotalWaterGoal] = useState(2500);
  const [editWaterGoal, setEditWaterGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(totalWaterGoal);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddFood, setShowAddFood] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [diarioAlimentar, setDiarioAlimentar] = useState(null);
  const [vinculoNutricional, setVinculoNutricional] = useState(null);
  const [planoNutricional, setPlanoNutricional] = useState(null);
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: 'Café da Manhã',
      tipo: 'café_da_manhã',
      items: []
    },
    {
      id: 2,
      name: 'Lanche da Manhã',
      tipo: 'lanche_manhã',
      items: []
    },
    {
      id: 3,
      name: 'Almoço',
      tipo: 'almoço',
      items: []
    },
    {
      id: 4,
      name: 'Lanche da Tarde',
      tipo: 'lanche_tarde',
      items: []
    },
    {
      id: 5,
      name: 'Jantar',
      tipo: 'jantar',
      items: []
    }
  ]);

  // Carregar dados do diário alimentar
  useEffect(() => {
    const loadDiarioAlimentar = async () => {
      if (!user?.id_usuario) return;

      try {
        setLoading(true);
        const dateString = currentDate.toISOString().split('T')[0];
        
        // Buscar diário alimentar do dia
        const diarioResponse = await fetch(`http://localhost:3001/api/alimentacao/diario/${user.id_usuario}?data=${dateString}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (diarioResponse.ok) {
          const diarioData = await diarioResponse.json();
          setDiarioAlimentar(diarioData);
          setWaterIntake(diarioData.agua_ml || 0);
          
          // Carregar refeições do diário
          if (diarioData.id_registro) {
            const refeicoesResponse = await fetch(`http://localhost:3001/api/alimentacao/refeicoes/${diarioData.id_registro}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });

            if (refeicoesResponse.ok) {
              const refeicoesData = await refeicoesResponse.json();
              
              // Organizar refeições por tipo
              const mealsWithItems = meals.map(meal => ({
                ...meal,
                items: refeicoesData
                  .filter(refeicao => refeicao.tipo_refeicao === meal.tipo)
                  .flatMap(refeicao => refeicao.alimentos || [])
              }));
              
              setMeals(mealsWithItems);
            }
          }
        } else {
          // Se não existe diário para o dia, criar um novo
          const newDiarioResponse = await fetch(`http://localhost:3001/api/alimentacao/diario`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              id_usuario: user.id_usuario,
              data: dateString,
              agua_ml: 0
            })
          });

          if (newDiarioResponse.ok) {
            const newDiario = await newDiarioResponse.json();
            setDiarioAlimentar(newDiario);
            setWaterIntake(0);
          }
        }

        // Buscar vínculo nutricional ativo
        const vinculoResponse = await fetch(`http://localhost:3001/api/vinculos/nutricionais?status=ativo&id_usuario=${user.id_usuario}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (vinculoResponse.ok) {
          const vinculoData = await vinculoResponse.json();
          if (vinculoData.length > 0) {
            setVinculoNutricional(vinculoData[0]);
            
            // Buscar plano nutricional ativo
            const planoResponse = await fetch(`http://localhost:3001/api/alimentacao/plano/${user.id_usuario}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });

            if (planoResponse.ok) {
              const planoData = await planoResponse.json();
              setPlanoNutricional(planoData);
              if (planoData.calorias_diarias) {
                setTotalWaterGoal(planoData.agua_diaria || 2500);
              }
            }
          }
        }

      } catch (err) {
        console.error('Erro ao carregar dados de alimentação:', err);
        setError('Erro ao carregar dados de alimentação');
      } finally {
        setLoading(false);
      }
    };

    loadDiarioAlimentar();
  }, [user, currentDate, meals]);

  // Calcular nutrição diária
  const dailyNutrition = {
    calories: meals.reduce((sum, meal) => sum + meal.items.reduce((s, item) => s + (item.calorias || 0), 0), 0),
    targetCalories: planoNutricional?.calorias_diarias || 2200,
    protein: meals.reduce((sum, meal) => sum + meal.items.reduce((s, item) => s + (item.proteinas || 0), 0), 0),
    targetProtein: planoNutricional?.proteinas_diarias || 150,
    carbs: meals.reduce((sum, meal) => sum + meal.items.reduce((s, item) => s + (item.carboidratos || 0), 0), 0),
    targetCarbs: planoNutricional?.carboidratos_diarias || 250,
    fat: meals.reduce((sum, meal) => sum + meal.items.reduce((s, item) => s + (item.gorduras || 0), 0), 0),
    targetFat: planoNutricional?.gorduras_diarias || 70
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

  const handleWaterChange = async (amount) => {
    const newWaterIntake = Math.max(0, Math.min(totalWaterGoal, waterIntake + amount));
    setWaterIntake(newWaterIntake);

    // Atualizar no backend
    if (diarioAlimentar?.id_registro) {
      try {
        await fetch(`http://localhost:3001/api/alimentacao/diario/${diarioAlimentar.id_registro}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            agua_ml: newWaterIntake
          })
        });
      } catch (err) {
        console.error('Erro ao atualizar consumo de água:', err);
      }
    }
  };

  const handleSaveWaterGoal = async () => {
    setTotalWaterGoal(newGoal);
    if (waterIntake > newGoal) setWaterIntake(newGoal);
    setEditWaterGoal(false);

    // Se há plano nutricional, atualizar no backend
    if (planoNutricional?.id_plano_nutricional) {
      try {
        await fetch(`http://localhost:3001/api/alimentacao/plano/${planoNutricional.id_plano_nutricional}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            agua_diaria: newGoal
          })
        });
      } catch (err) {
        console.error('Erro ao atualizar meta de água:', err);
      }
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleAddFood = (mealId) => {
    setCurrentMeal(mealId);
    setShowAddFood(true);
  };

  const handleSaveFood = async (newFood) => {
    try {
      const meal = meals.find(m => m.id === currentMeal);
      if (!meal || !diarioAlimentar?.id_registro) return;

      // Criar refeição se não existir
      let refeicaoId;
      const existingRefeicao = await fetch(`http://localhost:3001/api/alimentacao/refeicoes/${diarioAlimentar.id_registro}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (existingRefeicao.ok) {
        const refeicoes = await existingRefeicao.json();
        const refeicaoExistente = refeicoes.find(r => r.tipo_refeicao === meal.tipo);
        
        if (refeicaoExistente) {
          refeicaoId = refeicaoExistente.id_refeicao;
        } else {
          // Criar nova refeição
          const novaRefeicaoResponse = await fetch(`http://localhost:3001/api/alimentacao/refeicoes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              id_registro: diarioAlimentar.id_registro,
              tipo_refeicao: meal.tipo,
              horario: new Date().toTimeString().split(' ')[0]
            })
          });

          if (novaRefeicaoResponse.ok) {
            const novaRefeicao = await novaRefeicaoResponse.json();
            refeicaoId = novaRefeicao.id_refeicao;
          }
        }
      }

      // Adicionar alimento à refeição
      if (refeicaoId) {
        await fetch(`http://localhost:3001/api/alimentacao/alimento-refeicao`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            id_refeicao: refeicaoId,
            id_alimento: newFood.id_alimento,
            quantidade: newFood.quantidade,
            porcao: newFood.porcao
          })
        });

        // Atualizar estado local
        setMeals(prevMeals => prevMeals.map(meal => 
          meal.id === currentMeal 
            ? { ...meal, items: [...meal.items, newFood] } 
            : meal
        ));
      }

    } catch (err) {
      console.error('Erro ao adicionar alimento:', err);
    }

    setShowAddFood(false);
  };

  const handleRemoveFood = async (mealId, foodIndex) => {
    try {
      const meal = meals.find(m => m.id === mealId);
      const food = meal?.items[foodIndex];
      
      if (food?.id_alimento_refeicao) {
        await fetch(`http://localhost:3001/api/alimentacao/alimento-refeicao/${food.id_alimento_refeicao}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      // Atualizar estado local
      setMeals(prevMeals => prevMeals.map(meal => 
        meal.id === mealId 
          ? { ...meal, items: meal.items.filter((_, index) => index !== foodIndex) } 
          : meal
      ));

    } catch (err) {
      console.error('Erro ao remover alimento:', err);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar title="THORC FIT" showBack onBack={() => navigate('/home')} />
        <S.Container>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Carregando dados de alimentação...</p>
          </div>
        </S.Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar title="THORC FIT" showBack onBack={() => navigate('/home')} />
        <S.Container>
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Tentar novamente</button>
          </div>
        </S.Container>
      </>
    );
  }

  return (
    <>
      <NavBar title="THORC FIT" showBack onBack={() => navigate('/home')} />

      <S.Container>
        {/* Seletor de Data */}
        <S.DaySelector>
          <S.DayButton onClick={() => changeDate(-1)}>
            <FiChevronLeft size={20} />
          </S.DayButton>
          
          <FloatingNutriButton />

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
            <S.EditButton onClick={() => setEditWaterGoal(true)}>🚩Editar Meta</S.EditButton>
          </S.WaterHeader>

          {editWaterGoal && (
            <S.EditPopup>
              <p>
                📢 {vinculoNutricional ? 
                  <strong>Sua nutricionista</strong> : 
                  <strong>Sistema</strong>
                } recomenda o limite diário de água com base nos seus dados.
              </p>
              <label htmlFor="metaAgua">Nova meta (em ml):</label>
              <input
                type="number"
                id="metaAgua"
                value={newGoal}
                min={500}
                step={100}
                onChange={(e) => setNewGoal(parseInt(e.target.value))}
              />
              <div>
                <button onClick={handleSaveWaterGoal}>
                  Salvar
                </button>
                <button onClick={() => setEditWaterGoal(false)}>Cancelar</button>
              </div>
            </S.EditPopup>
          )}
          
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

        {/* Informação sobre vínculo nutricional */}
        {vinculoNutricional && (
          <S.NutritionistInfo>
            <p>📋 Acompanhado por: <strong>{vinculoNutricional.nutricionista?.nome}</strong></p>
            {planoNutricional && (
              <p>🎯 Plano: {planoNutricional.objetivo}</p>
            )}
          </S.NutritionistInfo>
        )}
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