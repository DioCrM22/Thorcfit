import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiCheck, FiClock } from 'react-icons/fi';
import Confetti from 'react-confetti';
import * as S from './styles';
import NavBar from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';

const mockTreinos = [
  {
    id: 1,
    nome: 'Agachamento com Halteres',
    realizado: false,
    tempo: 30,
    repeticoes: 12,
    series: 3,
    descanso: 45,
    descricao: 'Deitado no banco, segure a barra com as mãos afastadas.',
    gif: '/assets/gif/Agachamento com halteres.gif',
    paused: false
  },
  {
    id: 2,
    nome: 'Esteira',
    realizado: false,
    tempo: 60,
    repeticoes: 1,
    series: 1,
    descanso: 30,
    descricao: 'Corrida moderada na esteira',
    gif: '/assets/gif/Esteira.gif',
    paused: false
  },
  { 
    id: 3,
    nome: 'Avanço(Afundo) com Halteres',
    realizado: false,
    tempo: 30,
    repeticoes: 12,
    series: 3,
    descanso: 45,
    descricao: 'Deitado no banco, segure a barra com as mãos afastadas.',
    gif: '/assets/gif/Avanço (Afundo) com halteres.gif',
    paused: false
  },
  {
    id: 4,
    nome: 'Elevação de Quadril com Pernas Flexionadas',
    realizado: false,
    tempo: 60,
    repeticoes: 1,
    series: 1,
    descanso: 30,
    descricao: 'Corrida moderada na esteira',
    gif: '/assets/gif/Elevação de Quadril com Pernas Flexionadas.gif',
    paused: false
  },
   {
    id: 5,
    nome: 'Flexão de Braço',
    realizado: false,
    tempo: 30,
    repeticoes: 12,
    series: 3,
    descanso: 45,
    descricao: 'Deitado no banco, segure a barra com as mãos afastadas.',
    gif: '/assets/gif/Flexão de Braço.gif',
    paused: false
  },
  {
    id: 6,
    nome: 'Marcha Estacionária',
    realizado: false,
    tempo: 60,
    repeticoes: 1,
    series: 1,
    descanso: 30,
    descricao: 'Corrida moderada na esteira',
    gif: '/assets/gif/Marcha Estacionária.gif',
    paused: false
  },
  { 
    id: 7,
    nome: 'Polichinelo',
    realizado: false,
    tempo: 30,
    repeticoes: 12,
    series: 3,
    descanso: 45,
    descricao: 'Deitado no banco, segure a barra com as mãos afastadas.',
    gif: '/assets/gif/Polichinelo.gif',
    paused: false
  },
  {
    id: 8,
    nome: 'Subida no Banco (Step-up)',
    realizado: false,
    tempo: 60,
    repeticoes: 1,
    series: 1,
    descanso: 30,
    descricao: 'Corrida moderada na esteira',
    gif: '/assets/gif/Subida no banco (Step-up).gif',
    paused: false
  }
];



