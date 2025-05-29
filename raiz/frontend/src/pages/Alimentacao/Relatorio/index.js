// src/pages/Alimentacao/Relatorio/index.js
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RelatorioPDF from './RelatorioPDF';
import * as S from './styles';
import { FiDownload, FiAlertCircle } from 'react-icons/fi';

const RelatorioUsuario = () => {
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação: substitua por chamada real à API depois
    setTimeout(() => {
      const relatorioMock = {
        nome: "João da Silva",
        data: "29/05/2025",
        agua: { atual: 1800, meta: 2500 },
        nutrientes: {
          calorias: { atual: 1500, meta: 2200 },
          proteina: { atual: 90, meta: 110 },
          carboidrato: { atual: 230, meta: 275 },
          gordura: { atual: 60, meta: 73 }
        },
        refeicoes: [
          { nome: "Café da Manhã", alimentos: ["Pão Integral - 80kcal", "Ovo - 70kcal"] },
          { nome: "Almoço", alimentos: ["Arroz - 200kcal", "Frango - 250kcal"] },
          { nome: "Jantar", alimentos: [] }
        ],
        recomendacoes: [
          "Evitar doces à noite",
          "Aumentar fibras",
          "Manter 2.5L de água por dia"
        ]
      };

      setRelatorio(relatorioMock); // ou null se ainda não enviado
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <S.Container>
      <S.Titulo>Relatório Nutricional</S.Titulo>

      {loading ? (
        <S.Loading>Carregando relatório...</S.Loading>
      ) : relatorio ? (
        <>
          <S.Data>Data: {relatorio.data}</S.Data>

          <S.Sessao>
            <h3>Consumo de Água</h3>
            <p>{relatorio.agua.atual}ml / {relatorio.agua.meta}ml</p>
          </S.Sessao>

          <S.Sessao>
            <h3>Macronutrientes</h3>
            <ul>
              {Object.entries(relatorio.nutrientes).map(([key, val]) => (
                <li key={key}>
                  <strong>{key}:</strong> {val.atual} / {val.meta}
                </li>
              ))}
            </ul>
          </S.Sessao>

          <S.Sessao>
            <h3>Refeições</h3>
            {relatorio.refeicoes.map((ref, i) => (
              <div key={i}>
                <strong>{ref.nome}:</strong>
                {ref.alimentos.length > 0 ? (
                  <ul>
                    {ref.alimentos.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                ) : <p><em>Nenhum alimento registrado</em></p>}
              </div>
            ))}
          </S.Sessao>

          <S.Sessao>
            <h3>Recomendações</h3>
            <ul>
              {relatorio.recomendacoes.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </S.Sessao>

          <PDFDownloadLink
            document={<RelatorioPDF dados={relatorio} />}
            fileName="relatorio-nutricional.pdf"
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <S.BotaoBaixar disabled={loading}>
                <FiDownload /> {loading ? 'Gerando PDF...' : 'Baixar PDF'}
              </S.BotaoBaixar>
            )}
          </PDFDownloadLink>
        </>
      ) : (
        <S.MensagemAguardando>
          <FiAlertCircle size={32} />
          <p>O relatório ainda não foi enviado pela sua nutricionista.</p>
          <span>Volte mais tarde para visualizá-lo ou baixá-lo.</span>
        </S.MensagemAguardando>
      )}
    </S.Container>
  );
};

export default RelatorioUsuario;
