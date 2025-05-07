import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  NotificacaoContainer,
  NotificacaoBadge,
  NotificacaoDropdown,
  NotificacaoItem,
  UserInfo,
  UserImage,
  AcaoButton
} from './styles';

const mockSolicitacoes = [
  {
    id: 1,
    nome: 'Carlos Silva',
    email: 'carlos@exemplo.com',
    telefone: '(11) 99999-9999',
    foto_perfil: '/default-avatar.png'
  },
  {
    id: 2,
    nome: 'Ana Souza',
    email: 'ana@exemplo.com',
    telefone: '(11) 98888-8888',
    foto_perfil: '/default-avatar.png'
  }
];

export default function SolicitacoesAmizade() {
  const [solicitacoes, setSolicitacoes] = useState(mockSolicitacoes);
  const [aberto, setAberto] = useState(false);

  const handleAcao = (id, aceitar, nome) => {
    setSolicitacoes(solicitacoes.filter(s => s.id !== id));
    
    // Notificação toast
    toast.success(`Você ${aceitar ? 'aceitou' : 'recusou'} a solicitação de ${nome}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (solicitacoes.length === 0) return null;

  return (
    <NotificacaoContainer>
      <NotificacaoBadge onClick={() => setAberto(!aberto)}>
        {solicitacoes.length}
      </NotificacaoBadge>

      {aberto && (
        <NotificacaoDropdown>
          {solicitacoes.map(solicitacao => (
            <NotificacaoItem key={solicitacao.id}>
              <UserImage src={solicitacao.foto_perfil} alt={solicitacao.nome} />
              <UserInfo>
                <h4>{solicitacao.nome}</h4>
                <p>{solicitacao.email}</p>
                <p>{solicitacao.telefone}</p>
              </UserInfo>
              <div className="acoes">
                <AcaoButton 
                  aceitar 
                  onClick={() => handleAcao(solicitacao.id, true, solicitacao.nome)}
                >
                  ✓
                </AcaoButton>
                <AcaoButton 
                  onClick={() => handleAcao(solicitacao.id, false, solicitacao.nome)}
                >
                  ✕
                </AcaoButton>
              </div>
            </NotificacaoItem>
          ))}
        </NotificacaoDropdown>
      )}
    </NotificacaoContainer>
  );
}