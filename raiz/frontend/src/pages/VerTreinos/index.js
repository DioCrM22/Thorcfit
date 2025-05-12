import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiPlus, FiClock, FiUser, FiCheck, FiMail, FiPhone, FiTrash2 } from 'react-icons/fi';
import NavBar from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import TreinadorSwitch from './TreinadorSwitch';
import MeusTreinosButton from './MeusTreinosButton';

const mockTreinosPessoais = [
  {
    id: 100,
    nome: "Treino de Peito",
    data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pendente",
    tipo: "pessoal",
    exercicios: ["Supino reto", "Crucifixo", "Flexão diamante"]
  },
  {
    id: 101,
    nome: "Treino de Perna",
    data: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "em-andamento",
    tipo: "pessoal",
    exercicios: ["Agachamento livre", "Leg press", "Cadeira extensora"]
  },
  {
    id: 102,
    nome: "Treino de Costas",
    data: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "finalizado",
    tipo: "pessoal",
    exercicios: ["Barra fixa", "Remada curvada", "Puxada alta"]
  },
  {
    id: 103,
    nome: "Treino de Braço",
    data: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pendente",
    tipo: "pessoal",
    exercicios: ["Rosca direta", "Tríceps pulley", "Martelo"]
  },
  {
    id: 104,
    nome: "Treino de Abdômen",
    data: new Date(Date.now()).toISOString(),
    status: "pendente",
    tipo: "pessoal",
    exercicios: ["Prancha", "Abdominal supra", "Elevação de pernas"]
  }
];

const mockTreinadores = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos.silva@example.com",
    telefone: "+55 (19) 99800-0009",
    foto: "../carlos.jpg",
    especialidade: "Musculação",
    treinos: [
      {
        id: 201,
        nome: "Treino de Força",
        data: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: "finalizado",
        tipo: "treinador",
        criador: "Carlos Silva",
        exercicios: ["Supino com halteres 4x10", "Agachamento com salto 4x15", "Remada unilateral 3x12"]
      },
      {
        id: 202,
        nome: "Treino Funcional",
        data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: "em-andamento",
        tipo: "treinador",
        criador: "Carlos Silva",
        exercicios: ["Burpee 5x20", "Kettlebell swing 4x15", "Pular corda 3x1min"]
      },
    ]
  },
  {
    id: 2,
    nome: "Ana Paula",
    email: "ana.paula@example.com",
    telefone: "+55 (11) 98765-4321",
    foto: "../ana.jpg",
    especialidade: "Crossfit",
    treinos: [
      {
        id: 301,
        nome: "WOD Intenso",
        data: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: "finalizado",
        tipo: "treinador",
        criador: "Ana Paula",
        exercicios: [
          "30 Clean and Jerk (40kg)",
          "50 Pistol Squats",
          "100 Double Unders",
          "20 Muscle Ups"
        ],
        descricao: "Complete no menor tempo possível"
      },
      {
        id: 302,
        nome: "Treino de Resistência",
        data: new Date(Date.now()).toISOString(),
        status: "pendente",
        tipo: "treinador",
        criador: "Ana Paula",
        exercicios: [
          "Corrida 5km",
          "100 Burpees for time",
          "50 Handstand Push-ups"
        ]
      },
      {
        id: 303,
        nome: "EMOM (Every Minute on the Minute)",
        data: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: "pendente",
        tipo: "treinador",
        criador: "Ana Paula",
        exercicios: [
          "Min 1: 10 Thrusters (40kg)",
          "Min 2: 15 Box Jumps (24')",
          "Min 3: 20 Wall Balls (9kg)",
          "Repetir por 15min"
        ]
      },
      {
        id: 304,
        nome: "Treino de Mobilidade",
        data: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: "finalizado",
        tipo: "treinador",
        criador: "Ana Paula",
        exercicios: [
          "Rolamento de fascia - 10min",
          "Alongamento dinâmico - 3x30s cada",
          "Exercícios de mobilidade torácica"
        ]
      },
      {
        id: 305,
        nome: "AMRAP (As Many Rounds As Possible)",
        data: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: "em-andamento",
        tipo: "treinador",
        criador: "Ana Paula",
        exercicios: [
          "5 Pull-ups",
          "10 Push-ups",
          "15 Air Squats",
          "20min contínuos"
        ]
      }
    ]
  },
  {
    id: 3,
    nome: "Marcos Oliveira",
    email: "marcos.oliveira@example.com",
    telefone: "+55 (21) 99876-5432",
    foto: "../marcos.jpg",
    especialidade: "Calistenia",
    treinos: [
      {
        id: 401,
        nome: "Treino Básico de Calistenia",
        data: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        status: "finalizado",
        tipo: "treinador",
        criador: "Marcos Oliveira",
        exercicios: [
          "Flexões 4x15",
          "Barra fixa 4x8",
          "Prancha 3x1min",
          "Agachamento livre 4x20"
        ]
      },
      {
        id: 402,
        nome: "Treino Avançado",
        data: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: "em-andamento",
        tipo: "treinador",
        criador: "Marcos Oliveira",
        exercicios: [
          "Muscle-ups 5x5",
          "Handstand Push-ups 4x6",
          "Front Lever progressão",
          "Planche progressão"
        ]
      },
      {
        id: 403,
        nome: "Treino de Força Isométrica",
        data: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: "pendente",
        tipo: "treinador",
        criador: "Marcos Oliveira",
        exercicios: [
          "Prancha L-sit 5x20s",
          "Barra fixa com pausa 4x10s",
          "Wall Handstand 5x30s"
        ]
      },
      {
        id: 404,
        nome: "Treino de Resistência",
        data: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        status: "finalizado",
        tipo: "treinador",
        criador: "Marcos Oliveira",
        exercicios: [
          "100 Pull-ups for time",
          "200 Push-ups for time",
          "300 Squats for time"
        ]
      },
      {
        id: 405,
        nome: "Treino de Habilidades",
        data: new Date(Date.now()).toISOString(),
        status: "pendente",
        tipo: "treinador",
        criador: "Marcos Oliveira",
        exercicios: [
          "Treino de Handstand Walk",
          "Transição Muscle-up para Front Lever",
          "Trabalho de equilíbrio em paralelas"
        ]
      }
    ]
  }
];

