// src/pages/Signup/index.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  AnimatedSpan,
  SuccessPopupOverlay,
  SuccessPopupContent,
  SuccessPopupLogo,
  SuccessPopupTitle
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // Validações de senha
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // Estados para controle de campos tocados
  const [fieldTouched, setFieldTouched] = useState({
    nome: false,
    email: false,
    emailConf: false,
    senha: false,
    senhaConf: false
  });

  // Função para validar caracteres do nome
  const validateNameCharacters = (name) => {
    // Permite letras, espaços, hífens e caracteres acentuados
    return /^[a-zA-ZÀ-ÿ\s-]+$/.test(name);
  };

  // Formatação do nome
  const formatName = (name) => {
    // Remove caracteres inválidos
    let formatted = name.replace(/[^a-zA-ZÀ-ÿ\s-]/g, '');
    // Remove múltiplos espaços
    formatted = formatted.replace(/\s{2,}/g, ' ');
    // Formata capitalização
    return formatted.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Handlers de mudança
  const handleNomeChange = (e) => {
    const rawValue = e.target.value;
    
    // Verifica caracteres inválidos
    if (!validateNameCharacters(rawValue) && rawValue !== "") {
      notify("⚠️ O nome deve conter apenas letras, espaços e hífens", "warning");
      return;
    }
    
    setNome(formatName(rawValue));
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

  // Handler para quando o campo perde o foco
  const handleBlur = (fieldName) => {
    setFieldTouched({ ...fieldTouched, [fieldName]: true });
    validateField(fieldName);
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

  const validateNome = (nome) => {
    const trimmed = nome.trim();
    // Verifica quantidade de palavras, tamanho e caracteres válidos
    return trimmed.split(" ").length >= 2 && 
           trimmed.length >= 5 && 
           validateNameCharacters(trimmed);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateEmailConfirmation = (email, emailConf) => email === emailConf;

  const validatePasswordConfirmation = (senha, senhaConf) => senha === senhaConf;

  // Validação individual de campo
  const validateField = (fieldName) => {
    if (!fieldTouched[fieldName]) return;

    switch (fieldName) {
      case 'nome':
        if (!nome.trim()) {
          notify("👤 O campo Nome Completo é obrigatório!", "error");
        } else if (!validateNome(nome)) {
          notify("👤 Digite nome completo válido (mínimo 2 palavras, 5 caracteres, apenas letras, espaços e hífens)!", "error");
        }
        break;
      case 'email':
        if (!email.trim()) {
          notify("📧 O campo E-mail é obrigatório!", "error");
        } else if (!validateEmail(email)) {
          notify("📧 E-mail inválido! Use o formato exemplo@dominio.com", "error");
        }
        break;
      case 'emailConf':
        if (!emailConf.trim()) {
          notify("📧 O campo Confirmação de E-mail é obrigatório!", "error");
        } else if (!validateEmailConfirmation(email, emailConf)) {
          notify("📧 Os e-mails não coincidem!", "error");
        }
        break;
      case 'senha':
        if (!senha) {
          notify("🔓 O campo Senha é obrigatório!", "error");
        } else if (!Object.values(passwordValidations).every(v => v)) {
          notify("🔓 A senha não atende a todos os requisitos de segurança!", "error");
        }
        break;
      case 'senhaConf':
        if (!senhaConf) {
          notify("🔒 O campo Confirmação de Senha é obrigatório!", "error");
        } else if (!validatePasswordConfirmation(senha, senhaConf)) {
          notify("🔒 As senhas não coincidem!", "error");
        }
        break;
      default:
        break;
    }
  };

  // Função para coletar todos os erros
  const getValidationErrors = () => {
    const errors = [];

    if (!nome.trim()) {
      errors.push("👤 O campo Nome Completo é obrigatório!");
    } else if (!validateNome(nome)) {
      errors.push("👤 Nome inválido! Deve conter:\n- Mínimo 2 palavras\n- Mínimo 5 caracteres\n- Apenas letras, espaços e hífens");
    }

    if (!email.trim()) {
      errors.push("📧 O campo E-mail é obrigatório!");
    } else if (!validateEmail(email)) {
      errors.push("📧 E-mail inválido! Use o formato exemplo@dominio.com");
    }

    if (!emailConf.trim()) {
      errors.push("📧 O campo Confirmação de E-mail é obrigatório!");
    } else if (!validateEmailConfirmation(email, emailConf)) {
      errors.push("📧 Os e-mails não coincidem!");
    }

    if (!senha) {
      errors.push("🔓 O campo Senha é obrigatório!");
    } else if (!Object.values(passwordValidations).every(v => v)) {
      errors.push("🔓 A senha não atende a todos os requisitos de segurança!");
    }

    if (!senhaConf) {
      errors.push("🔒 O campo Confirmação de Senha é obrigatório!");
    } else if (!validatePasswordConfirmation(senha, senhaConf)) {
      errors.push("🔒 As senhas não coincidem!");
    }

    return errors;
  };

  const handleSignup = async () => {
    const validationErrors = getValidationErrors();
    
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => notify(error, 'error'));
      return;
    }
  
    try {
      const errorMessage = await signup(nome, email, senha);
      
      if (errorMessage) {
        notify(errorMessage, 'error');
        console.error('Detalhes do erro:', {
          message: errorMessage,
        });
      } else {
        notify('🎉 Cadastro realizado com sucesso!', 'success');
        setShowSuccessPopup(true);
      }
      
    } catch (error) {
      console.error('Erro completo:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });
      
      notify('❌ Erro ao conectar com o servidor', 'error');
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
            onBlur={() => handleBlur('nome')}
          />
        </InputGroup>

        <InputGroup>
          <Input
            type="email"
            placeholder="E-mail"
            emoji="✉"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('email')}
          />
        </InputGroup>

        <InputGroup>
          <Input
            type="email"
            placeholder="Confirme o E-mail"
            emoji="📧"
            value={emailConf}
            onChange={handleEmailConfChange}
            onBlur={() => handleBlur('emailConf')}
          />
        </InputGroup>

        <InputGroup>
          <Input
            type="password"
            placeholder="Crie sua Senha"
            emoji="🔓"
            value={senha}
            onChange={handleSenhaChange}
            onBlur={() => handleBlur('senha')}
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
            onBlur={() => handleBlur('senhaConf')}
          />
        </InputGroup>

        <Button onClick={handleSignup}>🚀 Cadastrar Agora</Button>

        <FooterText>
          Já tem conta? <Link to="/signin">Faça Login ➡️</Link>
        </FooterText>
      </FormBox>

      {showSuccessPopup && (
        <SuccessPopupOverlay>
          <SuccessPopupContent>
            <SuccessPopupLogo>
              <img src="/assets/images/logo.png" alt="Logo" />
            </SuccessPopupLogo>
            <SuccessPopupTitle>Cadastro Concluído!</SuccessPopupTitle>
            <p style={{ marginBottom: '20px' }}>Sua conta foi criada com sucesso!</p>
            <Button 
              onClick={() => {
                setShowSuccessPopup(false);
                navigate('/signin');
              }}
              style={{ width: '100%' }}
            >
              Fazer Login🚀
            </Button>
          </SuccessPopupContent>
        </SuccessPopupOverlay>
      )}
    </Container>
  );
};

export default Signup;