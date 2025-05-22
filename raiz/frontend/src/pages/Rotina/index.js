
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import DaySelector from '../Home/DaySelector';
import * as S from './styles';

export default function Home() {
  const [setSidebarOpen] = useState(false);
  const [activeDay, setActiveDay] = useState('SEG');

  return (
    <S.Page>
      <NavBar onMenuClick={() => setSidebarOpen(true)} />
      <S.Content>
        <S.CenteredLogo>
          <img src="/assets/images/logo.png" alt="Logo ThorcFit" />
          <S.SectionTitle>Rendimento🚀</S.SectionTitle>
        </S.CenteredLogo>
        <DaySelector
          days={['DOM','SEG','TER','QUA','QUI','SEX','SAB']}
          activeDay={activeDay}
          onSelect={setActiveDay}
        />
      </S.Content>
    </S.Page>
  );
}
