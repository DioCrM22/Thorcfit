import React from "react";
import { Container, Header, ContentArea } from "./styles";

const Home = () => {
  return (
    <Container>
      <Header>Bem-vindo ao FitPro!</Header>
      <ContentArea>
        <p>Aqui você pode ver suas estatísticas, treinos e muito mais.</p>
      </ContentArea>
    </Container>
  );
};

export default Home;
