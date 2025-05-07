import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 16px 0;
  border-bottom: 2px solid #eee;
  width: 100%;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 4px solid ${({ active }) => active ? '#0066cc' : 'transparent'};
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ active }) => active ? '#0066cc' : '#555'};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background-color: #f5f5f5;
    color: #0066cc;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;