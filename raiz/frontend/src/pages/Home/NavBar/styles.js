import styled from 'styled-components';

export const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding:  15px 15px 15px 10px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const Title = styled.h1`
  margin: 50px 80px;
  font-size: 1.9rem;
  font-weight: 700;
  font-family: "Golos Text", sans-serif;
  display: flex;
  align-items: left;
  gap: 9px;

  & > span:first-child {
    color: #0066cc;
  }

  & > span:last-child {
    color: #ff7f00;
  }
`;
