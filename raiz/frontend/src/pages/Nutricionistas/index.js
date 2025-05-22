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