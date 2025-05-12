// index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Header, 
  Title, 
  FriendList, 
  FriendCard, 
  UserContainer,
  UserImage, 
  UserInfo,
  ActionButton,
  ButtonGroup,
  TabsContainer,
  TabButton,
  EmptyMessage
} from './styles';

const mockFriends = [
  {
    id: 1,
    nome: 'Carlos Silva',
    email: 'carlos@exemplo.com',
    telefone: '(11) 98765-4321',
    foto_perfil: '/default-avatar.png',
    tipo: 'treinador',
  },
  {
    id: 2,
    nome: 'Ana Souza',
    email: 'ana@exemplo.com',
    telefone: '(21) 99876-5432',
    foto_perfil: '/default-avatar.png',
    tipo: 'treinador',
  },
  {
    id: 3,
    nome: 'Marcos Oliveira',
    email: 'marcos@exemplo.com',
    telefone: '(31) 98765-1234',
    foto_perfil: '/default-avatar.png',
    tipo: 'nutricionista',
  },
  {
    id: 4,
    nome: 'Juliana Costa',
    email: 'juliana@exemplo.com',
    telefone: '(41) 99876-4321',
    foto_perfil: '/default-avatar.png',
    tipo: 'nutricionista',
  }
];

export default function Amigos() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState(mockFriends);
  const [activeTab, setActiveTab] = useState('treinador');

  const handleDelete = (friendId) => {
    setFriends(friends.filter(friend => friend.id !== friendId));
  };

  const handleViewWorkouts = (userId, tipo) => {
    navigate(tipo === 'treinador' ? '/ver-treinos' : '/ver-planos');
  };

  const filteredFriends = friends.filter(friend => friend.tipo === activeTab);

  return (
    <Container>
      <Header>
        <Title>COMPANHEIROS</Title>
      </Header>

      <TabsContainer>
        <TabButton 
          $active={activeTab === 'treinador'}
          onClick={() => setActiveTab('treinador')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Treinadores
        </TabButton>
        <TabButton 
          $active={activeTab === 'nutricionista'}
          onClick={() => setActiveTab('nutricionista')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Nutricionistas
        </TabButton>
      </TabsContainer>

      <FriendList>
        {filteredFriends.length === 0 ? (
          <EmptyMessage>
            Nenhum {activeTab === 'treinador' ? 'treinador' : 'nutricionista'} adicionado
          </EmptyMessage>
        ) : (
          filteredFriends.map((friend, index) => (
            <FriendCard 
              key={friend.id} 
              $delay={index * 0.1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <UserContainer>
                <UserImage src={friend.foto_perfil} alt={friend.nome} />
                <UserInfo>
                  <h4>{friend.nome}</h4>
                  <p>{friend.email}</p>
                  <p>{friend.telefone}</p>
                  <p>{friend.tipo}</p>
                </UserInfo>
              </UserContainer>
              <ButtonGroup>
                <ActionButton 
                  $color="verde" 
                  onClick={() => handleViewWorkouts(friend.id, friend.tipo)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeTab === 'treinador' ? 'Ver Treinos' : 'Ver Planos'}
                </ActionButton>
                <ActionButton 
                  $color="laranja" 
                  onClick={() => handleDelete(friend.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Excluir
                </ActionButton>
              </ButtonGroup>
            </FriendCard>
          ))
        )}
      </FriendList>
    </Container>
  );
}