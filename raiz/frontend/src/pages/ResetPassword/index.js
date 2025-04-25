import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, FormBox, LogoIcon, Title, AnimatedSpan, FooterText, MessageBox } from './styles';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) navigate('/error');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (password !== confirmPassword) {
      setError('❗ As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/redefinir-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!response.ok) throw new Error('Falha ao redefinir senha');

      setMessage('✅ Senha redefinida com sucesso!');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setError('❌ ' + (err.message || 'Erro ao redefinir senha'));
    }
  };

  return (
    <Container>
      <FormBox onSubmit={handleSubmit}>
        <LogoIcon>
            <img src="/assets/images/logo.png" alt="Logo" />
        </LogoIcon>
        <Title>Recuperar <AnimatedSpan>Senha</AnimatedSpan></Title>

        {message && <MessageBox type="success">{message}</MessageBox>}
        {error && <MessageBox type="error">{error}</MessageBox>}

        <Input
          type="password"
          placeholder="Nova senha"
          emoji="🔒"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />

        <Input
          type="password"
          placeholder="Confirme a nova senha"
          emoji="🔒"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength="6"
        />

        <Button type="submit">✅ Redefinir Senha</Button>
        <FooterText>
            Lembrou sua senha? <Link to="/signin">Voltar ao Login</Link>
        </FooterText>
      </FormBox>
    </Container>
  );
};

export default ResetPassword;