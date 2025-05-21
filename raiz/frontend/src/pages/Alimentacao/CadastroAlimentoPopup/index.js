import React, { useState } from 'react';
import * as S from './styles';

const CadastroAlimentoPopup = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    nome: '', calorias: '', proteinas: '', carboidratos: '', gorduras: '', porcao_padrao: ''
  });

  const fieldConfigs = {
    nome: { label: 'NOME', type: 'text', unit: '' },
    calorias: { label: 'CALORIAS', type: 'number', unit: 'kcal' },
    proteinas: { label: 'PROTEÍNAS', type: 'number', unit: 'g' },
    carboidratos: { label: 'CARBOIDRATOS', type: 'number', unit: 'g' },
    gorduras: { label: 'GORDURAS', type: 'number', unit: 'g' },
    porcao_padrao: { label: 'PORÇÃO PADRÃO', type: 'text', unit: '' }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Modal>
        <S.Header>
          <h2>CADASTRAR ALIMENTO</h2>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.Header>
        <S.Form onSubmit={handleSubmit}>
          {Object.entries(fieldConfigs).map(([field, config]) => (
            <S.InputContainer key={field}>
              <S.Label>{config.label}</S.Label>
              <S.InputWrapper>
                <S.Input
                  type={config.type}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  min={config.type === 'number' ? '0' : undefined}
                  step={field === 'calorias' ? '1' : '0.1'}
                  hasUnit={!!config.unit}
                />
                {config.unit && <S.Unit>{config.unit}</S.Unit>}
              </S.InputWrapper>
            </S.InputContainer>
          ))}
          <S.ButtonContainer>
            <S.SecondaryButton type="button" onClick={onClose}>
              CANCELAR
            </S.SecondaryButton>
            <S.PrimaryButton type="submit">
              SALVAR
            </S.PrimaryButton>
          </S.ButtonContainer>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
};

export default CadastroAlimentoPopup;