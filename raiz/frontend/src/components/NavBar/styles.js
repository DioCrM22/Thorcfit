import styled from 'styled-components';

export const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const Title = styled.h1`
  margin: 0 auto;
  font-size: 1.8rem;
  font-weight: 700;
  font-family: "Golos Text", sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;

  & > span:first-child {
    color: #0066cc;
  }

  & > span:last-child {
    color: #ff7f00;
  }
`;
