<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFileText, FiUser } from 'react-icons/fi';
import NavBar from '../../components/NavBar';
import {
  Container,
  Header,
  SearchContainer,
  SearchInput,
  ProfessionalList,
  ProfessionalCard,
  UserImage,
  UserInfo,
  ActionGroup,
  PlanButton,
  EmptyMessage
} from './styles';

const NutritionistPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data sem state update
  const patients = [
    {
      id_usuario: 1,
      nome: 'Maria Oliveira',
      email: 'maria@exemplo.com',
      foto_perfil: '/assets/images/default-avatar.png',
      ultimo_plano: '2024-03-15',
      status_plano: 'ativo'
    }
  ];

  const filteredPatients = patients.filter(patient => 
    patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePlan = (userId) => {
    navigate(`/plano-nutricional/${userId}`);
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <NavBar 
          title="NUTRICIONISTAS"
          showBack={true}
          showMenu={false}
          onBack={() => navigate('/home')}
        />
      </Header>

      <SearchContainer>
        <FiSearch size={20} />
        <SearchInput
          placeholder="Buscar paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <ProfessionalList>
        <AnimatePresence>
          {filteredPatients.length === 0 ? (
            <EmptyMessage>
              <FiUser size={40} />
              <p>Nenhum paciente encontrado</p>
            </EmptyMessage>
          ) : (
            filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id_usuario}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProfessionalCard>
                  <UserImage src={patient.foto_perfil} alt={patient.nome} />
                  
                  <UserInfo>
                    <h4>{patient.nome}</h4>
                    <p>{patient.email}</p>
                    <div className="status">
                      <span className={`badge ${patient.status_plano}`}>
                        Plano {patient.status_plano}
                      </span>
                      <span>Último plano: {patient.ultimo_plano}</span>
                    </div>
                  </UserInfo>

                  <ActionGroup>
                    <PlanButton
                      onClick={() => handleCreatePlan(patient.id_usuario)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiFileText /> {patient.status_plano === 'ativo' ? 'Editar' : 'Novo'} Plano
                    </PlanButton>
                  </ActionGroup>
                </ProfessionalCard>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </ProfessionalList>
    </Container>
  );
};

export default NutritionistPage;
=======
// Nutricionistas/index.js
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiActivity, FiTrash2, FiEdit } from 'react-icons/fi';
import NutriSidebar from './Sidebar';
import EditarRefeicao from './EditarRefeicao';
import NavBar from '../../components/NavBar';
import * as S from './styles';

const NutricionistasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [popupRefeicao, setPopupRefeicao] = useState({ userId: null, refeicaoId: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const atletas = [
    {
      id_usuario: 1,
      nome: 'João Santos',
      email: 'joao@exemplo.com',
      foto_perfil: '/assets/images/default-avatar.png',
      genero: 'masculino',
      numero: '(11) 98765-4321',
      status_treino: 'ativo',
      historico_refeicoes: [
        { id_refeicao: 201, nome: 'Café da Manhã', data: '2024-05-10', status: 'ativo' },
        { id_refeicao: 202, nome: 'Almoço', data: '2024-05-11', status: 'finalizado' }
      ]
    }
  ];

  const handleEditarRefeicao = (userId, refeicaoId) => {
    setPopupRefeicao({ userId, refeicaoId });
  };

  const handleNovaRefeicao = (userId) => {
    setPopupRefeicao({ userId, refeicaoId: null });
  };

  const handleFecharPopup = () => {
    setPopupRefeicao({ userId: null, refeicaoId: null });
  };

  return (
    <S.PageContainer>
      <NutriSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <S.MainContent>
        <S.Header>
          <NavBar 
            title="THORC FIT"
            showBack={false}
            showMenu={true}
            onMenu={() => setSidebarOpen(true)}
          />
        </S.Header>

        <S.CenteredLogo>
          <motion.img src="/assets/images/logo.png" alt="Logo Thorc Fit" />
          <S.SectionTitle>ESPAÇO PARA <span className="highlight">NUTRICIONISTAS</span></S.SectionTitle>
        </S.CenteredLogo>

        <S.SearchContainer>
          <FiSearch />
          <S.SearchInput
            placeholder="Buscar atleta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchContainer>

        <S.ProfessionalList>
          {atletas.map((atleta) => (
            <S.ProfessionalCard key={atleta.id_usuario}>
              <S.UserImage src={atleta.foto_perfil} />
              <S.UserInfo>
                <h4>{atleta.nome}</h4>
                <p>{atleta.email}</p>
                <p>{atleta.numero}</p>
              </S.UserInfo>

              <S.ActionGroup>
                <S.PlanButton onClick={() => handleNovaRefeicao(atleta.id_usuario)}>
                  <FiActivity /> Nova Refeição
                </S.PlanButton>
                <S.HistoryButton onClick={() => handleEditarRefeicao(atleta.id_usuario, atleta.historico_refeicoes[0].id_refeicao)}>
                  <FiEdit /> Editar
                </S.HistoryButton>
              </S.ActionGroup>

              <S.DeleteButton onClick={() => alert('Excluir...')}>
                <FiTrash2 />
              </S.DeleteButton>
            </S.ProfessionalCard>
          ))}
        </S.ProfessionalList>
      </S.MainContent>

      <AnimatePresence>
        {popupRefeicao.userId && (
          <EditarRefeicao
            userId={popupRefeicao.userId}
            refeicaoId={popupRefeicao.refeicaoId}
            onClose={handleFecharPopup}
          />
        )}
      </AnimatePresence>
    </S.PageContainer>
  );
};

export default NutricionistasPage;
>>>>>>> diogo
