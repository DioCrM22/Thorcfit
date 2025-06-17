import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
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
  InstagramButton,
} from "./styles";

const Signin = () => {
  const { signin, loading } = useAuth();  // Peguei loading do contexto para controle
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { notify } = useNotification();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
      const result = await signin(email, senha);
      console.log("Resultado do login:", result);

      if (result.success) {
        notify("Login realizado com sucesso!", "success");
        // Opcional: limpar campos após login
        setEmail("");
        setSenha("");
        navigate("/home");
      } else {
        notify(result.error || "Credenciais inválidas", "error");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      notify("Erro ao processar o login. Tente novamente.", "error");
    }
  };

  return (
    <Container>
      <FormBox>
        <LogoIcon>
          <img src="/assets/images/logo.png" alt="Logo" />
        </LogoIcon>
        <Title>
          Bem-Vindo ao <AnimatedSpan>ThorcFit</AnimatedSpan>
        </Title>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <div className="input-group">
              <Input
                type="email"
                placeholder="E-mail"
                emoji="📧"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading} // desabilita enquanto carrega
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group">
              <Input
                type="password"
                placeholder="Senha" // Alterei o placeholder para ficar mais adequado
                emoji="🔒"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={loading} // desabilita enquanto carrega
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "🚀 Acessar Conta"}
          </Button>
        </form>

        <LinkText>
          Não tem conta? <DefaultLink to="/signup">💪 Crie agora!</DefaultLink>
        </LinkText>

        <LinkText>
          Esqueceu sua senha?{" "}
          <OrangeLink to="/forgot-password">Redefinir Senha</OrangeLink>
        </LinkText>

        <Separator>
          <span>
            <img src="/assets/images/iconlogo.png" alt="iconLogo" />
          </span>
        </Separator>

        <SocialContainer>
          <InstagramButton href="https://instagram.com" target="_blank">
            <img src="/assets/images/instagram.png" alt="Instagram" />
            <FooterText>Visite nosso Instagram</FooterText>
          </InstagramButton>
        </SocialContainer>
      </FormBox>
    </Container>
  );
};

export default Signin;
