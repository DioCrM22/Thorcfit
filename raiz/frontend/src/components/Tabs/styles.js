// components/Tabs/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 16px;
  border-bottom: 2px solid #eee;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  border-bottom: 4px solid ${({ active }) => active ? '#0066cc' : 'transparent'};
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
`;