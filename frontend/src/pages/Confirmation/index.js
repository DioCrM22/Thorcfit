import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, MessageBox, Title } from './styles';

const ConfirmationPage = () => {
  const location = useLocation();
  const email = location.state?.email || 'seu e-mail';

  return (
    <Container>
      <Title>Confirmação de E-mail</Title>
      <MessageBox>
        <p>📨 Enviamos um link de confirmação para <strong>{email}</strong></p>
        <p>Verifique sua caixa de entrada e spam.</p>
        <p>Após confirmar, você já pode fazer login!</p>
      </MessageBox>
    </Container>
  );
};

export default ConfirmationPage;