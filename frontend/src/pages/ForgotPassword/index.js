// src/pages/ForgotPassword/index.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const API = process.env.REACT_APP_API_URL || "";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  // limpa estado ao desmontar
  useEffect(() => {
    return () => {
      setShowPopup(false);
      setError("");
      setInfo("");
    };
  }, []);

  // 1) envia e‑mail com o código
  const handleForgot = async () => {
    setError(""); setInfo("");
    if (!email.trim()) {
      setError("⚠️ Digite seu e‑mail!");
      return;
    }
    const err = await forgotPassword(email);
    if (err) {
      setError(err);
    } else {
      setInfo("🔑 Código enviado para seu e‑mail!");
      setShowPopup(true);
    }
  };

  // 2) valida regras de senha
  const validatePassword = (pwd) => {
    const v = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    };
    setValidations(v);
    return Object.values(v).every(Boolean);
  };

  // exibe só a primeira regra pendente
  const firstMissing = () => {
    if (!validations.length)       return "Mínimo 8 caracteres";
    if (!validations.uppercase)    return "Ao menos 1 letra maiúscula";
    if (!validations.lowercase)    return "Ao menos 1 letra minúscula";
    if (!validations.number)       return "Ao menos 1 número";
    if (!validations.specialChar)  return "Ao menos 1 caractere especial";
    return null;
  };

  // 3) efetiva o reset
  const handleReset = async () => {
    setError(""); setInfo("");

    if (code.length < 6) {
      setError("⚠️ Digite o código de 6 dígitos");
      return;
    }
    const missing = firstMissing();
    if (missing) {
      setError("❗ " + missing);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("❌ As senhas não conferem");
      return;
    }

    // chamada ao seu endpoint de reset
    const resp = await fetch(`${API}/api/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        code,
        newPassword
      })
    });
    const body = await resp.json();
    if (!resp.ok) {
      setError(body.error || "❌ Erro ao redefinir senha");
      return;
    }

    alert("✅ Senha redefinida com sucesso!");
    navigate("/signin", { replace: true });
  };

  return (
    <>
      <Container>
        <FormBox>
          <LogoIcon>🏋️‍♂️</LogoIcon>
          <Title>Esqueci a <AnimatedSpan>Senha</AnimatedSpan></Title>

          <Input
            type="email"
            placeholder="📧 Seu e‑mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Button onClick={handleForgot}>Enviar Código</Button>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {info  && <InfoMessage>{info}</InfoMessage>}

          <FooterText>
            Lembrou? <Link to="/signin">Faça Login</Link>
          </FooterText>
        </FormBox>
      </Container>

      <Popup show={showPopup} onClose={() => setShowPopup(false)}>
        <Title>Redefinir <AnimatedSpan>Senha</AnimatedSpan></Title>

        <Input
          type="text"
          placeholder="🔢 Código (6 dígitos)"
          value={code}
          onChange={e =>
            setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          maxLength={6}
        />

        <Input
          type="password"
          placeholder="🔒 Nova senha"
          value={newPassword}
          onChange={e => {
            setNewPassword(e.target.value);
            validatePassword(e.target.value);
          }}
        />

        <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          {firstMissing() ? (
            <ValidationItem>✗ {firstMissing()}</ValidationItem>
          ) : (
            <InfoMessage>✓ Senha Forte</InfoMessage>
          )}
        </div>

        <Input
          type="password"
          placeholder="🔒 Confirme a senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        {confirmPassword && confirmPassword !== newPassword && (
          <ErrorMessage>❌ Senhas não conferem</ErrorMessage>
        )}

        <Button onClick={handleReset}>✅ Redefinir Senha</Button>
      </Popup>
    </>
  );
};

export default ForgotPassword;
