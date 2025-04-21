import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  Container,
  FormBox,
  LogoIcon,
  Title,
  ErrorMessage,
  SocialContainer,
  AnimatedSpan,
  LinkText,
  OrangeLink,
  DefaultLink,
  FooterText,
  Separator,
  GoogleButton,
  InstagramButton,
} from "./styles";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Resetar erros anteriores

    // Validação dos campos
    if (!email || !senha) {
      setError("⚠️ Preencha todos os campos obrigatórios!");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("⚠️ Formato de e-mail inválido!");
      return;
    }

    if (senha.length < 6) {
      setError("⚠️ A senha deve ter pelo menos 8 caracteres!");
      return;
    }

    const errorMessage = await signin(email, senha);
    
    if (errorMessage) {
      setError(errorMessage);
    } else {
      navigate("/home"); // Redirecionamento após login bem-sucedido
    }
  };

  const handleGoogleSignIn = () => {
    // Implementar integração OAuth real com o Google
    alert("Login com Google (placeholder)");
  };


  return (
    <Container>
      <FormBox>
        <LogoIcon>
          <img src="/assets/images/logo.png" alt="Logo" />
        </LogoIcon>
        <Title>Bem-Vindo ao <AnimatedSpan>ThorcFit</AnimatedSpan></Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="mb-3">
          <div className="input-group">
            <Input
              type="email"
              placeholder="E-mail"
              emoji="📧"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="input-group">
            <Input
              type="password"
              placeholder="Crie sua Senha"
              emoji="🔒"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setError("");
              }}
            />

          </div>
        </div>

        <Button onClick={handleLogin}>🚀 Acessar Conta</Button>
        <SocialContainer>
        <GoogleButton onClick={handleGoogleSignIn}>
          <img src="/assets/images/google.png" alt="Google" />
          <FooterText>Entrar com Google</FooterText>
        </GoogleButton>
        </SocialContainer>

        <LinkText>
        Não tem conta? <DefaultLink to="/signup">💪 Crie agora!</DefaultLink>
      </LinkText>

      <LinkText>
        Esqueceu sua senha? <OrangeLink to="/forgot-password"> Redefinir Senha</OrangeLink>
      </LinkText>

      <Separator>
        <span><img src="/assets/images/iconlogo.png" alt="iconLogo" /></span>
      </Separator>

      <SocialContainer>
        <InstagramButton href="https://instagram.com/seuPerfil" target="_blank">
          <img src="/assets/images/instagram.png" alt="Instagram" />
          <FooterText>Visite nosso Instagram</FooterText>
        </InstagramButton>
      </SocialContainer>
      </FormBox>
    </Container>
  );
};

export default Signin;
