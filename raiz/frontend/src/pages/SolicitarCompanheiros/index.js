import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiPlus, FiFilter, FiX } from 'react-icons/fi';
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
  CheckBadge
} from './styles';

const mockUsers = [
  {
    id: 1,
    nome: 'Carlos Silva',
    email: 'carlos@exemplo.com',
    telefone: '(11) 98765-4321',
    foto_perfil: '/assets/images/default-avatar.png',
    tipo: 'Treinador',
    seguindo: true
  },
  {
    id: 2,
    nome: 'Ana Souza',
    email: 'ana@exemplo.com',
    telefone: '(21) 99876-5432',
    foto_perfil: '/assets/images/default-avatar.png',
    tipo: 'Treinador',
    seguindo: false
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

export default function AmigosPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'todos' || 
                        (filter === 'seguindo' && user.seguindo) || 
                        (filter === 'nao-seguindo' && !user.seguindo);
    return matchesSearch && matchesFilter;
  });

  const handleSendRequest = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, seguindo: true} : user
    ));
  };

  const handleRemoveFriend = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, seguindo: false} : user
    ));
  };

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header>
        <NavBar 
        title="AMIGOS FIT"
        showBack={true}
        showMenu={false}
        onBack={() => navigate('/home')}
      />
        <Logo 
          src="/assets/images/LogoAmigos.png" 
          alt="Logo Forte"
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
            placeholder="🔍Buscar por e-mail..."
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
          {filteredUsers.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Nenhum usuário encontrado
            </motion.p>
          ) : (
            filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <UserCard>
                  {user.seguindo && (
                    <CheckBadge>
                      <FiCheck size={16} />
                    </CheckBadge>
                  )}
                  
                  <UserImage src={user.foto_perfil} alt={user.nome} />
                  
                  <UserInfo>
                    <h4>👤 {user.nome}</h4>
                    <p>📧 {user.email}</p>
                    <p>📱 {user.telefone}</p>
                    <p>{user.tipo}</p>
                  </UserInfo>

                  <ActionGroup>
                    {user.seguindo ? (
                      <DeleteButton
                        onClick={() => handleRemoveFriend(user.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiX /> Excluir
                      </DeleteButton>
                    ) : (
                      <AddButton
                        onClick={() => handleSendRequest(user.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiPlus /> Adicionar
                      </AddButton>
                    )}
                  </ActionGroup>
                </UserCard>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </UserList>
    </Container>
  );
}