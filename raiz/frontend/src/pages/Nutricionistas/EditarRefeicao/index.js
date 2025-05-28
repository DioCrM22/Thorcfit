import React, { useState } from 'react';
import * as S from './styles';
import AddAlimentoPopup from '../../Alimentacao/AddAlimentoPopup';
import { useNotification } from '../../../contexts/NotificationContext';

const EditarRefeicao = ({ userId, refeicaoId, onClose }) => {
  const [step, setStep] = useState(1);
  const [tipoRefeicao, setTipoRefeicao] = useState('');
  const [horario, setHorario] = useState('');
  const [alimentos, setAlimentos] = useState([]);
  const [showAddAlimento, setShowAddAlimento] = useState(false);
  const { notify } = useNotification();

  const adicionarAlimento = (alimento) => {
    setAlimentos([...alimentos, {
      ...alimento,
      porcao: 'g/ml',
      quantidade: 100 
    }]);
    setShowAddAlimento(false);
  };

  const handleAvancar = () => {
    if (step === 1 && (!tipoRefeicao || !horario)) {
      notify('❌ Preencha todos os campos antes de avançar', "error");
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handleVoltar = () => {
    if (step > 1) setStep(step - 1);
  };

  const salvarRefeicao = () => {
    if (!tipoRefeicao || !horario || alimentos.length === 0) {
      alert('Preencha todos os campos antes de salvar');
      return;
    }

    const novaRefeicao = {
      userId,
      tipo_refeicao: tipoRefeicao,
      horario,
      alimentos
    };
    
    console.log("Refeição Salva:", novaRefeicao);
    // Aqui você faria a chamada API para salvar
    onClose();
  };

  return (
    <S.Overlay>
      <S.Modal>
        <S.Header>
          <h2>{refeicaoId ? 'Editar Refeição' : 'Nova Refeição'}</h2>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.Header>

        {step === 1 && (
          <S.Form>
            <S.InputContainer>
              <S.Label>Tipo de Refeição</S.Label>
              <S.Select value={tipoRefeicao} onChange={e => setTipoRefeicao(e.target.value)} required>
                <option value="">Selecione</option>
                <option value="café_da_manhã">Café da Manhã</option>
                <option value="lanche_manhã">Lanche da Manhã</option>
                <option value="almoço">Almoço</option>
                <option value="lanche_tarde">Lanche da Tarde</option>
                <option value="jantar">Jantar</option>
              </S.Select>
            </S.InputContainer>

            <S.InputContainer>
              <S.Label>Horário</S.Label>
              <S.Input type="time" value={horario} onChange={e => setHorario(e.target.value)} required />
            </S.InputContainer>
          </S.Form>
        )}

        {step === 2 && (
          <>
            <S.AddButton onClick={() => setShowAddAlimento(true)}>
              + Adicionar Alimento
            </S.AddButton>
            
            <S.AlimentoLista>
              {alimentos.map((a, index) => (
                <S.AlimentoItem key={index}>
                  <span>{a.name}</span>
                  <span>{a.quantidade}g - {a.calories}kcal</span>
                </S.AlimentoItem>
              ))}
            </S.AlimentoLista>

            {showAddAlimento && (
              <AddAlimentoPopup
                isOpen={true}
                onClose={() => setShowAddAlimento(false)}
                onSave={adicionarAlimento}
              />
            )}
          </>
        )}

        {step === 3 && (
          <S.Resumo>
            <h3>Resumo da Refeição</h3>
            <p><strong>Paciente:</strong> {userId}</p>
            <p><strong>Tipo:</strong> {tipoRefeicao}</p>
            <p><strong>Horário:</strong> {horario}</p>
            <p><strong>Alimentos:</strong></p>
            <ul>
              {alimentos.map((a, i) => (
                <li key={i}>
                  {a.name} - {a.quantidade}g - {a.calories}kcal
                  (P: {a.protein}g, C: {a.carbs}g, G: {a.fat}g)
                </li>
              ))}
            </ul>
          </S.Resumo>
        )}

        <S.ButtonContainer>
          {step > 1 && <S.SecondaryButton onClick={handleVoltar}>◀️Voltar</S.SecondaryButton>}
          {step < 3 ? (
            <S.PrimaryButton onClick={handleAvancar}>
              {step === 2 ? '📝Revisar' : '✅Avançar'}
            </S.PrimaryButton>
          ) : (
            <S.PrimaryButton onClick={salvarRefeicao}>🍽️Salvar Refeição</S.PrimaryButton>
          )}
        </S.ButtonContainer>
      </S.Modal>
    </S.Overlay>
  );
};

export default EditarRefeicao;