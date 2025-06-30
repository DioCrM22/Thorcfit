// src/pages/Alimentacao/CadastroAlimentoPopup/index.js
import React, { useState } from 'react';
import * as S from './styles';

const CadastroAlimentoPopup = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    nome: '',
    calorias: '',
    proteinas: '',
    carboidratos: '',
    gorduras: '',
    fibras: '',
    porcao_padrao: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fieldConfigs = {
    nome: { label: 'Nome do Alimento', type: 'text', unit: '', placeholder: 'Ex.: Arroz branco' },
    calorias: { label: 'Calorias', type: 'number', unit: 'kcal', placeholder: 'Ex.: 130' },
    proteinas: { label: 'Proteínas', type: 'number', unit: 'g', placeholder: 'Ex.: 2.5' },
    carboidratos: { label: 'Carboidratos', type: 'number', unit: 'g', placeholder: 'Ex.: 28' },
    gorduras: { label: 'Gorduras', type: 'number', unit: 'g', placeholder: 'Ex.: 0.3' },
    fibras: { label: 'Fibras', type: 'number', unit: 'g', placeholder: 'Ex.: 1.5' },
    porcao_padrao: { label: 'Porção Padrão', type: 'text', unit: '', placeholder: 'Ex.: 100g' },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:3001/api/alimentacao/alimentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        onSave(data.alimento);
        onClose();
      } else {
        setErrorMsg(data.error || 'Erro ao cadastrar alimento');
      }

    } catch (err) {
      console.error('Erro ao cadastrar alimento:', err);
      setErrorMsg('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
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

        <S.Content>
          <S.Form onSubmit={handleSubmit}>
            {Object.entries(fieldConfigs).map(([field, config]) => (
              <S.InputGroup key={field}>
                <S.Label htmlFor={field}>{config.label}</S.Label>
                <S.InputWrapper>
                  <S.Input
                    id={field}
                    name={field}
                    type={config.type}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={config.placeholder}
                    step="any"
                    required={['nome', 'calorias'].includes(field)}
                  />
                  {config.unit && <S.Unit>{config.unit}</S.Unit>}
                </S.InputWrapper>
              </S.InputGroup>
            ))}

            {errorMsg && <S.ErrorMessage>{errorMsg}</S.ErrorMessage>}

            <S.ButtonContainer>
              <S.SecondaryButton type="button" onClick={onClose} disabled={loading}>
                Cancelar
              </S.SecondaryButton>
              <S.PrimaryButton type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </S.PrimaryButton>
            </S.ButtonContainer>
          </S.Form>
        </S.Content>
      </S.Modal>
    </S.Overlay>
  );
};

export default CadastroAlimentoPopup;