// src/pages/Alimentacao/AddAlimentoPopup/index.js
import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { FiPlusCircle } from 'react-icons/fi';
import CadastroAlimentoPopup from '../CadastroAlimentoPopup';

const AddAlimentoPopup = ({ isOpen, onClose, onSave, mealId }) => {
  const [alimentos, setAlimentos] = useState([]);
  const [selectedAlimento, setSelectedAlimento] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [showCadastro, setShowCadastro] = useState(false);

  useEffect(() => {
    // Simulação de API - substitua por chamada real
    const mockAlimentos = [
      { id_alimento: 1, nome: 'Ovo', calorias: 70, proteinas: 6, carboidratos: 0.6, gorduras: 5 },
      { id_alimento: 2, nome: 'Arroz Integral', calorias: 110, proteinas: 2.6, carboidratos: 22, gorduras: 0.9 },
      { id_alimento: 3, nome: 'Frango', calorias: 165, proteinas: 31, carboidratos: 0, gorduras: 3.6 }
    ];
    setAlimentos(mockAlimentos);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAlimento || !quantidade) return;

    const alimentoSelecionado = alimentos.find(a => a.id_alimento === parseInt(selectedAlimento));
    
    const newFood = {
      name: alimentoSelecionado.nome,
      calories: Math.round(alimentoSelecionado.calorias * (quantidade / 100)),
      protein: parseFloat((alimentoSelecionado.proteinas * (quantidade / 100)).toFixed(1)),
      carbs: parseFloat((alimentoSelecionado.carboidratos * (quantidade / 100)).toFixed(1)),
      fat: parseFloat((alimentoSelecionado.gorduras * (quantidade / 100)).toFixed(1))
    };

    onSave(newFood);
    onClose();
  };

  const handleNovoAlimento = () => {
    setShowCadastro(true);
  };

  const handleAlimentoCadastrado = (newAlimento) => {
    setShowCadastro(false);
    setAlimentos(prev => [...prev, newAlimento]);
    setSelectedAlimento(newAlimento.id_alimento.toString());
  };

  if (!isOpen) return null;

  return (
    <>
      <S.Overlay>
        <S.Modal>
          <S.Bubble />
          <S.Bubble />
          
          <S.Header>
            <h2>Adicionar Alimento</h2>
            <S.CloseButton onClick={onClose}>✕</S.CloseButton>
          </S.Header>
          
          <S.Form onSubmit={handleSubmit}>
            <div style={{ maxHeight: 'calc(60vh - 180px)', overflowY: 'auto', paddingRight: '8px' }}>
              <S.InputContainer>
                <S.Label>Alimento</S.Label>
                <S.InputWrapper>
                  <S.Select 
                    value={selectedAlimento || ''} 
                    onChange={e => setSelectedAlimento(e.target.value)} 
                    required
                  >
                    <option value="">Selecione um alimento</option>
                    {alimentos.map((a) => (
                      <option key={a.id_alimento} value={a.id_alimento}>{a.nome}</option>
                    ))}
                  </S.Select>
                </S.InputWrapper>
              </S.InputContainer>

              <S.InputContainer>
                <S.Label htmlFor="quantidade">Quantidade (g/ml)</S.Label>
                <S.InputWrapper>
                  <S.Input
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    min="1"
                    step="1"
                    required
                    hasUnit
                  />
                  <S.Unit>g/ml</S.Unit>
                </S.InputWrapper>
              </S.InputContainer>
            </div>
            
            <S.ButtonGroup>
              <S.PrimaryButton type="submit">
                <FiPlusCircle />Adicionar
              </S.PrimaryButton>

              <S.SecondaryButton type="button" onClick={handleNovoAlimento}>🍰 Novo Alimento
              </S.SecondaryButton>
            </S.ButtonGroup>
          </S.Form>
        </S.Modal>
      </S.Overlay>

      {showCadastro && (
        <CadastroAlimentoPopup
          isOpen={showCadastro}
          onClose={() => setShowCadastro(false)}
          onSave={handleAlimentoCadastrado}
        />
      )}
    </>
  );
};

export default AddAlimentoPopup;