export default function VerTreino() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pendentes');
  const [filter] = useState('todos');
  const [viewMode, setViewMode] = useState('pessoal');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [treinadorAtual, setTreinadorAtual] = useState(null);;

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const diaSemana = dias[data.getDay()];
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    return `${diaSemana}, ${dia}/${mes}`;
  };

  const treinosFiltrados = useMemo(() => {
  const treinosBase = viewMode === 'pessoal' 
    ? mockTreinosPessoais 
    : treinadorAtual?.treinos || [];
  
  return treinosBase.filter(treino => {

    const statusMatch = 
      (activeTab === 'pendentes' && (treino.status === 'pendente' || treino.status === 'em-andamento')) ||
      (activeTab === 'realizados' && treino.status === 'finalizado');
    
    const tipoMatch = 
      viewMode === 'pessoal' ||  
      filter === 'todos' ||     
      (filter === 'pessoal' && treino.tipo === 'pessoal') ||
      (filter === 'treinador' && treino.tipo === 'treinador');
    
    return statusMatch && tipoMatch;
  });
}, [viewMode, treinadorAtual, activeTab, filter]);

  const handleAcaoTreino = (treinoId) => {
    navigate(`/treino/${treinoId}`);
  };

  const handleSelectTreinador = (treinador) => {
    setTreinadorAtual(treinador);
    setViewMode('treinador');
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'pessoal' ? 'treinador' : 'pessoal');
  };

  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmRemoveTreinador = () => {
    console.log("Treinador removido");
    setShowConfirmModal(false);
    setTreinadorAtual(null);
    setViewMode('pessoal');
  };

  return (
  <S.Page>
    <NavBar 
      title="TREINOS FIT"
      showBack={true}
      showMenu={false}
      onBack={() => navigate('/home')}
    />

    <S.CenteredLogo>
      <img src="/assets/images/LogoForte.png" alt="Logo ThorcFit" />
      <S.ViewModeTitle>
        {viewMode === 'pessoal' ? 'MEUS TREINOS' : treinadorAtual?.nome || 'TREINADOR'}
      </S.ViewModeTitle>
    </S.CenteredLogo>

    {/* Botões flutuantes */}
    <MeusTreinosButton 
      onClick={() => {
        toggleViewMode();
        setTreinadorAtual(null);
      }}
      active={viewMode === 'pessoal'}
      whileHover={{ scale: 1.1 }}
    />

    <TreinadorSwitch 
      treinadores={mockTreinadores}
      onSelectTreinador={handleSelectTreinador}
      currentTreinador={treinadorAtual}
    />

    <S.Content>
      {viewMode === 'treinador' && treinadorAtual && (
        <S.ProfileHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <S.ProfileImageContainer>
            <S.ProfileImage src={treinadorAtual.foto} alt="Foto do treinador" />
          </S.ProfileImageContainer>
          
          <S.ProfileInfo>
            <S.ProfileName>{treinadorAtual.nome}</S.ProfileName>
            <S.ProfileDetail><FiMail size={12} /> {treinadorAtual.email}</S.ProfileDetail>
            <S.ProfileDetail><FiPhone size={12} /> {treinadorAtual.telefone}</S.ProfileDetail>
            <S.ProfileType>TREINADOR</S.ProfileType>
          </S.ProfileInfo>
          
          <S.RemoveButton onClick={handleOpenConfirmModal}>
            <FiTrash2 size={14} />
          </S.RemoveButton>
        </S.ProfileHeader>
      )}

      <S.TabsContainer>
        <S.TabButton 
          active={activeTab === 'pendentes'} 
          onClick={() => setActiveTab('pendentes')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Treinos Pendentes
        </S.TabButton>
        <S.TabButton 
          active={activeTab === 'realizados'} 
          onClick={() => setActiveTab('realizados')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Treinos Realizados
        </S.TabButton>
      </S.TabsContainer>

       <AnimatePresence>
          <S.TreinosGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {treinosFiltrados.length === 0 ? (
              <S.EmptyMessage>
                Nenhum treino {activeTab === 'pendentes' ? 'pendente' : 'realizado'} encontrado
              </S.EmptyMessage>
            ) : (
              treinosFiltrados.map((treino) => (
                <S.TreinoCard
                  key={treino.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <S.TreinoHeader>
                    <S.TreinoDate>{formatarData(treino.data)}</S.TreinoDate>
                    <S.TreinoType tipo={treino.tipo}>
                      {treino.tipo === 'pessoal' ? 'Meu Treino' : 'Treinador'}
                    </S.TreinoType>
                  </S.TreinoHeader>
                  <S.TreinoName>{treino.nome}</S.TreinoName>
                  {treino.tipo === 'treinador' && (
                    <S.TreinoDetail>
                      <FiUser size={14} /> {treino.criador}
                    </S.TreinoDetail>
                  )}
                  <S.TreinoAction 
                    status={treino.status}
                    onClick={() => handleAcaoTreino(treino.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {treino.status === 'pendente' && <FiPlus size={14} />}
                    {treino.status === 'em-andamento' && <FiClock size={14} />}
                    {treino.status === 'finalizado' && <FiCheck size={14} />}
                    {treino.status === 'pendente' && 'Iniciar'}
                    {treino.status === 'em-andamento' && 'Continuar'}
                    {treino.status === 'finalizado' && 'Visualizar'}
                  </S.TreinoAction>
                </S.TreinoCard>
              ))
            )}
          </S.TreinosGrid>
        </AnimatePresence>

      {showConfirmModal && (
        <S.ConfirmModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <S.ModalContent>
            <h3>Confirmar exclusão</h3>
            <p>Tem certeza que deseja remover este treinador?</p>
            <S.ModalButtons>
              <S.ModalCancelButton onClick={handleCloseConfirmModal}>
                Cancelar
              </S.ModalCancelButton>
              <S.ModalConfirmButton onClick={handleConfirmRemoveTreinador}>
                Confirmar
              </S.ModalConfirmButton>
            </S.ModalButtons>
          </S.ModalContent>
        </S.ConfirmModal>
      )}
    </S.Content>
  </S.Page>
);
}