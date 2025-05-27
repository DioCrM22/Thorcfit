import React, { useState } from 'react';
import * as S from './styles';

const CadastroAlimentoPopup = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    nome: '', 
    calorias: '', 
    proteinas: '', 
    carboidratos: '', 
    gorduras: '', 
    porcao_padrao: ''
  });

  const fieldConfigs = {
    nome: { label: 'Nome do Alimento', type: 'text', unit: '' },
    calorias: { label: 'Calorias', type: 'number', unit: 'kcal' },
    proteinas: { label: 'Proteínas', type: 'number', unit: 'g' },
    carboidratos: { label: 'Carboidratos', type: 'number', unit: 'g' },
    gorduras: { label: 'Gorduras', type: 'number', unit: 'g' },
    porcao_padrao: { label: 'Porção Padrão', type: 'text', unit: '' }
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
        <S.Bubble />
        <S.Bubble />
        
        <S.Header>
          <h2>Cadastrar Alimento</h2>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.Header>
        
        <S.Form onSubmit={handleSubmit}>
          <div style={{ maxHeight: '30vh', overflowY: 'auto', paddingRight: '5px' }}>
            {Object.entries(fieldConfigs).map(([field, config]) => (
              <S.InputContainer key={field}>
                <S.Label htmlFor={field}>{config.label}</S.Label>
                <S.InputWrapper>
                  <S.Input
                    type={config.type}
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    min={config.type === 'number' ? '0' : undefined}
                    step={field === 'calorias' ? '1' : '0.1'}
                    hasUnit={!!config.unit}
                    placeholder={`Digite ${config.label.toLowerCase()}`}
                  />
                  {config.unit && <S.Unit>{config.unit}</S.Unit>}
                </S.InputWrapper>
              </S.InputContainer>
            ))}
          </div>
          
          <S.ButtonContainer>
            <S.SecondaryButton type="button" onClick={onClose}>
              Cancelar
            </S.SecondaryButton>
            <S.PrimaryButton type="submit">
              Salvar Alimento
            </S.PrimaryButton>
          </S.ButtonContainer>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
};

export default CadastroAlimentoPopup;