// components/DaySelector/index.js
import React from 'react';
import * as S from './styles';

export default function DaySelector({ days, activeDay, onSelect }) {
  return (
    <S.Days>
      {days.map(day => (
        <S.Day
          key={day}
          active={day === activeDay}
          onClick={() => onSelect(day)}
        >
          {day}
        </S.Day>
      ))}
    </S.Days>
  );
}
