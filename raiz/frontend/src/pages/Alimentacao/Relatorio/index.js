// src/pages/Alimentacao/Relatorio/index.js
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RelatorioPDF from './RelatorioPDF';
import * as S from './styles';
import { FiDownload, FiAlertCircle, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';

const RelatorioUsuario = () => {
  const { user } = useAuth();
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [vinculoNutricional, setVinculoNutricional] = useState(null);

  // Definir datas padrão (última semana)
  useEffect(() => {
    const hoje = new Date();
    const umaSemanaAtras = new Date(hoje);
    umaSemanaAtras.setDate(hoje.getDate() - 7);
    
    setDataFim(hoje.toISOString().split('T')[0]);
    setDataInicio(umaSemanaAtras.toISOString().split('T')[0]);
  }, []);

  // Carregar vínculo nutricional
  useEffect(() => {
    const loadVinculo = async () => {
      if (!user?.id_usuario) return;

      try {
        const response = await fetch(`http://localhost:3001/api/vinculos/nutricionais?status=ativo&id_usuario=${user.id_usuario}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const vinculos = await response.json();
          if (vinculos.length > 0) {
            setVinculoNutricional(vinculos[0]);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar vínculo nutricional:', err);
      }
    };

    loadVinculo();
  }, [user]);

  // Gerar relatório
  const gerarRelatorio = async () => {
    if (!user?.id_usuario || !dataInicio || !dataFim) return;

    try {
      setLoading(true);
      setError(null);

      // Carregar dados do período
      const [diarioResponse, metricasResponse] = await Promise.all([
        fetch(`http://localhost:3001/api/alimentacao/relatorio/${user.id_usuario}?inicio=${dataInicio}&fim=${dataFim}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch(`http://localhost:3001/api/metricas/usuario/${user.id_usuario}/periodo?inicio=${dataInicio}&fim=${dataFim}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      let dadosAlimentacao = [];
      let dadosMetricas = [];

      if (diarioResponse.ok) {
        dadosAlimentacao = await diarioResponse.json();
      }

      if (metricasResponse.ok) {
        dadosMetricas = await metricasResponse.json();
      }

      // Processar dados para o relatório
      const relatorioData = processarDadosRelatorio(dadosAlimentacao, dadosMetricas);
      setRelatorio(relatorioData);

    } catch (err) {
      console.error('Erro ao gerar relatório:', err);
      setError('Erro ao gerar relatório. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const processarDadosRelatorio = (dadosAlimentacao, dadosMetricas) => {
    // Calcular médias e totais
    const totalDias = dadosAlimentacao.length;
    
    const medias = dadosAlimentacao.reduce((acc, dia) => {
      acc.calorias += dia.total_calorias || 0;
      acc.proteinas += dia.total_proteinas || 0;
      acc.carboidratos += dia.total_carboidratos || 0;
      acc.gorduras += dia.total_gorduras || 0;
      acc.agua += dia.agua_ml || 0;
      return acc;
    }, { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0, agua: 0 });

    // Calcular médias
    Object.keys(medias).forEach(key => {
      medias[key] = totalDias > 0 ? Math.round(medias[key] / totalDias) : 0;
    });

    // Organizar refeições por dia
    const refeicoesPorDia = dadosAlimentacao.map(dia => ({
      data: new Date(dia.data).toLocaleDateString('pt-BR'),
      refeicoes: dia.refeicoes || [],
      totais: {
        calorias: dia.total_calorias || 0,
        proteinas: dia.total_proteinas || 0,
        carboidratos: dia.total_carboidratos || 0,
        gorduras: dia.total_gorduras || 0,
        agua: dia.agua_ml || 0
      }
    }));

    // Métricas corporais
    const metricasRecentes = dadosMetricas.length > 0 ? dadosMetricas[dadosMetricas.length - 1] : null;

    return {
      usuario: user.nome,
      periodo: `${new Date(dataInicio).toLocaleDateString('pt-BR')} a ${new Date(dataFim).toLocaleDateString('pt-BR')}`,
      nutricionista: vinculoNutricional?.nutricionista?.nome || 'Não vinculado',
      medias,
      refeicoesPorDia,
      metricas: metricasRecentes,
      totalDias,
      recomendacoes: gerarRecomendacoes(medias, metricasRecentes)
    };
  };

  const gerarRecomendacoes = (medias, metricas) => {
    const recomendacoes = [];

    if (medias.agua < 2000) {
      recomendacoes.push('Aumentar o consumo de água para pelo menos 2L por dia');
    }

    if (medias.proteinas < 80) {
      recomendacoes.push('Incluir mais fontes de proteína nas refeições');
    }

    if (medias.calorias < 1500) {
      recomendacoes.push('Considerar aumentar a ingestão calórica total');
    }

    if (metricas && metricas.imc > 25) {
      recomendacoes.push('Manter atividade física regular e dieta balanceada');
    }

    if (recomendacoes.length === 0) {
      recomendacoes.push('Continue mantendo seus bons hábitos alimentares!');
    }

    return recomendacoes;
  };

  return (
    <S.Container>
      <S.Titulo>Relatório Nutricional</S.Titulo>

      {/* Seletor de período */}
      <S.Sessao>
        <h3><FiCalendar /> Período do Relatório</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label>Data Início:</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </div>
          <div>
            <label>Data Fim:</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </div>
          <button 
            onClick={gerarRelatorio}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Atualizar Relatório
          </button>
        </div>
      </S.Sessao>

      {loading ? (
        <S.Loading>Gerando relatório...</S.Loading>
      ) : error ? (
        <S.MensagemAguardando>
          <FiAlertCircle size={32} />
          <p>{error}</p>
        </S.MensagemAguardando>
      ) : relatorio ? (
        <>
          <S.Data>Período: {relatorio.periodo}</S.Data>
          {vinculoNutricional && (
            <S.Data>Nutricionista: {relatorio.nutricionista}</S.Data>
          )}

          <S.Sessao>
            <h3>Médias do Período ({relatorio.totalDias} dias)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <strong>Calorias:</strong> {relatorio.medias.calorias} kcal/dia
              </div>
              <div>
                <strong>Proteínas:</strong> {relatorio.medias.proteinas}g/dia
              </div>
              <div>
                <strong>Carboidratos:</strong> {relatorio.medias.carboidratos}g/dia
              </div>
              <div>
                <strong>Gorduras:</strong> {relatorio.medias.gorduras}g/dia
              </div>
              <div>
                <strong>Água:</strong> {relatorio.medias.agua}ml/dia
              </div>
            </div>
          </S.Sessao>

          {relatorio.metricas && (
            <S.Sessao>
              <h3>Métricas Corporais</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                {relatorio.metricas.peso && <div><strong>Peso:</strong> {relatorio.metricas.peso} kg</div>}
                {relatorio.metricas.altura && <div><strong>Altura:</strong> {relatorio.metricas.altura} cm</div>}
                {relatorio.metricas.imc && <div><strong>IMC:</strong> {relatorio.metricas.imc.toFixed(1)}</div>}
                {relatorio.metricas.percentual_gordura && <div><strong>% Gordura:</strong> {relatorio.metricas.percentual_gordura}%</div>}
              </div>
            </S.Sessao>
          )}

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
            fileName={`relatorio-nutricional-${dataInicio}-${dataFim}.pdf`}
            style={{ textDecoration: 'none' }}
          >
            {({ loading: pdfLoading }) => (
              <S.BotaoBaixar disabled={pdfLoading}>
                <FiDownload /> {pdfLoading ? 'Gerando PDF...' : 'Baixar PDF'}
              </S.BotaoBaixar>
            )}
          </PDFDownloadLink>
        </>
      ) : (
        <S.MensagemAguardando>
          <FiAlertCircle size={32} />
          <p>Nenhum dado encontrado para o período selecionado.</p>
          <span>Tente selecionar um período diferente.</span>
        </S.MensagemAguardando>
      )}
    </S.Container>
  );
};

export default RelatorioUsuario;