import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../config/axios';
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

export default function VinculosProfissionais() {
  const navigate = useNavigate();
  const [vinculos, setVinculos] = useState({
    nutricionais: [],
    treino: []
  });
  const [activeTab, setActiveTab] = useState('treino');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarVinculos();
  }, []);

  const carregarVinculos = async () => {
    try {
      setLoading(true);
      
      // Buscar vínculos nutricionais
      const responseNutri = await api.get('/api/vinculos/nutricionais');
      
      // Buscar vínculos de treino
      const responseTreino = await api.get('/api/vinculos/treino');
      
      setVinculos({
        nutricionais: responseNutri.data.vinculos || [],
        treino: responseTreino.data.vinculos || []
      });
    } catch (error) {
      console.error('Erro ao carregar vínculos:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelarVinculo = async (tipo, idVinculo) => {
    try {
      await api.delete(`/api/vinculos/${tipo}/${idVinculo}`);
      carregarVinculos(); // Recarregar lista
      alert('Vínculo cancelado com sucesso!');
    } catch (error) {
      console.error('Erro ao cancelar vínculo:', error);
      alert('Erro ao cancelar vínculo');
    }
  };

  const handleViewContent = (vinculo, tipo) => {
    if (tipo === 'treino') {
      navigate('/ver-treinos');
    } else {
      navigate('/alimentacao');
    }
  };

  const vinculosAtivos = activeTab === 'treino' 
    ? vinculos.treino.filter(v => v.status === 'ativo')
    : vinculos.nutricionais.filter(v => v.status === 'ativo');

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>VÍNCULOS PROFISSIONAIS</Title>
        </Header>
        <EmptyMessage>Carregando vínculos...</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>VÍNCULOS PROFISSIONAIS</Title>
      </Header>

      <TabsContainer>
        <TabButton 
          $active={activeTab === 'treino'}
          onClick={() => setActiveTab('treino')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Personal Trainers ({vinculos.treino.filter(v => v.status === 'ativo').length})
        </TabButton>
        <TabButton 
          $active={activeTab === 'nutricional'}
          onClick={() => setActiveTab('nutricional')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Nutricionistas ({vinculos.nutricionais.filter(v => v.status === 'ativo').length})
        </TabButton>
      </TabsContainer>

      <FriendList>
        {vinculosAtivos.length === 0 ? (
          <EmptyMessage>
            <p>Nenhum {activeTab === 'treino' ? 'personal trainer' : 'nutricionista'} vinculado</p>
            <ActionButton 
              $color="verde" 
              onClick={() => navigate('/solicitar-companheiros')}
              style={{ marginTop: '1rem' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buscar Profissionais
            </ActionButton>
          </EmptyMessage>
        ) : (
          vinculosAtivos.map((vinculo, index) => {
            const profissional = activeTab === 'treino' 
              ? vinculo.personalTrainer?.usuario 
              : vinculo.nutricionista?.usuario;
            
            if (!profissional) return null;

            return (
              <FriendCard 
                key={vinculo.id_vinculo} 
                $delay={index * 0.1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <UserContainer>
                  <UserImage 
                    src={profissional.foto_perfil || '/assets/images/default-avatar.png'} 
                    alt={profissional.nome} 
                  />
                  <UserInfo>
                    <h4>{profissional.nome}</h4>
                    <p>{profissional.email}</p>
                    {profissional.telefone && <p>{profissional.telefone}</p>}
                    <p><strong>{activeTab === 'treino' ? 'Personal Trainer' : 'Nutricionista'}</strong></p>
                    
                    {/* Informações específicas */}
                    {activeTab === 'treino' && vinculo.personalTrainer?.especialidade && (
                      <p><small>Especialidade: {vinculo.personalTrainer.especialidade}</small></p>
                    )}
                    {activeTab === 'nutricional' && vinculo.nutricionista?.especialidade && (
                      <p><small>Especialidade: {vinculo.nutricionista.especialidade}</small></p>
                    )}
                    
                    <p><small>Vínculo desde: {new Date(vinculo.data_inicio).toLocaleDateString('pt-BR')}</small></p>
                  </UserInfo>
                </UserContainer>
                
                <ButtonGroup>
                  <ActionButton 
                    $color="verde" 
                    onClick={() => handleViewContent(vinculo, activeTab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeTab === 'treino' ? 'Ver Treinos' : 'Ver Planos'}
                  </ActionButton>
                  <ActionButton 
                    $color="laranja" 
                    onClick={() => cancelarVinculo(activeTab, vinculo.id_vinculo)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancelar Vínculo
                  </ActionButton>
                </ButtonGroup>
              </FriendCard>
            );
          })
        )}
      </FriendList>
    </Container>
  );
}