export default function Treinos() {
  const [treinos, setTreinos] = useState(mockTreinos);
  const [selectedTreino, setSelectedTreino] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStage, setCurrentStage] = useState('exercise');
  const [currentRep, setCurrentRep] = useState(1);
  const [currentSerie, setCurrentSerie] = useState(1);
  const navigate = useNavigate();

  const handleFinishWorkout = useCallback(() => {
    if (currentSerie < selectedTreino?.series) {
      setCurrentSerie(currentSerie + 1);
      setCurrentRep(1);
      setShowRest(true);
      setCurrentStage('rest');
      setTimeLeft(selectedTreino?.descanso || 0);
      setTimerActive(true);
    } else {
      setShowRest(false);
      setShowCompletion(true);
      setShowConfetti(true);
      setTimerActive(false);
      setCurrentStage('completed');
      
      setTreinos(treinos.map(t => 
        t.id === selectedTreino.id ? {...t, realizado: true, paused: false} : t
      ));

      setTimeout(() => {
        setShowConfetti(false);
        setCurrentSerie(1);
        setCurrentRep(1);
      }, 3000);
    }
  }, [selectedTreino, treinos, currentSerie]);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      
      if (currentStage === 'exercise') {
        if (currentRep < selectedTreino?.repeticoes) {
          setCurrentRep(currentRep + 1);
          setTimeLeft(selectedTreino?.tempo || 0);
          setTimerActive(true);
        } else {
          setShowRest(true);
          setCurrentStage('rest');
          setTimeLeft(selectedTreino?.descanso || 0);
          setTimerActive(true);
        }
      } else if (currentStage === 'rest') {
        handleFinishWorkout();
      }
    }
    return () => clearTimeout(timer);
  }, [timerActive, timeLeft, currentStage, selectedTreino, currentRep, handleFinishWorkout]);

  useEffect(() => {
    if (showCompletion) {
      const timer = setTimeout(() => {
        setShowCompletion(false);
        setSelectedTreino(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCompletion]);

  const handleStartWorkout = (treino) => {
    setSelectedTreino(treino);
    setCurrentStage('exercise');
    setTimeLeft(treino.paused ? treino.tempo - treino.currentTime : treino.tempo);
    setTimerActive(true);
    setCurrentRep(1);
    setCurrentSerie(1);
    
    if (treino.paused) {
      setTreinos(treinos.map(t => 
        t.id === treino.id ? {...t, paused: false} : t
      ));
    }
  };

  const handlePauseWorkout = () => {
    setTimerActive(false);
    setTreinos(treinos.map(t => 
      t.id === selectedTreino.id ? {...t, paused: true, currentTime: selectedTreino.tempo - timeLeft} : t
    ));
    setSelectedTreino(null);
  };

  const handleDeleteWorkout = (id) => {
    setTreinos(treinos.filter(t => t.id !== id));
  };

  return (
    <S.Page>
      <NavBar 
        title="TREINOS FIT"
        showBack={true}
        showMenu={false}
        onBack={() => navigate('/ver-treinos')}
      />
      
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.5}
        />
      )}

      <S.Content>
        <S.TreinosList>
          {treinos.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <S.TreinoCard>
                <S.GifContainer>
                  <img 
                    src={item.gif} 
                    alt={item.nome}
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'contain',
                      backgroundColor: 'white'
                    }}
                  />
                  <S.TimeBadge>
                    <FiClock size={14} /> {item.tempo}s
                  </S.TimeBadge>
                  <S.RepInfo>
                    {item.repeticoes} rep x {item.series} séries
                  </S.RepInfo>
                </S.GifContainer>
                
                <S.TreinoInfo>
                  <h3>{item.nome}</h3>
                  <p>{item.descricao}</p>
                  
                  <S.ButtonGroup>
                    {item.realizado ? (
                      <S.FinishedButton>
                        <FiCheck /> Finalizado
                      </S.FinishedButton>
                    ) : (
                      <>
                        {item.paused ? (
                          <S.ContinueButton onClick={() => handleStartWorkout(item)}>
                            <FiPlay /> Continuar
                          </S.ContinueButton>
                        ) : (
                          <S.ExecuteButton onClick={() => handleStartWorkout(item)}>
                            <FiPlay /> Iniciar
                          </S.ExecuteButton>
                        )}
                        <S.DeleteButton onClick={() => handleDeleteWorkout(item.id)}>
                          ❌Excluir
                        </S.DeleteButton>
                      </>
                    )}
                  </S.ButtonGroup>
                </S.TreinoInfo>
              </S.TreinoCard>
            </motion.div>
          ))}
        </S.TreinosList>

        <AnimatePresence>
            {selectedTreino && (
              <S.FullScreenOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <S.FullScreenContent>
                  {showRest ? (
                    <S.RestContainer>
                      <S.RestTitle>DESCANSO - Série {currentSerie}/{selectedTreino.series}</S.RestTitle>
                      <S.RestTimer>{timeLeft}s</S.RestTimer>
                      <S.RestText>Aguarde {selectedTreino.descanso} segundos</S.RestText>
                    </S.RestContainer>
                  ) : (
                    <>
                      <S.GifContainer>
                        <img 
                          src={selectedTreino.gif} 
                          alt={selectedTreino.nome}
                          style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'contain',
                            backgroundColor: 'white'
                          }}
                        />
                        <S.Timer>{timeLeft}s</S.Timer>
                        <S.RepInfo>
                          Rep {currentRep}/{selectedTreino.repeticoes} - Série {currentSerie}/{selectedTreino.series}
                        </S.RepInfo>
                      </S.GifContainer>
                      
                      {/* Adicione esta seção para mostrar a descrição */}
                      <S.ExerciseDescription>
                        <h3>{selectedTreino.nome}</h3>
                        <p>{selectedTreino.descricao}</p>
                      </S.ExerciseDescription>
                      
                      <S.ControlGroup>
                        <S.StopButton onClick={handlePauseWorkout}>
                          <FiPause /> Parar
                        </S.StopButton>
                      </S.ControlGroup>
                    </>
                  )}
                </S.FullScreenContent>
              </S.FullScreenOverlay>
            )}
          </AnimatePresence>

        <AnimatePresence>
          {showCompletion && (
            <S.CompletionOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <S.CompletionContent>
                <S.LogoContainer>
                  <S.LogoGlow />
                  <S.CompletionLogo 
                    src="/assets/images/logo.png" 
                    alt="Logo"
                  />
                </S.LogoContainer>
                <S.CompletionText>Treino Finalizado!</S.CompletionText>
              </S.CompletionContent>
            </S.CompletionOverlay>
          )}
        </AnimatePresence>
      </S.Content>
    </S.Page>
  );
}