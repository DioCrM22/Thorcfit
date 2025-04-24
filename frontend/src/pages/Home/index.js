import React from "react";
import { motion } from 'framer-motion';
import { Container, Header, ContentArea } from "./styles";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
    <Container>
      <Header>Bem-vindo ao FitPro!</Header>
      <ContentArea>
        <p>Aqui você pode ver suas estatísticas, treinos e muito mais.</p>
      </ContentArea>
    </Container>
    </motion.div>
  );
};

export default Home;
