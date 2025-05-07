import React, { useState } from 'react';
import Amigos from './Amigos';
import DaySelector from './DaySelector';
import NavBar from './NavBar';
import Sidebar from './SideBar';
import SolicitacoesAmizade from './SolicitacoesAmizade';
import * as S from './styles';
import Tabs from '../../components/Tabs';
import Chart from '../../components/PieChart';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Treino');
  const [activeDay, setActiveDay] = useState('SEG');
  const [showAmigos, setShowAmigos] = useState(false);
  const [showSolicitacoes, setShowSolicitacoes] = useState(false);

  const chartData = [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
    { name: 'C', value: 300 },
    { name: 'D', value: 200 },
  ];

  return (
    <S.Page>
      <NavBar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <S.Content>
        <S.FloatingButtons>
          <S.SolicitacoesButton onClick={() => setShowSolicitacoes(!showSolicitacoes)}>
            ✉️
          </S.SolicitacoesButton>
          <S.AmigosButton onClick={() => setShowAmigos(!showAmigos)}>
            👥
          </S.AmigosButton>
        </S.FloatingButtons>

        {showSolicitacoes && <SolicitacoesAmizade />}
        {showAmigos && <Amigos />}

        <S.CenteredLogo>
          <img src="/assets/images/logo.png" alt="Logo ThorcFit" />
          <S.SectionTitle>Rendimento🚀</S.SectionTitle>
        </S.CenteredLogo>

        <Tabs tabs={['Treino', 'Alimentação']} active={activeTab} onChange={setActiveTab} />
        <DaySelector
          days={['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']}
          activeDay={activeDay}
          onSelect={setActiveDay}
        />
        <Chart data={chartData} />
      </S.Content>
    </S.Page>
  );
}