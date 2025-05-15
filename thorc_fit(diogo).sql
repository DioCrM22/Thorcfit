-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15-Maio-2025 às 19:52
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `thorc_fit`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `alimento`
--

CREATE TABLE `alimento` (
  `id_alimento` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `calorias` decimal(8,2) NOT NULL,
  `proteinas` decimal(8,2) NOT NULL,
  `carboidratos` decimal(8,2) NOT NULL,
  `gorduras` decimal(8,2) NOT NULL,
  `porcao_padrao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `alimento_refeicao`
--

CREATE TABLE `alimento_refeicao` (
  `id_alimento_refeicao` int(11) NOT NULL,
  `id_refeicao` int(11) NOT NULL,
  `id_alimento` int(11) NOT NULL,
  `quantidade` decimal(8,2) NOT NULL,
  `porcao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `diario_alimentar`
--

CREATE TABLE `diario_alimentar` (
  `id_registro` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `data` date NOT NULL,
  `total_calorias` decimal(8,2) DEFAULT NULL,
  `total_proteinas` decimal(8,2) DEFAULT NULL,
  `total_carboidratos` decimal(8,2) DEFAULT NULL,
  `total_gorduras` decimal(8,2) DEFAULT NULL,
  `agua_ml` int(11) DEFAULT NULL,
  `observacoes` text DEFAULT NULL,
  `id_plano_nutricional` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `exercicio`
--

CREATE TABLE `exercicio` (
  `id_exercicio` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `grupo_muscular` varchar(50) NOT NULL,
  `equipamento_necesario` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `metricas_usuario`
--

CREATE TABLE `metricas_usuario` (
  `id_metrica` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `data_registro` date NOT NULL,
  `altura` decimal(5,2) DEFAULT NULL COMMENT 'em cm',
  `peso` decimal(5,2) DEFAULT NULL COMMENT 'em kg',
  `imc` decimal(5,2) DEFAULT NULL,
  `percentual_gordura` decimal(5,2) DEFAULT NULL,
  `circunferencia_abdominal` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `plano_nutricional`
--

CREATE TABLE `plano_nutricional` (
  `id_plano_nutricional` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `data_criacao` date NOT NULL,
  `data_validade` date DEFAULT NULL,
  `calorias_diarias` int(11) DEFAULT NULL,
  `proteinas_diarias` int(11) DEFAULT NULL,
  `carboidratos_diarias` int(11) DEFAULT NULL,
  `gorduras_diarias` int(11) DEFAULT NULL,
  `objetivo` text DEFAULT NULL,
  `observacoes` text DEFAULT NULL,
  `status` enum('ativo','inativo','em_avaliacao') DEFAULT 'ativo',
  `id_nutricionista` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `plano_treino`
--

CREATE TABLE `plano_treino` (
  `id_plano_treino` int(11) NOT NULL,
  `tipo_criador` enum('usuario','personal') NOT NULL,
  `id_criador_usuario` int(11) DEFAULT NULL,
  `id_criador_personal` int(11) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `data_criacao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `refeicao`
--

CREATE TABLE `refeicao` (
  `id_refeicao` int(11) NOT NULL,
  `id_registro` int(11) NOT NULL,
  `tipo_refeicao` enum('café_da_manhã','lanche_manhã','almoço','lanche_tarde','jantar') NOT NULL,
  `horario` time NOT NULL,
  `notas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` enum('masculino','feminino','outro') DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `data_cadastro` datetime DEFAULT current_timestamp(),
  `id_objetivo` enum('manutenção','ganho','perca') DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `alimento`
--
ALTER TABLE `alimento`
  ADD PRIMARY KEY (`id_alimento`);
ALTER TABLE `alimento` ADD FULLTEXT KEY `nome` (`nome`);

--
-- Índices para tabela `alimento_refeicao`
--
ALTER TABLE `alimento_refeicao`
  ADD PRIMARY KEY (`id_alimento_refeicao`),
  ADD KEY `id_refeicao` (`id_refeicao`),
  ADD KEY `id_alimento` (`id_alimento`);

--
-- Índices para tabela `diario_alimentar`
--
ALTER TABLE `diario_alimentar`
  ADD PRIMARY KEY (`id_registro`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`data`),
  ADD KEY `id_plano_nutricional` (`id_plano_nutricional`),
  ADD KEY `idx_diario_usuario_data` (`id_usuario`,`data`);

--
-- Índices para tabela `exercicio`
--
ALTER TABLE `exercicio`
  ADD PRIMARY KEY (`id_exercicio`);
ALTER TABLE `exercicio` ADD FULLTEXT KEY `nome` (`nome`,`descricao`);

--
-- Índices para tabela `metricas_usuario`
--
ALTER TABLE `metricas_usuario`
  ADD PRIMARY KEY (`id_metrica`),
  ADD KEY `idx_usuario_data` (`id_usuario`,`data_registro`);

--
-- Índices para tabela `plano_nutricional`
--
ALTER TABLE `plano_nutricional`
  ADD PRIMARY KEY (`id_plano_nutricional`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `idx_plnut_id_nutricionista` (`id_nutricionista`);

--
-- Índices para tabela `plano_treino`
--
ALTER TABLE `plano_treino`
  ADD PRIMARY KEY (`id_plano_treino`),
  ADD KEY `id_criador_usuario` (`id_criador_usuario`),
  ADD KEY `id_criador_personal` (`id_criador_personal`);

--
-- Índices para tabela `refeicao`
--
ALTER TABLE `refeicao`
  ADD PRIMARY KEY (`id_refeicao`),
  ADD KEY `id_registro` (`id_registro`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `alimento`
--
ALTER TABLE `alimento`
  MODIFY `id_alimento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `alimento_refeicao`
--
ALTER TABLE `alimento_refeicao`
  MODIFY `id_alimento_refeicao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `diario_alimentar`
--
ALTER TABLE `diario_alimentar`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `exercicio`
--
ALTER TABLE `exercicio`
  MODIFY `id_exercicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `metricas_usuario`
--
ALTER TABLE `metricas_usuario`
  MODIFY `id_metrica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `plano_nutricional`
--
ALTER TABLE `plano_nutricional`
  MODIFY `id_plano_nutricional` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `plano_treino`
--
ALTER TABLE `plano_treino`
  MODIFY `id_plano_treino` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `refeicao`
--
ALTER TABLE `refeicao`
  MODIFY `id_refeicao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
