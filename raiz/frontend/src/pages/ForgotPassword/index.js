import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from '../../contexts/NotificationContext';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import { useAuth } from "../../hooks/useAuth";
import {
  Container,
  FormBox,
  LogoIcon,
  Title,
  ErrorMessage,
  InfoMessage,
  AnimatedSpan,
  FooterText,
  ValidationItem
} from "./styles";

const ForgotPassword = () => {
  const { forgotPassword, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    isNew: true
  });
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { notify } = useNotification();

  // Validação da senha
  const validatePassword = (pwd) => {
    const v = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      isNew: true 
    };
    setValidations(v);
    return Object.values(v).slice(0, 5).every(Boolean); 
  };

  // Primeira regra não atendida
  const firstMissing = () => {
    if (!validations.length) return "Mínimo 8 caracteres";
    if (!validations.uppercase) return "Ao menos 1 letra maiúscula";
    if (!validations.lowercase) return "Ao menos 1 letra minúscula";
    if (!validations.number) return "Ao menos 1 número";
    if (!validations.specialChar) return "Ao menos 1 caractere especial";
    if (!validations.isNew) return "Não pode ser a senha anterior";
    return null;
  };

  // Verifica e-mail
  const handleForgot = async () => {
    setError("");
    if (!email.trim()) {
      notify("⚠️ Digite seu e‑mail!", "error");
      return;
    }
  
    try {
      const errorMessage = await forgotPassword(email);
      
      if (errorMessage) {
        notify(`❌ ${errorMessage}`, "error");
        if (errorMessage.includes("não encontrado")) {
          setEmail(""); 
        }
      } else {
        notify("✅ E-mail verificado. Você pode redefinir sua senha.", "success");
        setShowPopup(true);
      }
    } catch (err) {
      notify("❌ Erro ao verificar e-mail", "error");
    }
  };
  
  const handleReset = async () => {
    setError("");
    
    if (!validatePassword(newPassword)) {
      notify("❗ " + firstMissing(), "error");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      notify("❌ As senhas não conferem", "error");
      return;
    }
  
    try {
      const errorMessage = await resetPassword(email, newPassword);
      if (errorMessage) {
        if (errorMessage.includes("igual")) {
          setValidations(prev => ({...prev, isNew: false}));
        }
        notify(`❌ ${errorMessage}`, "error");
      } else {
        notify("✅ Senha redefinida com sucesso!", "success");
        navigate("/login");
      }
    } catch (err) {
      notify("❌ Falha na conexão com o servidor", "error");
    }
  };

  return (
    <>
      <Container>
        <FormBox>
          <LogoIcon>
              <img src="/assets/images/logo.png" alt="Logo" />
          </LogoIcon>
          <Title>Esqueci a <AnimatedSpan>Senha</AnimatedSpan></Title>

          <Input
            type="email"
            placeholder="Seu e‑mail"
            emoji="📧"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button onClick={handleForgot}>✅ Verificar E-mail</Button>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FooterText>
            Lembrou? <Link to="/">Faça Login</Link>
          </FooterText>
        </FormBox>
      </Container>

      <Popup show={showPopup} onClose={() => setShowPopup(false)} style={{width: '90%', maxWidth: '500px', padding: '20px','@media (max-width: 480px)': { padding: '15px', }}}>
        <LogoIcon>
          <img src="/assets/images/LogoForte.png" alt="Logo" />
        </LogoIcon>
        <Title>Redefinir <AnimatedSpan>Senha</AnimatedSpan></Title>

        <Input
          type="password"
          placeholder=" Nova senha"
          emoji="🔒"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            validatePassword(e.target.value);
            // Reseta a validação da senha anterior ao digitar
            setValidations(prev => ({ ...prev, isNew: true }));
          }}
        />

        <div style={{  marginTop: "10px", fontSize: "0.9rem",'@media (max-width: 480px)': { fontSize: '0.8rem'} }}>
          {firstMissing() ? (
            <ValidationItem>✗ {firstMissing()}</ValidationItem>
          ) : (
            <InfoMessage>✓ Senha Forte e Válida</InfoMessage>
          )}
          
          {/* Mensagem específica para senha igual à anterior */}
          {!validations.isNew && (
            <ValidationItem style={{ color: '#ff4444' }}>
              ✗ Não pode ser a senha anterior
            </ValidationItem>
          )}
        </div>

        <Input
          type="password"
          placeholder="Confirme a senha"
          emoji="🔒"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            // Reseta a validação ao digitar
            setValidations(prev => ({ ...prev, isNew: true }));
          }}
        />

        {confirmPassword && confirmPassword !== newPassword && (
          <ErrorMessage>
            ❌ Senhas não conferem
          </ErrorMessage>
        )}

        <Button 
          onClick={handleReset}
          disabled={!validations.length || !validations.uppercase || 
                  !validations.lowercase || !validations.number || 
                  !validations.specialChar}
        >
          ✅ Redefinir Senha
        </Button>
      </Popup>
    </>
  );
};

export default ForgotPassword;