import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../config/axios';
import {
  NotificacaoContainer,
  NotificacaoBadge,
  NotificacaoDropdown,
  NotificacaoItem,
  UserInfo,
  UserImage,
  AcaoButton
} from './styles';

export default function SolicitacoesVinculos() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [aberto, setAberto] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const carregarSolicitacoes = async () => {
    try {
      setLoading(true);
      
      // Buscar solicitações de vínculos pendentes
      const [responseNutri, responseTreino] = await Promise.all([
        api.get('/api/vinculos/nutricionais?status=pendente'),
        api.get('/api/vinculos/treino?status=pendente')
      ]);

      const solicitacoesNutri = (responseNutri.data.vinculos || []).map(v => ({
        ...v,
        tipo: 'nutricional',
        profissional: v.nutricionista?.usuario
      }));

      const solicitacoesTreino = (responseTreino.data.vinculos || []).map(v => ({
        ...v,
        tipo: 'treino',
        profissional: v.personalTrainer?.usuario
      }));

      setSolicitacoes([...solicitacoesNutri, ...solicitacoesTreino]);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcao = async (solicitacao, aceitar) => {
    try {
      const endpoint = aceitar ? 'aceitar' : 'rejeitar';
      await api.put(`/api/vinculos/${solicitacao.tipo}/${solicitacao.id_vinculo}/${endpoint}`);
      
      // Remover da lista local
      setSolicitacoes(prev => prev.filter(s => s.id_vinculo !== solicitacao.id_vinculo));
      
      // Notificação toast
      const tipoProfissional = solicitacao.tipo === 'nutricional' ? 'nutricionista' : 'personal trainer';
      toast.success(
        `Você ${aceitar ? 'aceitou' : 'recusou'} o vínculo com ${tipoProfissional} ${solicitacao.profissional?.nome}`, 
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error) {
      console.error('Erro ao processar solicitação:', error);
      toast.error('Erro ao processar solicitação', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (loading || solicitacoes.length === 0) return null;

  return (
    <NotificacaoContainer>
      <NotificacaoBadge onClick={() => setAberto(!aberto)}>
        {solicitacoes.length}
      </NotificacaoBadge>

      {aberto && (
        <NotificacaoDropdown>
          <div style={{ 
            padding: '0.5rem', 
            borderBottom: '1px solid #eee', 
            fontWeight: 'bold',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            Solicitações de Vínculos Profissionais
          </div>
          
          {solicitacoes.map(solicitacao => {
            const profissional = solicitacao.profissional;
            const tipoProfissional = solicitacao.tipo === 'nutricional' ? 'Nutricionista' : 'Personal Trainer';
            
            if (!profissional) return null;

            return (
              <NotificacaoItem key={`${solicitacao.tipo}-${solicitacao.id_vinculo}`}>
                <UserImage 
                  src={profissional.foto_perfil || '/assets/images/default-avatar.png'} 
                  alt={profissional.nome} 
                />
                <UserInfo>
                  <h4>{profissional.nome}</h4>
                  <p>{profissional.email}</p>
                  {profissional.telefone && <p>{profissional.telefone}</p>}
                  <p><strong>{tipoProfissional}</strong></p>
                  
                  {/* Informações específicas */}
                  {solicitacao.tipo === 'nutricional' && solicitacao.nutricionista?.especialidade && (
                    <p><small>Especialidade: {solicitacao.nutricionista.especialidade}</small></p>
                  )}
                  {solicitacao.tipo === 'treino' && solicitacao.personalTrainer?.especialidade && (
                    <p><small>Especialidade: {solicitacao.personalTrainer.especialidade}</small></p>
                  )}
                  
                  {solicitacao.observacoes && (
                    <p><small>Observações: {solicitacao.observacoes}</small></p>
                  )}
                  
                  <p><small>Solicitado em: {new Date(solicitacao.data_inicio).toLocaleDateString('pt-BR')}</small></p>
                </UserInfo>
                
                <div className="acoes">
                  <AcaoButton 
                    aceitar 
                    onClick={() => handleAcao(solicitacao, true)}
                    title={`Aceitar vínculo com ${tipoProfissional.toLowerCase()}`}
                  >
                    ✓
                  </AcaoButton>
                  <AcaoButton 
                    onClick={() => handleAcao(solicitacao, false)}
                    title={`Recusar vínculo com ${tipoProfissional.toLowerCase()}`}
                  >
                    ✕
                  </AcaoButton>
                </div>
              </NotificacaoItem>
            );
          })}
        </NotificacaoDropdown>
      )}
    </NotificacaoContainer>
  );
}