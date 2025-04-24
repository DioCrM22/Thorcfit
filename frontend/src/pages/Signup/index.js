// src/pages/Signup/index.js
import React, { useState } from "react";
import { Link,  useNavigate} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from '../../contexts/NotificationContext';
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  Container,
  FormBox,
  LogoIcon,
  Title,
  ErrorMessage,
  FooterText,
  InputGroup,
  PasswordRules,
  ValidationItem,
  AnimatedSpan
} from "./styles";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const [error, setError] = useState("");
  
  // Validações de senha
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // Formatação do nome
  const formatName = (name) => {
    return name
      .replace(/\s{2,}/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Handlers de mudança
  const handleNomeChange = (e) => {
    setNome(formatName(e.target.value));
    setError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
    setError("");
  };

  const handleEmailConfChange = (e) => {
    setEmailConf(e.target.value.toLowerCase());
    setError("");
  };

  const handleSenhaChange = (e) => {
    const newPassword = e.target.value;
    setSenha(newPassword);
    validatePassword(newPassword);
    setError("");
  };

  const handleSenhaConfChange = (e) => {
    setSenhaConf(e.target.value);
    setError("");
  };

  // Validações
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

  const validateNome = (nome) => nome.trim().split(" ").length >= 2;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Submit do formulário
  const handleSignup = async () => {
    if (!nome || !email || !emailConf || !senha || !senhaConf) {
      notify('Preencha todos os campos!', 'error');
      return;
    }

    if (!validateNome(nome)) {
      notify("👤 Digite nome completo!", "error");
      return;
    }
    
    if (!validateEmail(email)) {
      notify("📧 E-mail inválido!", "error");
      return;
    }

    try {
      const errorMessage = await signup(nome, email, senha);
      if (errorMessage) {
        notify(errorMessage, 'error');
      } else {
        notify('Cadastro realizado com sucesso!', 'success');
        navigate('/signin');
      }
    } catch (error) {
      notify('Erro durante o cadastro', 'error');
    }
  };

  return (
    <Container>
      <FormBox>
        <LogoIcon>
          <img src="/assets/images/logo.png" alt="Logo" />
        </LogoIcon>
        <Title>Crie <AnimatedSpan>sua conta</AnimatedSpan></Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <InputGroup>
          <Input
            type="text"
            placeholder="Nome Completo"
            emoji="👤"
            value={nome}
            onChange={handleNomeChange}
            onBlur={() => {
              setNome(prev => prev.trim());
            }}
          />
        </InputGroup>

        <InputGroup>
          <Input
            type="email"
            placeholder="E-mail"
            emoji="✉"
            value={email}
            onChange={handleEmailChange}
          />
        </InputGroup>

        <InputGroup>
          <Input
            type="email"
            placeholder="Confirme o E-mail"
            emoji="📧"
            value={emailConf}
            onChange={handleEmailConfChange}
          />
        </InputGroup>

        <InputGroup>
          <Input
            type="password"
            placeholder="Crie sua Senha"
            emoji="🔓"
            value={senha}
            onChange={handleSenhaChange}
          />
        </InputGroup>

        <PasswordRules>
          <ValidationItem $valid={passwordValidations.length}>
            ✓ Ter mais de 8 caracteres
          </ValidationItem>
          <ValidationItem $valid={passwordValidations.uppercase}>
            ✓ Letra maiúscula
          </ValidationItem>
          <ValidationItem $valid={passwordValidations.lowercase}>
            ✓ Letra minúscula
          </ValidationItem>
          <ValidationItem $valid={passwordValidations.number}>
            ✓ Número
          </ValidationItem>
          <ValidationItem $valid={passwordValidations.specialChar}>
            ✓ Caractere especial(! , @ , # , $ , * ...)
          </ValidationItem>
        </PasswordRules>

        <InputGroup>
          <Input
            type="password"
            placeholder="Confirme a Senha"
            emoji="🔒"
            value={senhaConf}
            onChange={handleSenhaConfChange}
          />
        </InputGroup>

        <Button onClick={handleSignup}>🚀 Cadastrar Agora</Button>

        <FooterText>
          Já tem conta? <Link to="/">Faça Login ➡️</Link>
        </FooterText>
      </FormBox>
    </Container>
  );
};

export default Signup;