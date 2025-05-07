// pages/Home/index.js
import React, { useState } from 'react';
import NavBar from '../Home/NavBar';
import Sidebar from '../Home/SideBar';
import Tabs from '../../components/Tabs';
import DaySelector from '../Home/DaySelector';
import Chart from '../../components/PieChart';
import * as S from './styles';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Treino');
  const [activeDay, setActiveDay] = useState('SEG');

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
        <S.CenteredLogo>
          <img src="/assets/images/logo.png" alt="Logo ThorcFit" />
          <S.SectionTitle>Rendimento🚀</S.SectionTitle>
        </S.CenteredLogo>
        <Tabs tabs={['Treino', 'Alimentação']} active={activeTab} onChange={setActiveTab} />
        <DaySelector
          days={['DOM','SEG','TER','QUA','QUI','SEX','SAB']}
          activeDay={activeDay}
          onSelect={setActiveDay}
        />
        <Chart data={chartData} />
      </S.Content>
    </S.Page>
  );
}
