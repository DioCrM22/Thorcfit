import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUserPlus, FiUser, FiTrash2, FiX, FiCheck, FiFilter, FiPlus } from 'react-icons/fi';
import NavBar from '../../components/NavBar';
import {
  Container,
  Header,
  Logo,
  SearchContainer,
  SearchInput,
  FilterGroup,
  FilterButton,
  UserList,
  UserCard,
  UserImage,
  UserInfo,
  ActionGroup,
  AddButton,
  DeleteButton,
  CheckBadge,
  ModalOverlay,
  ModalContent,
  ModalActions,
  ModalButton,
  EmptyMessage,
  NavBarContainer
} from './styles';

// Mock de dados - alunos vinculados e não vinculados
const mockAlunos = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    telefone: '(11) 98765-4321',
    foto_perfil: '/assets/images/default-avatar.png',
    tipo: 'Atleta',
    genero: 'masculino',
    vinculado: true
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    email: 'maria@exemplo.com',
    telefone: '(21) 99876-5432',
    foto_perfil: '/assets/images/default-avatar.png',
    tipo: 'Atleta',
    genero: 'feminino',
    vinculado: false
  },
  {
    id: 3,
    nome: 'Carlos Souza',
    email: 'carlos@exemplo.com',
    telefone: '(31) 98765-1234',
    foto_perfil: '/assets/images/default-avatar.png',
    tipo: 'Atleta',
    genero: 'masculino',
    vinculado: true
  },
  {
    id: 4,
    nome: 'Ana Santos',
    email: 'ana@exemplo.com',
    telefone: '(41) 99876-4321',
    foto_perfil: '/assets/images/default-avatar.png',
    tipo: 'Atleta',
    genero: 'feminino',
    vinculado: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GerenciarAlunos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');
  const [alunos, setAlunos] = useState(mockAlunos);
  const [modalOpen, setModalOpen] = useState(false);
  const [alunoToRemove, setAlunoToRemove] = useState(null);

  const filteredAlunos = alunos.filter(aluno => {
    const matchesSearch = aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         aluno.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'todos' || 
                        (filter === 'vinculados' && aluno.vinculado) || 
                        (filter === 'nao-vinculados' && !aluno.vinculado);
    return matchesSearch && matchesFilter;
  });

  const handleAddAluno = (alunoId) => {
    setAlunos(alunos.map(aluno => 
      aluno.id === alunoId ? {...aluno, vinculado: true} : aluno
    ));
    // Lógica para vincular o aluno ao profissional na API
  };

  const confirmRemoveAluno = (alunoId) => {
    setAlunoToRemove(alunoId);
    setModalOpen(true);
  };

  const handleRemoveAluno = () => {
    setAlunos(alunos.map(aluno => 
      aluno.id === alunoToRemove ? {...aluno, vinculado: false} : aluno
    ));
    setModalOpen(false);
    // Lógica para remover o vínculo na API
  };

  const getGenderEmoji = (gender) => {
    return gender === 'masculino' ? '👨' : gender === 'feminino' ? '👩' : '🧑';
  };

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header>
        <NavBarContainer>
          <NavBar 
            title="THORC FIT"
            showBack={true}
            showMenu={false}
            onBack={() => navigate(-1)}
          />
        </NavBarContainer>
        
        <Logo 
          src="/assets/images/logoAmigos.png" 
          alt="Logo Thorc Fit"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        />
      </Header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="🔍 Buscar por aluno por e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FilterGroup>
          {['todos', 'seguindo', 'nao-seguindo'].map((filterType) => (
            <FilterButton
              key={filterType}
              active={filter === filterType}
              onClick={() => setFilter(filterType)}
              variants={itemVariants}
            >
              {filterType === 'todos' && <FiFilter size={14} />}
              {filterType === 'seguindo' && <FiCheck size={14} />}
              {filterType === 'nao-seguindo' && <FiPlus size={14} />}
              {filterType === 'todos' && ' Todos'}
              {filterType === 'seguindo' && ' Seguindo'}
              {filterType === 'nao-seguindo' && ' Não seguindo'}
            </FilterButton>
          ))}
        </FilterGroup>
      </motion.div>

      <UserList>
        <AnimatePresence>
          {filteredAlunos.length === 0 ? (
            <EmptyMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FiUser size={40} />
              <p>Nenhum aluno encontrado</p>
            </EmptyMessage>
          ) : (
            filteredAlunos.map((aluno, index) => (
              <motion.div
                key={aluno.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <UserCard>
                  {aluno.vinculado && (
                    <CheckBadge>
                      <FiCheck size={16} />
                    </CheckBadge>
                  )}
                  
                  <UserImage src={aluno.foto_perfil} alt={aluno.nome} />
                  
                  <UserInfo>
                    <h4>{getGenderEmoji(aluno.genero)} {aluno.nome}</h4>
                    <p>📧 {aluno.email}</p>
                    <p>📱 {aluno.telefone}</p>
                  </UserInfo>

                  <ActionGroup>
                    {aluno.vinculado ? (
                      <DeleteButton
                        onClick={() => confirmRemoveAluno(aluno.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiTrash2 size={16} /> Excluir aluno
                      </DeleteButton>
                    ) : (
                      <AddButton
                        onClick={() => handleAddAluno(aluno.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiUserPlus size={18} /> Adicionar
                      </AddButton>
                    )}
                  </ActionGroup>
                </UserCard>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </UserList>

      {/* Modal de Confirmação */}
      <AnimatePresence>
        {modalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <ModalContent
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Confirmar Remoção</h3>
              <p>Tem certeza que deseja remover este aluno?</p>
              <p>Ele perderá acesso aos seus treinos e planos.</p>
              
              <ModalActions>
                <ModalButton cancel onClick={() => setModalOpen(false)}>
                  <FiX /> Cancelar
                </ModalButton>
                <ModalButton confirm onClick={handleRemoveAluno}>
                  <FiCheck /> Confirmar
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
}