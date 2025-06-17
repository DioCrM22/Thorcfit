import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiPlus, FiFilter, FiUser, FiHeart } from 'react-icons/fi';
import NavBar from '../../components/NavBar';
import api from '../../config/axios';
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
  CheckBadge
} from './styles';

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

export default function BuscarProfissionaisPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solicitandoVinculo, setSolicitandoVinculo] = useState({});

  useEffect(() => {
    carregarProfissionais();
  }, []);

  const carregarProfissionais = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/user/profissionais');
      setProfissionais(response.data.profissionais || []);
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
    } finally {
      setLoading(false);
    }
  };

  const solicitarVinculo = async (profissional) => {
    try {
      setSolicitandoVinculo(prev => ({ ...prev, [profissional.id_usuario]: true }));
      
      const isNutricionista = profissional.nutricionista;
      const endpoint = isNutricionista ? '/api/vinculos/nutricional' : '/api/vinculos/treino';
      const idField = isNutricionista ? 'id_nutricionista' : 'id_personal';
      const idValue = isNutricionista ? profissional.nutricionista.id_nutricionista : profissional.personalTrainer.id_personal;

      await api.post(endpoint, {
        [idField]: idValue,
        observacoes: `Solicitação de vínculo com ${isNutricionista ? 'nutricionista' : 'personal trainer'}`
      });

      alert('Solicitação de vínculo enviada com sucesso!');
      
      // Atualizar o estado local para mostrar que o vínculo foi solicitado
      setProfissionais(prev => prev.map(p => 
        p.id_usuario === profissional.id_usuario 
          ? { ...p, vinculo_solicitado: true }
          : p
      ));
      
    } catch (error) {
      console.error('Erro ao solicitar vínculo:', error);
      if (error.response?.status === 409) {
        alert('Você já possui um vínculo com este profissional.');
      } else {
        alert('Erro ao solicitar vínculo. Tente novamente.');
      }
    } finally {
      setSolicitandoVinculo(prev => ({ ...prev, [profissional.id_usuario]: false }));
    }
  };

  const filteredProfissionais = profissionais.filter(profissional => {
    const matchesSearch = profissional.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         profissional.nome.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (filter === 'nutricionistas') {
      matchesFilter = profissional.nutricionista;
    } else if (filter === 'treinadores') {
      matchesFilter = profissional.personalTrainer;
    }
    
    return matchesSearch && matchesFilter;
  });

  const getTipoProfissional = (profissional) => {
    if (profissional.nutricionista) return 'Nutricionista';
    if (profissional.personalTrainer) return 'Personal Trainer';
    return 'Profissional';
  };

  const getIconeProfissional = (profissional) => {
    if (profissional.nutricionista) return <FiHeart size={16} />;
    if (profissional.personalTrainer) return <FiUser size={16} />;
    return <FiUser size={16} />;
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <NavBar 
            title="THORC FIT"
            showBack={true}
            showMenu={false}
            onBack={() => navigate('/home')}
          />
        </Header>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Carregando profissionais...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header>
        <NavBar 
          title="THORC FIT"
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
            placeholder="🔍Buscar profissional por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FilterGroup>
          {[
            { key: 'todos', label: 'Todos', icon: <FiFilter size={14} /> },
            { key: 'nutricionistas', label: 'Nutricionistas', icon: <FiHeart size={14} /> },
            { key: 'treinadores', label: 'Treinadores', icon: <FiUser size={14} /> }
          ].map((filterType) => (
            <FilterButton
              key={filterType.key}
              active={filter === filterType.key}
              onClick={() => setFilter(filterType.key)}
              variants={itemVariants}
            >
              {filterType.icon}
              {' ' + filterType.label}
            </FilterButton>
          ))}
        </FilterGroup>

        {/* Botão para ver vínculos */}
        <div style={{ textAlign: 'center', margin: '1rem 0' }}>
          <motion.button
            onClick={() => navigate('/vinculos-profissionais')}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Meus Vínculos Profissionais
          </motion.button>
        </div>
      </motion.div>

      <UserList>
        <AnimatePresence>
          {filteredProfissionais.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ textAlign: 'center', color: '#666' }}
            >
              Nenhum profissional encontrado
            </motion.p>
          ) : (
            filteredProfissionais.map((profissional, index) => (
              <motion.div
                key={profissional.id_usuario}
                variants={itemVariants}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <UserCard>
                  {profissional.vinculo_solicitado && (
                    <CheckBadge>
                      <FiCheck size={16} />
                    </CheckBadge>
                  )}
                  
                  <UserImage src={profissional.foto_perfil || '/assets/images/default-avatar.png'} alt={profissional.nome} />
                  
                  <UserInfo>
                    <h4>{getIconeProfissional(profissional)} {profissional.nome}</h4>
                    <p>📧 {profissional.email}</p>
                    {profissional.telefone && <p>📱 {profissional.telefone}</p>}
                    <p><strong>{getTipoProfissional(profissional)}</strong></p>
                    
                    {/* Informações específicas do profissional */}
                    {profissional.nutricionista?.especialidade && (
                      <p><small>Especialidade: {profissional.nutricionista.especialidade}</small></p>
                    )}
                    {profissional.personalTrainer?.especialidade && (
                      <p><small>Especialidade: {profissional.personalTrainer.especialidade}</small></p>
                    )}
                    
                    {profissional.nutricionista?.preco_consulta && (
                      <p><small>R$ {parseFloat(profissional.nutricionista.preco_consulta).toFixed(2)} / consulta</small></p>
                    )}
                    {profissional.personalTrainer?.preco_sessao && (
                      <p><small>R$ {parseFloat(profissional.personalTrainer.preco_sessao).toFixed(2)} / sessão</small></p>
                    )}
                  </UserInfo>

                  <ActionGroup>
                    {profissional.vinculo_solicitado ? (
                      <CheckBadge style={{ position: 'relative', background: '#28a745' }}>
                        <FiCheck /> Solicitado
                      </CheckBadge>
                    ) : (
                      <AddButton
                        onClick={() => solicitarVinculo(profissional)}
                        disabled={solicitandoVinculo[profissional.id_usuario]}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {solicitandoVinculo[profissional.id_usuario] ? (
                          'Enviando...'
                        ) : (
                          <>
                            <FiPlus /> Solicitar Vínculo
                          </>
                        )}
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

