-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/06/2025 às 15:34
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `thorcfit`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_atualizar_metricas` (IN `p_id_usuario` INT, IN `p_peso` DECIMAL(5,2), IN `p_altura` DECIMAL(5,2))   BEGIN DECLARE v_imc DECIMAL(5,2); SET v_imc = p_peso / POW(p_altura/100, 2); INSERT INTO metricas_usuario (id_usuario, data_registro, peso, altura, imc) VALUES (p_id_usuario, CURDATE(), p_peso, p_altura, v_imc); UPDATE usuario SET peso = p_peso, altura = p_altura WHERE id_usuario = p_id_usuario; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_criar_plano_integrado` (IN `p_id_usuario` INT, IN `p_id_nutricionista` INT, IN `p_id_personal` INT, IN `p_objetivo` TEXT)   BEGIN DECLARE v_id_plano_nutricional INT; DECLARE v_id_plano_treino INT; INSERT INTO plano_nutricional (id_usuario, id_profissional, data_criacao, objetivo) VALUES (p_id_usuario, p_id_nutricionista, CURDATE(), p_objetivo); SET v_id_plano_nutricional = LAST_INSERT_ID(); INSERT INTO plano_treino (id_usuario, id_profissional, nome, data_criacao, objetivo) VALUES (p_id_usuario, p_id_personal, CONCAT('Plano ', p_objetivo), CURDATE(), p_objetivo); SET v_id_plano_treino = LAST_INSERT_ID(); INSERT INTO vinculo_profissional (id_usuario, id_profissional, tipo_vinculo, data_inicio) VALUES (p_id_usuario, p_id_nutricionista, 'nutricionista', CURDATE()), (p_id_usuario, p_id_personal, 'personal_trainer', CURDATE()); SELECT v_id_plano_nutricional AS id_plano_nutricional, v_id_plano_treino AS id_plano_treino; END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `alimento`
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

--
-- Despejando dados para a tabela `alimento`
--

INSERT INTO `alimento` (`id_alimento`, `nome`, `calorias`, `proteinas`, `carboidratos`, `gorduras`, `porcao_padrao`) VALUES
(1, 'Arroz Branco Cozido', 130.00, 2.70, 28.20, 0.30, '100g'),
(2, 'Peito de Frango Grelhado', 165.00, 31.00, 0.00, 3.60, '100g'),
(3, 'Brócolis Cozido', 55.00, 3.70, 11.20, 0.60, '100g'),
(4, 'Ovo Cozido', 155.00, 13.00, 1.10, 11.00, '1 unidade (50g)');

-- --------------------------------------------------------

--
-- Estrutura para tabela `alimento_refeicao`
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
-- Estrutura para tabela `diario_alimentar`
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
-- Estrutura para tabela `exercicio`
--

