import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import {
  Container,
  FormBox,
  LogoIcon,
  Title,
  ErrorMessage,
  InfoMessage,
  AnimatedSpan,
  FooterText
} from "./styles";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleForgot = async () => {
    if (!email) {
      setError("⚠️ Digite seu e-mail!");
      return;
    }

    const res = await forgotPassword(email);
    
    if (res) {
      setError(res);
      setInfo("");
    } else {
      setInfo("Instruções para redefinição enviadas para seu e-mail!");
      setTimeout(() => navigate("/resetpassword"), 3000);
    }
  };

  return (
    <Container>
      <FormBox>
        <LogoIcon>
          <img src="/assets/images/logo.png" alt="Logo" />
        </LogoIcon>
        <Title>Recuperar <AnimatedSpan>Senha</AnimatedSpan></Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {info && <InfoMessage>{info}</InfoMessage>}

        <Input
          type="email"
          placeholder="Digite seu e-mail cadastrado"
          emoji="📧"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
            setInfo("");
          }}
        />

        <Button onClick={handleForgot}>✅ Enviar Instruções</Button>

        <FooterText>
          Lembrou sua senha? <Link to="/signin">Voltar ao Login</Link>
        </FooterText>
      </FormBox>
    </Container>
  );
};

export default ForgotPassword;