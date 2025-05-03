// components/DaySelector/styles.js
import styled from 'styled-components';

export const Days = styled.div`
  display: flex;
  gap: 4px;
  margin: 16px 0;
`;

export const Day = styled.button`
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: ${({ active }) => active ? '#0066cc' : '#fff'};
  color: ${({ active }) => active ? '#fff' : '#333'};
  cursor: pointer;
`;