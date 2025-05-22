import React, { useState, useEffect } from 'react';
import * as S from './styles';
import CadastroAlimentoPopup from '../CadastroAlimentoPopup';

const AddAlimentoPopup = ({ isOpen, onClose, onSave, mealId }) => {
  const [alimentos, setAlimentos] = useState([]);
  const [idAlimento, setIdAlimento] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [porcao, setPorcao] = useState('');
  const [showCadastro, setShowCadastro] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/alimentos')
        .then(res => res.json())
        .then(data => setAlimentos(data))
        .catch(err => console.error(err));
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/alimento_refeicao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_refeicao: mealId,
        id_alimento: idAlimento,
        quantidade,
        porcao
      })
    }).then(res => {
      if (res.ok) onSave();
      onClose();
    });
  };

  const handleNovoAlimento = () => {
    setShowCadastro(true);
  };

  const handleAlimentoCadastrado = () => {
    setShowCadastro(false);
    fetch('/api/alimentos')
      .then(res => res.json())
      .then(data => setAlimentos(data));
  };

  if (!isOpen) return null;

  return (
    <>
      <S.Overlay>
        <S.Modal>
          <S.Header>
            <h2>Adicionar Alimento</h2>
            <button onClick={onClose}>✕</button>
          </S.Header>
          <S.Form onSubmit={handleSubmit}>
            <label>Alimento</label>
            <select value={idAlimento} onChange={e => setIdAlimento(e.target.value)} required>
              <option value="">Selecione</option>
              {alimentos.map((a) => (
                <option key={a.id_alimento} value={a.id_alimento}>{a.nome}</option>
              ))}
            </select>

            <label>Quantidade</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />

            <label>Porção</label>
            <input
              type="text"
              value={porcao}
              onChange={(e) => setPorcao(e.target.value)}
              required
            />

            <S.ButtonGroup>
              <S.SecondaryButton type="button" onClick={handleNovoAlimento}>
                Cadastrar novo alimento
              </S.SecondaryButton>
              <S.SaveButton type="submit">Salvar</S.SaveButton>
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
