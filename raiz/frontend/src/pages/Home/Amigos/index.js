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
  ButtonGroup
} from './styles';

const mockFriends = [
  {
    id: 1,
    nome: 'Carlos Silva',
    email: 'carlos@exemplo.com',
    telefone: '(11) 98765-4321',
    foto_perfil: '/default-avatar.png'
  },
  {
    id: 2,
    nome: 'Ana Souza',
    email: 'ana@exemplo.com',
    telefone: '(21) 99876-5432',
    foto_perfil: '/default-avatar.png'
  }
];

export default function Amigos() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState(mockFriends);

  const handleDelete = (friendId) => {
    setFriends(friends.filter(friend => friend.id !== friendId));
  };

  const handleViewWorkouts = (userId) => {
    navigate('/treinos');
  };

  return (
    <Container>
      <Header>
        <Title>MEUS AMIGOS</Title>
      </Header>

      <FriendList>
        {friends.length === 0 ? (
          <p>Nenhum amigo adicionado</p>
        ) : (
          friends.map((friend, index) => (
            <FriendCard key={friend.id} $delay={index * 0.1}>
              <UserContainer>
                <UserImage src={friend.foto_perfil} alt={friend.nome} />
                <UserInfo>
                  <h4>{friend.nome}</h4>
                  <p>{friend.email}</p>
                  <p>{friend.telefone}</p>
                </UserInfo>
              </UserContainer>
              <ButtonGroup>
                <ActionButton 
                  $color="verde" 
                  onClick={() => handleViewWorkouts(friend.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Treinos
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