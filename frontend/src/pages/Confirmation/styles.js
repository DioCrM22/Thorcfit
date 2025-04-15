import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`;

export const MessageBox = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 2rem 0;

  p {
    margin: 1rem 0;
    line-height: 1.6;
  }

  strong {
    color: #646cff;
  }
`;

export const Title = styled.h1`
  color: #213547;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;