CREATE TABLE `exercicio` (
  `id_exercicio` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `grupo_muscular` varchar(50) NOT NULL,
  `equipamento_necesario` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `exercicio`
--

INSERT INTO `exercicio` (`id_exercicio`, `nome`, `descricao`, `grupo_muscular`, `equipamento_necesario`) VALUES
(1, 'Supino Reto com Barra', 'Exercício para peito, ombros e tríceps.', 'Peito', 'Barra, Anilhas, Banco'),
(2, 'Agachamento Livre', 'Exercício composto para pernas e glúteos.', 'Pernas', 'Nenhum (opcional: barra e anilhas)'),
(3, 'Remada Curvada', 'Exercício para costas e bíceps.', 'Costas', 'Barra, Anilhas');

-- --------------------------------------------------------

--
-- Estrutura para tabela `exercicios_do_treino`
--

CREATE TABLE `exercicios_do_treino` (
  `id_treino` int(11) NOT NULL,
  `id_exercicio` int(11) NOT NULL,
  `series` int(11) NOT NULL,
  `repeticoes` int(11) NOT NULL,
  `carga` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `metricas_usuario`
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
-- Estrutura para tabela `nutricionista`
--

CREATE TABLE `nutricionista` (
  `id_nutricionista` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `crn` varchar(50) DEFAULT NULL,
  `especialidade` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `preco_consulta` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `nutricionista`
--

INSERT INTO `nutricionista` (`id_nutricionista`, `id_usuario`, `crn`, `especialidade`, `bio`, `preco_consulta`) VALUES
(1, 3, 'CRN-12345', 'Nutrição Esportiva', 'Nutricionista especializado em nutrição esportiva e emagrecimento.', 150.00),
(2, 5, 'CRN-67890', 'Nutrição Clínica', 'Nutricionista clínico com foco em saúde intestinal.', 120.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `personal_trainer`
--

CREATE TABLE `personal_trainer` (
  `id_personal` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `cref` varchar(50) DEFAULT NULL,
  `especialidade` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `preco_sessao` decimal(8,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `personal_trainer`
--

INSERT INTO `personal_trainer` (`id_personal`, `id_usuario`, `cref`, `especialidade`, `bio`, `preco_sessao`, `created_at`, `updated_at`) VALUES
(1, 4, 'CREF-54321', 'Treinamento Funcional', 'Personal trainer com experiência em treinamento funcional e hipertrofia.', 80.00, '2025-06-17 10:32:00', '2025-06-17 10:32:00'),
(2, 6, 'CREF-98765', 'Condicionamento Físico', 'Personal trainer focada em condicionamento físico e bem-estar.', 70.00, '2025-06-17 10:32:00', '2025-06-17 10:32:00');

-- --------------------------------------------------------

--
-- Estrutura para tabela `plano_nutricional`
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
  `id_nutricionista` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `plano_treino`
--

CREATE TABLE `plano_treino` (
  `id_plano_treino` int(11) NOT NULL,
  `tipo_criador` enum('usuario','personal') NOT NULL,
  `id_criador_usuario` int(11) DEFAULT NULL,
  `id_criador_personal` int(11) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `data_criacao` date NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `refeicao`
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
-- Estrutura para tabela `usuario`
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
  `google_id` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `metodo_login` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `senha_hash`, `data_nascimento`, `genero`, `telefone`, `data_cadastro`, `id_objetivo`, `google_id`, `avatar`, `metodo_login`, `created_at`, `updated_at`) VALUES
(1, 'João Silva', 'joao@teste.com', '$2b$10$example_hash_1', '1990-05-15', 'masculino', '(11) 99999-1111', '2025-06-17 10:25:37', 'ganho', NULL, NULL, 'email', '2025-06-17 10:31:26', '2025-06-17 10:31:26'),
(2, 'Maria Santos', 'maria@teste.com', '$2b$10$example_hash_2', '1985-08-22', 'feminino', '(11) 99999-2222', '2025-06-17 10:25:37', 'perca', NULL, NULL, 'email', '2025-06-17 10:31:26', '2025-06-17 10:31:26'),
(3, 'Dr. Carlos Nutricionista', 'carlos.nutri@teste.com', '$2b$10$example_hash_3', '1980-03-10', 'masculino', '(11) 99999-3333', '2025-06-17 10:25:37', 'manutenção', NULL, NULL, 'email', '2025-06-17 10:31:26', '2025-06-17 10:31:26'),
(4, 'Ana Personal Trainer', 'ana.personal@teste.com', '$2b$10$example_hash_4', '1988-12-05', 'feminino', '(11) 99999-4444', '2025-06-17 10:25:37', 'manutenção', NULL, NULL, 'email', '2025-06-17 10:31:26', '2025-06-17 10:31:26'),
(5, 'Dr. Pedro Nutricionista', 'pedro.nutri@teste.com', '$2b$10$example_hash_5', '1975-07-18', 'masculino', '(11) 99999-5555', '2025-06-17 10:25:37', 'manutenção', NULL, NULL, 'email', '2025-06-17 10:31:26', '2025-06-17 10:31:26'),
(6, 'Mariana Personal Trainer', 'mariana.personal@teste.com', '$2b$10$example_hash_6', '1992-01-20', 'feminino', '(11) 99999-6666', '2025-06-17 10:25:37', 'ganho', NULL, NULL, 'email', '2025-06-17 10:31:26', '2025-06-17 10:31:26');

-- --------------------------------------------------------

--
-- Estrutura para tabela `vinculo_nutricional`
--

CREATE TABLE `vinculo_nutricional` (
  `id_vinculo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_nutricionista` int(11) NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `status` enum('ativo','inativo','suspenso') DEFAULT NULL,
  `permissao_dados` enum('restrito','completo') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `vinculo_nutricional`
--

INSERT INTO `vinculo_nutricional` (`id_vinculo`, `id_usuario`, `id_nutricionista`, `data_inicio`, `data_fim`, `status`, `permissao_dados`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-06-17', NULL, 'ativo', 'completo', '2025-06-17 10:32:17', '2025-06-17 10:32:17'),
(2, 2, 2, '2025-06-17', NULL, '', 'restrito', '2025-06-17 10:32:17', '2025-06-17 10:32:17');

-- --------------------------------------------------------

--
-- Estrutura para tabela `vinculo_treino`
--

CREATE TABLE `vinculo_treino` (
  `id_vinculo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `status` enum('ativo','inativo','suspenso') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `vinculo_treino`
--

INSERT INTO `vinculo_treino` (`id_vinculo`, `id_usuario`, `id_personal`, `data_inicio`, `data_fim`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-06-17', NULL, 'ativo', '2025-06-17 10:32:10', '2025-06-17 10:32:10'),
(2, 2, 2, '2025-06-17', NULL, '', '2025-06-17 10:32:10', '2025-06-17 10:32:10');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `alimento`
--
ALTER TABLE `alimento`
  ADD PRIMARY KEY (`id_alimento`);
ALTER TABLE `alimento` ADD FULLTEXT KEY `nome` (`nome`);

--
-- Índices de tabela `alimento_refeicao`
--
ALTER TABLE `alimento_refeicao`
  ADD PRIMARY KEY (`id_alimento_refeicao`),
  ADD KEY `id_refeicao` (`id_refeicao`),
  ADD KEY `id_alimento` (`id_alimento`);

--
-- Índices de tabela `diario_alimentar`
--
ALTER TABLE `diario_alimentar`
  ADD PRIMARY KEY (`id_registro`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`data`),
  ADD KEY `id_plano_nutricional` (`id_plano_nutricional`),
  ADD KEY `idx_diario_usuario_data` (`id_usuario`,`data`);

--
-- Índices de tabela `exercicio`
--
ALTER TABLE `exercicio`
  ADD PRIMARY KEY (`id_exercicio`);
ALTER TABLE `exercicio` ADD FULLTEXT KEY `nome` (`nome`,`descricao`);

--
-- Índices de tabela `exercicios_do_treino`
--
ALTER TABLE `exercicios_do_treino`
  ADD PRIMARY KEY (`id_treino`,`id_exercicio`),
  ADD KEY `id_exercicio` (`id_exercicio`);

--
-- Índices de tabela `metricas_usuario`
--
ALTER TABLE `metricas_usuario`
  ADD PRIMARY KEY (`id_metrica`),
  ADD KEY `idx_usuario_data` (`id_usuario`,`data_registro`);

--
-- Índices de tabela `nutricionista`
--
ALTER TABLE `nutricionista`
  ADD PRIMARY KEY (`id_nutricionista`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `personal_trainer`
--
ALTER TABLE `personal_trainer`
  ADD PRIMARY KEY (`id_personal`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `plano_nutricional`
--
ALTER TABLE `plano_nutricional`
  ADD PRIMARY KEY (`id_plano_nutricional`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `idx_plnut_id_nutricionista` (`id_nutricionista`);

--
-- Índices de tabela `plano_treino`
--
ALTER TABLE `plano_treino`
  ADD PRIMARY KEY (`id_plano_treino`),
  ADD KEY `id_criador_usuario` (`id_criador_usuario`),
  ADD KEY `id_criador_personal` (`id_criador_personal`);

--
-- Índices de tabela `refeicao`
--
ALTER TABLE `refeicao`
  ADD PRIMARY KEY (`id_refeicao`),
  ADD KEY `id_registro` (`id_registro`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `vinculo_nutricional`
--
ALTER TABLE `vinculo_nutricional`
  ADD PRIMARY KEY (`id_vinculo`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_nutricionista` (`id_nutricionista`);

--
-- Índices de tabela `vinculo_treino`
--
ALTER TABLE `vinculo_treino`
  ADD PRIMARY KEY (`id_vinculo`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_personal` (`id_personal`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `alimento`
--
ALTER TABLE `alimento`
  MODIFY `id_alimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id_exercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `metricas_usuario`
--
ALTER TABLE `metricas_usuario`
  MODIFY `id_metrica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `nutricionista`
--
ALTER TABLE `nutricionista`
  MODIFY `id_nutricionista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `personal_trainer`
--
ALTER TABLE `personal_trainer`
  MODIFY `id_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `vinculo_nutricional`
--
ALTER TABLE `vinculo_nutricional`
  MODIFY `id_vinculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `vinculo_treino`
--
ALTER TABLE `vinculo_treino`
  MODIFY `id_vinculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `alimento_refeicao`
--
ALTER TABLE `alimento_refeicao`
  ADD CONSTRAINT `alimento_refeicao_ibfk_1` FOREIGN KEY (`id_refeicao`) REFERENCES `refeicao` (`id_refeicao`),
  ADD CONSTRAINT `alimento_refeicao_ibfk_2` FOREIGN KEY (`id_alimento`) REFERENCES `alimento` (`id_alimento`);

--
-- Restrições para tabelas `diario_alimentar`
--
ALTER TABLE `diario_alimentar`
  ADD CONSTRAINT `diario_alimentar_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `diario_alimentar_ibfk_2` FOREIGN KEY (`id_plano_nutricional`) REFERENCES `plano_nutricional` (`id_plano_nutricional`);

--
-- Restrições para tabelas `exercicios_do_treino`
--
ALTER TABLE `exercicios_do_treino`
  ADD CONSTRAINT `exercicios_do_treino_ibfk_1` FOREIGN KEY (`id_treino`) REFERENCES `plano_treino` (`id_plano_treino`),
  ADD CONSTRAINT `exercicios_do_treino_ibfk_2` FOREIGN KEY (`id_exercicio`) REFERENCES `exercicio` (`id_exercicio`);

--
-- Restrições para tabelas `metricas_usuario`
--
ALTER TABLE `metricas_usuario`
  ADD CONSTRAINT `metricas_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `nutricionista`
--
ALTER TABLE `nutricionista`
  ADD CONSTRAINT `nutricionista_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `personal_trainer`
--
ALTER TABLE `personal_trainer`
  ADD CONSTRAINT `personal_trainer_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `plano_nutricional`
--
ALTER TABLE `plano_nutricional`
  ADD CONSTRAINT `fk_plano_nutricional_nutricionista` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionista` (`id_nutricionista`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_plnut_idnutri` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionista` (`id_nutricionista`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `plano_nutricional_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `plano_treino`
--
ALTER TABLE `plano_treino`
  ADD CONSTRAINT `plano_treino_ibfk_1` FOREIGN KEY (`id_criador_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `plano_treino_ibfk_2` FOREIGN KEY (`id_criador_personal`) REFERENCES `personal_trainer` (`id_personal`);

--
-- Restrições para tabelas `refeicao`
--
ALTER TABLE `refeicao`
  ADD CONSTRAINT `refeicao_ibfk_1` FOREIGN KEY (`id_registro`) REFERENCES `diario_alimentar` (`id_registro`);

--
-- Restrições para tabelas `vinculo_nutricional`
--
ALTER TABLE `vinculo_nutricional`
  ADD CONSTRAINT `vinculo_nutricional_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `vinculo_nutricional_ibfk_2` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionista` (`id_nutricionista`);

--
-- Restrições para tabelas `vinculo_treino`
--
ALTER TABLE `vinculo_treino`
  ADD CONSTRAINT `vinculo_treino_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `vinculo_treino_ibfk_2` FOREIGN KEY (`id_personal`) REFERENCES `personal_trainer` (`id_personal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
