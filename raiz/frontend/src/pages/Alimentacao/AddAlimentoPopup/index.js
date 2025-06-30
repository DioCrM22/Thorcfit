// src/pages/Alimentacao/AddAlimentoPopup/index.js
import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import CadastroAlimentoPopup from '../CadastroAlimentoPopup';

const AddAlimentoPopup = ({ isOpen, onClose, onSave, mealId }) => {
  const [alimentos, setAlimentos] = useState([]);
  const [selectedAlimento, setSelectedAlimento] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [porcao, setPorcao] = useState('g');
  const [showCadastro, setShowCadastro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAlimentos, setFilteredAlimentos] = useState([]);

  // Carregar alimentos do backend
  useEffect(() => {
    const loadAlimentos = async () => {
      if (!isOpen) return;

      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/alimentacao/alimentos', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const alimentosData = await response.json();
          setAlimentos(alimentosData);
          setFilteredAlimentos(alimentosData);
        } else {
          console.error('Erro ao carregar alimentos');
          setAlimentos(mockAlimentos);
          setFilteredAlimentos(mockAlimentos);
        }
      } catch (err) {
        console.error('Erro ao carregar alimentos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAlimentos();
  }, [isOpen]);

  // Filtrar alimentos baseado na busca
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAlimentos(alimentos);
    } else {
      const filtered = alimentos.filter(alimento =>
        alimento.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAlimentos(filtered);
    }
  }, [searchTerm, alimentos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAlimento || !quantidade) return;

    const alimentoSelecionado = alimentos.find(a => a.id_alimento === parseInt(selectedAlimento));
    
    // Calcular valores nutricionais baseados na quantidade
    const fatorMultiplicacao = porcao === 'unidade' ? 1 : (parseFloat(quantidade) / 100);// Assumindo valores por 100g
    
    const newFood = {
      id_alimento: alimentoSelecionado.id_alimento,
      nome: alimentoSelecionado.nome,
      quantidade: parseFloat(quantidade),
      porcao: porcao,
      calorias: Math.round(alimentoSelecionado.calorias * fatorMultiplicacao),
      proteinas: parseFloat((alimentoSelecionado.proteinas * fatorMultiplicacao).toFixed(1)),
      carboidratos: parseFloat((alimentoSelecionado.carboidratos * fatorMultiplicacao).toFixed(1)),
      gorduras: parseFloat((alimentoSelecionado.gorduras * fatorMultiplicacao).toFixed(1))
    };

    onSave(newFood);
    
    // Limpar formulário
    setSelectedAlimento(null);
    setQuantidade('');
    setPorcao('g');
    setSearchTerm('');
    onClose();
  };

  const handleNovoAlimento = () => {
    setShowCadastro(true);
  };

  const handleAlimentoCadastrado = (newAlimento) => {
    if (!newAlimento || !newAlimento.id_alimento) {
      console.error('Alimento salvo sem ID:', newAlimento);
      return;
    }

    setShowCadastro(false);
    setAlimentos(prev => [...prev, newAlimento]);
    setFilteredAlimentos(prev => [...prev, newAlimento]);
    setSelectedAlimento(newAlimento.id_alimento.toString());
  };


  const handleAlimentoSelect = (alimentoId) => {
    setSelectedAlimento(alimentoId);
    const alimento = alimentos.find(a => a.id_alimento === parseInt(alimentoId));
    if (alimento && alimento.porcao_padrao) {
      setPorcao(alimento.porcao_padrao);
    }
  };

  if (!isOpen) return null;

  const alimentoSelecionado = selectedAlimento ? 
    alimentos.find(a => a.id_alimento === parseInt(selectedAlimento)) : null;

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
                    onChange={e => handleAlimentoSelect(e.target.value)} 
                    required
                    disabled={loading}
                  >
                    <option value="">
                      {loading ? 'Carregando...' : 'Selecione um alimento'}
                    </option>
                    {filteredAlimentos.map((a) => (
                      <option key={a.id_alimento} value={a.id_alimento}>
                        {a.nome} ({Math.round(a.calorias)} kcal/100g)
                      </option>
                    ))}
                  </S.Select>
                </S.InputWrapper>
              </S.InputContainer>

              <S.InputContainer>
                <S.Label htmlFor="quantidade">Quantidade</S.Label>
                <S.InputWrapper>
                  <S.Input
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    min="1"
                    step="0.1"
                    required
                    hasUnit
                  />
                  <S.Select 
                    value={porcao} 
                    onChange={e => setPorcao(e.target.value)}
                    style={{ width: '80px', marginLeft: '8px' }}
                  >
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                    <option value="unidade">un</option>
                    <option value="colher">colher</option>
                    <option value="xícara">xícara</option>
                  </S.Select>
                </S.InputWrapper>
              </S.InputContainer>

              {/* Preview nutricional */}
              {alimentoSelecionado && quantidade && (
                <S.InputContainer>
                  <S.Label>Preview Nutricional</S.Label>
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '12px', 
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}>
                    <div>Calorias: {Math.round(alimentoSelecionado.calorias * (quantidade / 100))} kcal</div>
                    <div>Proteínas: {(alimentoSelecionado.proteinas * (quantidade / 100)).toFixed(1)}g</div>
                    <div>Carboidratos: {(alimentoSelecionado.carboidratos * (quantidade / 100)).toFixed(1)}g</div>
                    <div>Gorduras: {(alimentoSelecionado.gorduras * (quantidade / 100)).toFixed(1)}g</div>
                  </div>
                </S.InputContainer>
              )}
            </div>
            
            <S.ButtonGroup>
              <S.PrimaryButton type="submit" disabled={!selectedAlimento || !quantidade}>
                <FiPlusCircle />Adicionar
              </S.PrimaryButton>

              <S.SecondaryButton type="button" onClick={handleNovoAlimento}>
                🍰 Novo Alimento
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