// Arquivo: ResetPassword.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { 
  Container, 
  FormBox, 
  LogoIcon, 
  Title, 
  AnimatedSpan, 
  FooterText, 
  MessageBox,
  PasswordRules,
  ValidationItem,
  StrengthMessage
} from './styles';

// Código mockado para demonstração (em produção isso deve vir do backend)
const MOCK_CODE = '123456';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    if (!location.state?.email) {
      navigate('/forgot-password');
    }
    setEmail(location.state.email);
  }, [location, navigate]);

  const validatePassword = (password) => {
    const validations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidations(validations);
    return Object.values(validations).every(v => v);
  };

  const allValidationsMet = Object.values(passwordValidations).every(v => v);
  const passwordStrength = allValidationsMet ? 'strong' : 'weak';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // Validação do código
      if (code !== MOCK_CODE) {
        throw new Error('❗ Código inválido');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('❗ As senhas não coincidem');
      }

      if (!validatePassword(newPassword)) {
        throw new Error('❗ Senha não atende aos requisitos');
      }

      const errorMessage = await resetPassword(email, code, newPassword);
      
      if (errorMessage) {
        throw new Error(errorMessage);
      }

      alert('✅ Senha redefinida com sucesso!');
      navigate('/signin');
      
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
        <Title>Redefinir <AnimatedSpan>Senha</AnimatedSpan></Title>

        {message && <MessageBox type="success">{message}</MessageBox>}
        {error && <MessageBox type="error">{error}</MessageBox>}

        <Input
          type="text"
          placeholder="Código de verificação"
          emoji="🔑"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          maxLength="6"
          required
        />

        <Input
          type="password"
          placeholder="Nova senha"
          emoji="🔒"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
          minLength="8"
        />

        <Input
          type="password"
          placeholder="Confirme a nova senha"
          emoji="🔒"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength="8"
        />

        <PasswordRules>
          {!allValidationsMet ? (
            <>
              <ValidationItem $valid={passwordValidations.length}>
                {passwordValidations.length ? '✓' : '✖'} Mínimo 8 caracteres
              </ValidationItem>
              <ValidationItem $valid={passwordValidations.uppercase}>
                {passwordValidations.uppercase ? '✓' : '✖'} Letra maiúscula
              </ValidationItem>
              <ValidationItem $valid={passwordValidations.lowercase}>
                {passwordValidations.lowercase ? '✓' : '✖'} Letra minúscula
              </ValidationItem>
              <ValidationItem $valid={passwordValidations.number}>
                {passwordValidations.number ? '✓' : '✖'} Número
              </ValidationItem>
              <ValidationItem $valid={passwordValidations.specialChar}>
                {passwordValidations.specialChar ? '✓' : '✖'} Caractere especial
              </ValidationItem>
            </>
          ) : (
            <StrengthMessage $strength={passwordStrength}>
              Senha Forte
            </StrengthMessage>
          )}
        </PasswordRules>

        <Button 
          type="submit"
          disabled={!allValidationsMet || newPassword !== confirmPassword}
        >
          ✅ Redefinir Senha
        </Button>
        
        <FooterText>
          Lembrou sua senha? <Link to="/signin">Fazer login</Link>
        </FooterText>
      </FormBox>
    </Container>
  );
};

export default ResetPassword;