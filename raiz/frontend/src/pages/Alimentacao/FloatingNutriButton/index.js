// src/pages/Alimentacao/FloatingNutriButton/index.js
import React, { useState } from 'react';
import { FiDownload, FiX, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

const FloatingNutriButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleVerRelatorio = () => navigate('/alimentacao/relatorio');

  return (
    <S.Wrapper>
      <S.ToggleButton onClick={toggleMenu} isOpen={isOpen}>
        {isOpen ? <FiX size={24} /> : <FiFileText size={24} />}
      </S.ToggleButton>

      {isOpen && (
        <S.Box>
          <S.Content>
            <S.Title>Plano Nutricional</S.Title>

            <S.TextBlock>
              <p>
                Aqui você poderá <strong>visualizar e baixar</strong> seu relatório nutricional
                completo. Esse relatório é preenchido pela sua <strong>nutricionista</strong> com base
                nas refeições e metas alimentares definidas para você.
              </p>
              <p>
                Assim que sua nutricionista enviar o plano, ele estará disponível para download.
              </p>
            </S.TextBlock>

            <S.ButtonLink onClick={handleVerRelatorio}>
              <FiDownload /> Ver Relatório Nutricional
            </S.ButtonLink>
          </S.Content>
        </S.Box>
      )}
    </S.Wrapper>
  );
};

export default FloatingNutriButton;
