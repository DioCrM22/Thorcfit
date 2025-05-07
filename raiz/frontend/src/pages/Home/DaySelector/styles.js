import styled from 'styled-components';

export const DaysContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 24px 0;
`;

export const Days = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px;
  overflow-x: auto;
  max-width: 100%;
  
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #0066cc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  @media (max-width: 932px) {
    gap: 2px;
    padding: 2px;
  }

  @media (max-width: 480px) {
    gap: 4px;
    padding: 4px;
  }
`;

export const Day = styled.button`
  padding: 10px 16px;
  min-width: 60px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: ${({ active }) => active ? '#0066cc' : '#fff'};
  color: ${({ active }) => active ? '#fff' : '#333'};
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-color: #0066cc;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    min-width: 55px;
    padding: 8px 14px;
    font-size: 14px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    min-width: 50px;
    padding: 6px 12px;
    font-size: 13px;
    border-radius: 8px;
  }
`;