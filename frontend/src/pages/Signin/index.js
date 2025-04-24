import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNotification } from "../../contexts/NotificationContext"; // ✅
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  Container,
  FormBox,
  LogoIcon,
  Title,
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
  const { notify } = useNotification(); // ✅ trocado de showNotification

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      notify("Preencha todos os campos obrigatórios!", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      notify("Formato de e-mail inválido!", "error");
      return;
    }

    if (senha.length < 6) {
      notify("A senha deve ter pelo menos 6 caracteres!", "error");
      return;
    }

    try {
      const errorMessage = await signin(email, senha);

      if (errorMessage) {
        notify(errorMessage, "error");
      } else {
        notify("Login realizado com sucesso!", "success");
        setTimeout(() => {
          navigate("/home");
        }, 1000); // 1 segundo para ver o toast
      }
    } catch (error) {
      notify("Erro ao processar o login", "error");
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;
        if (!accessToken) {
          notify("Falha na autenticação do Google", "error");
          return;
        }

        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/google`,
          { token: accessToken }
        );

        if (data.token) {
          localStorage.setItem('authToken', data.token);
          notify("Login com Google realizado!", "success");
          navigate('/home');
        }
      } catch (err) {
        notify("Falha no login com Google", "error");
      }
    },
    onError: () => {
      notify("Falha na autenticação do Google", "error");
    },
  });

  return (
    <Container>
      <FormBox>
        <LogoIcon>
          <img src="/assets/images/logo.png" alt="Logo" />
        </LogoIcon>
        <Title>Bem-Vindo ao <AnimatedSpan>ThorcFit</AnimatedSpan></Title>

        <div className="mb-3">
          <div className="input-group">
            <Input
              type="email"
              placeholder="E-mail"
              emoji="📧"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setSenha(e.target.value)}
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
