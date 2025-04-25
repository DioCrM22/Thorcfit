import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Message } from './styles';

const EmailConfirmationHandler = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verificando token...');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/confirmar-email/${token}`
        );
        
        if (response.data.success) {
          setMessage('E-mail confirmado com sucesso! Você já pode fazer login.');
          setTimeout(() => navigate('/signin'), 5000);
        } else {
          setMessage('Token inválido ou expirado.');
        }
      } catch (error) {
        setMessage('Erro ao confirmar e-mail. Tente novamente mais tarde.');
      }
    };

    confirmEmail();
  }, [token, navigate]);

  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default EmailConfirmationHandler;