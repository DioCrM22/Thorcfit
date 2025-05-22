import styled from 'styled-components';

export const DaysContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 24px 0;
`;

export const Days = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

export const Day = styled.button`
  flex: 1 0 auto;
  min-width: calc((100% / 7) - 4px);
  max-width: calc((100% / 7) - 4px);
  padding: 0.5rem 0.3rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: ${({ active }) => active ? '#0066cc' : '#fff'};
  color: ${({ active }) => active ? '#fff' : '#333'};
  cursor: pointer;
  font-size: clamp(0.6rem, 1.2vw, 0.9rem);
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-color: #0066cc;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.2rem;
    border-radius: 8px;
    font-size: clamp(0.5rem, 1.1vw, 0.8rem);
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.1rem;
    font-size: clamp(0.45rem, 1vw, 0.7rem);
    min-width: calc((100% / 7) - 2px);
    max-width: calc((100% / 7) - 2px);
  }
`;