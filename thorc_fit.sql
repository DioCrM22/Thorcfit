-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/04/2025 às 17:49
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

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
-- Estrutura para tabela `comunicacao`
--

CREATE TABLE `comunicacao` (
  `id_mensagem` int(11) NOT NULL,
  `id_remetente` int(11) NOT NULL COMMENT 'ID do usuário ou profissional',
  `id_destinatario` int(11) NOT NULL COMMENT 'ID do usuário ou profissional',
  `tipo_remetente` enum('usuario','profissional') NOT NULL,
  `data_envio` datetime DEFAULT current_timestamp(),
  `mensagem` text NOT NULL,
  `lida` tinyint(1) DEFAULT 0,
  `tipo_mensagem` enum('texto','sistema','ajuste_plano') NOT NULL
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

-- --------------------------------------------------------

--
-- Estrutura para tabela `exercicio_treino`
--

CREATE TABLE `exercicio_treino` (
  `id_treino` int(11) NOT NULL,
  `id_exercicio` int(11) NOT NULL,
  `series` int(11) NOT NULL,
  `repeticoes` int(11) NOT NULL,
  `carga` decimal(8,2) DEFAULT NULL,
  `id_exercicio_treino` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Estrutura para tabela `objetivo`
--

CREATE TABLE `objetivo` (
  `id_objetivo` int(11) NOT NULL,
  `nome` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `objetivo`
--

INSERT INTO `objetivo` (`id_objetivo`, `nome`) VALUES
(2, 'emagrecimento'),
(1, 'hipertrofia'),
(3, 'manutencao');

-- --------------------------------------------------------

--
-- Estrutura para tabela `plano_nutricional`
--

CREATE TABLE `plano_nutricional` (
  `id_plano_nutricional` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_profissional` int(11) NOT NULL,
  `data_criacao` date NOT NULL,
  `data_validade` date DEFAULT NULL,
  `calorias_diarias` int(11) DEFAULT NULL,
  `proteinas_diarias` int(11) DEFAULT NULL,
  `carboidratos_diarias` int(11) DEFAULT NULL,
  `gorduras_diarias` int(11) DEFAULT NULL,
  `objetivo` text DEFAULT NULL,
  `observacoes` text DEFAULT NULL,
  `status` enum('ativo','inativo','em_avaliacao') DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `plano_treino`
--

CREATE TABLE `plano_treino` (
  `id_plano_treino` int(11) NOT NULL,
  `tipo_criador` enum('usuario','profissional') NOT NULL,
  `id_criador` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `data_criacao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Acionadores `plano_treino`
--
DELIMITER $$
CREATE TRIGGER `tr_limite_planos` BEFORE INSERT ON `plano_treino` FOR EACH ROW BEGIN
    DECLARE total_planos INT;
    
    SELECT COUNT(*) INTO total_planos
    FROM plano_treino
    WHERE 
        tipo_criador = NEW.tipo_criador
        AND id_criador = NEW.id_criador;
    
    IF (NEW.tipo_criador = 'usuario' AND total_planos >= 3) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Limite de 3 planos para usuários';
    END IF;
    
    IF (NEW.tipo_criador = 'profissional' AND total_planos >= 5) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Limite de 5 planos por profissional';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_limite_planos_usuario` BEFORE INSERT ON `plano_treino` FOR EACH ROW BEGIN
  IF NEW.tipo_criador = 'usuario' THEN
    IF (SELECT COUNT(*) FROM plano_treino 
        WHERE id_criador = NEW.id_criador 
        AND tipo_criador = 'usuario') >= 3 THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Usuário atingiu o limite de 3 planos';
    END IF;
  ELSE
    IF (SELECT COUNT(*) FROM plano_treino 
        WHERE id_criador = NEW.id_criador 
        AND tipo_criador = 'profissional') >= 5 THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Profissional atingiu o limite de 5 planos por usuário';
    END IF;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `profissional`
--

CREATE TABLE `profissional` (
  `id_profissional` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `tipo` enum('nutricionista','personal_trainer') NOT NULL,
  `registro_profissional` varchar(20) NOT NULL,
  `especialidade` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `taxa_aceitacao` decimal(5,2) DEFAULT NULL COMMENT 'Percentual de aceitação de solicitações'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Estrutura para tabela `sessao_treino`
--

CREATE TABLE `sessao_treino` (
  `id_sessao` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_treino` int(11) DEFAULT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp(),
  `duracao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Acionadores `sessao_treino`
--
DELIMITER $$
CREATE TRIGGER `limpar_sessoes_antigas` AFTER INSERT ON `sessao_treino` FOR EACH ROW BEGIN
  DELETE FROM sessao_treino 
  WHERE id_usuario = NEW.id_usuario
  AND data < DATE_SUB(NEW.data, INTERVAL 7 DAY);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `treino`
--

CREATE TABLE `treino` (
  `id_treino` int(11) NOT NULL,
  `id_plano` int(11) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `ordem` int(11) NOT NULL
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
  `foto_perfil` varchar(255) DEFAULT NULL,
  `data_cadastro` datetime DEFAULT current_timestamp(),
  `id_objetivo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `view_acompanhamento_profissional`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `view_acompanhamento_profissional` (
`id_vinculo` int(11)
,`profissional` varchar(100)
,`tipo_profissional` enum('nutricionista','personal_trainer')
,`usuario` varchar(100)
,`registros_nutricionais` bigint(21)
,`sessoes_treino` bigint(21)
,`ultima_avaliacao` date
);

-- --------------------------------------------------------

--
-- Estrutura para tabela `vinculo_profissional`
--

CREATE TABLE `vinculo_profissional` (
  `id_vinculo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_profissional` int(11) NOT NULL,
  `tipo_vinculo` enum('nutricionista','personal_trainer') NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `status` enum('ativo','inativo','suspenso') DEFAULT 'ativo',
  `permissao_dados` enum('restrito','completo') DEFAULT 'restrito'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para view `view_acompanhamento_profissional`
--
DROP TABLE IF EXISTS `view_acompanhamento_profissional`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_acompanhamento_profissional`  AS SELECT `vp`.`id_vinculo` AS `id_vinculo`, `p`.`nome` AS `profissional`, `p`.`tipo` AS `tipo_profissional`, `u`.`nome` AS `usuario`, count(distinct `dn`.`id_registro`) AS `registros_nutricionais`, count(distinct `st`.`id_sessao`) AS `sessoes_treino`, max(`mu`.`data_registro`) AS `ultima_avaliacao` FROM (((((`vinculo_profissional` `vp` join `profissional` `p` on(`vp`.`id_profissional` = `p`.`id_profissional`)) join `usuario` `u` on(`vp`.`id_usuario` = `u`.`id_usuario`)) left join `diario_alimentar` `dn` on(`u`.`id_usuario` = `dn`.`id_usuario`)) left join `sessao_treino` `st` on(`u`.`id_usuario` = `st`.`id_usuario`)) left join `metricas_usuario` `mu` on(`u`.`id_usuario` = `mu`.`id_usuario`)) WHERE `vp`.`status` = 'ativo' GROUP BY `vp`.`id_vinculo`, `p`.`nome`, `p`.`tipo`, `u`.`nome` ;

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
-- Índices de tabela `comunicacao`
--
ALTER TABLE `comunicacao`
  ADD PRIMARY KEY (`id_mensagem`),
  ADD KEY `id_remetente` (`id_remetente`),
  ADD KEY `id_destinatario` (`id_destinatario`);

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
-- Índices de tabela `exercicio_treino`
--
ALTER TABLE `exercicio_treino`
  ADD PRIMARY KEY (`id_exercicio_treino`),
  ADD KEY `id_treino` (`id_treino`),
  ADD KEY `id_exercicio` (`id_exercicio`);

--
-- Índices de tabela `metricas_usuario`
--
ALTER TABLE `metricas_usuario`
  ADD PRIMARY KEY (`id_metrica`),
  ADD KEY `idx_usuario_data` (`id_usuario`,`data_registro`);

--
-- Índices de tabela `objetivo`
--
ALTER TABLE `objetivo`
  ADD PRIMARY KEY (`id_objetivo`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `plano_nutricional`
--
ALTER TABLE `plano_nutricional`
  ADD PRIMARY KEY (`id_plano_nutricional`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_profissional` (`id_profissional`);

--
-- Índices de tabela `plano_treino`
--
ALTER TABLE `plano_treino`
  ADD PRIMARY KEY (`id_plano_treino`),
  ADD KEY `fk_plano_criador_profissional` (`id_criador`);

--
-- Índices de tabela `profissional`
--
ALTER TABLE `profissional`
  ADD PRIMARY KEY (`id_profissional`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `refeicao`
--
ALTER TABLE `refeicao`
  ADD PRIMARY KEY (`id_refeicao`),
  ADD KEY `id_registro` (`id_registro`);

--
-- Índices de tabela `sessao_treino`
--
ALTER TABLE `sessao_treino`
  ADD PRIMARY KEY (`id_sessao`),
  ADD KEY `fk_sessao_treino` (`id_treino`);

--
-- Índices de tabela `treino`
--
ALTER TABLE `treino`
  ADD PRIMARY KEY (`id_treino`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `vinculo_profissional`
--
ALTER TABLE `vinculo_profissional`
  ADD PRIMARY KEY (`id_vinculo`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`id_profissional`,`tipo_vinculo`),
  ADD KEY `idx_vinculos_usuario` (`id_usuario`,`status`),
  ADD KEY `idx_vinculos_profissional` (`id_profissional`,`status`);

--
-- AUTO_INCREMENT para tabelas despejadas
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
-- AUTO_INCREMENT de tabela `comunicacao`
--
ALTER TABLE `comunicacao`
  MODIFY `id_mensagem` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de tabela `exercicio_treino`
--
ALTER TABLE `exercicio_treino`
  MODIFY `id_exercicio_treino` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de tabela `profissional`
--
ALTER TABLE `profissional`
  MODIFY `id_profissional` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `refeicao`
--
ALTER TABLE `refeicao`
  MODIFY `id_refeicao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sessao_treino`
--
ALTER TABLE `sessao_treino`
  MODIFY `id_sessao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `vinculo_profissional`
--
ALTER TABLE `vinculo_profissional`
  MODIFY `id_vinculo` int(11) NOT NULL AUTO_INCREMENT;

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
-- Restrições para tabelas `comunicacao`
--
ALTER TABLE `comunicacao`
  ADD CONSTRAINT `comunicacao_ibfk_1` FOREIGN KEY (`id_remetente`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `comunicacao_ibfk_2` FOREIGN KEY (`id_destinatario`) REFERENCES `profissional` (`id_profissional`) ON DELETE CASCADE;

--
-- Restrições para tabelas `diario_alimentar`
--
ALTER TABLE `diario_alimentar`
  ADD CONSTRAINT `diario_alimentar_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `diario_alimentar_ibfk_2` FOREIGN KEY (`id_plano_nutricional`) REFERENCES `plano_nutricional` (`id_plano_nutricional`);

--
-- Restrições para tabelas `exercicio_treino`
--
ALTER TABLE `exercicio_treino`
  ADD CONSTRAINT `exercicio_treino_ibfk_1` FOREIGN KEY (`id_treino`) REFERENCES `sessao_treino` (`id_sessao`),
  ADD CONSTRAINT `exercicio_treino_ibfk_2` FOREIGN KEY (`id_exercicio`) REFERENCES `exercicio` (`id_exercicio`);

--
-- Restrições para tabelas `metricas_usuario`
--
ALTER TABLE `metricas_usuario`
  ADD CONSTRAINT `metricas_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `plano_nutricional`
--
ALTER TABLE `plano_nutricional`
  ADD CONSTRAINT `plano_nutricional_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `plano_nutricional_ibfk_2` FOREIGN KEY (`id_profissional`) REFERENCES `profissional` (`id_profissional`);

--
-- Restrições para tabelas `plano_treino`
--
ALTER TABLE `plano_treino`
  ADD CONSTRAINT `fk_plano_criador_profissional` FOREIGN KEY (`id_criador`) REFERENCES `profissional` (`id_profissional`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_plano_criador_usuario` FOREIGN KEY (`id_criador`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `refeicao`
--
ALTER TABLE `refeicao`
  ADD CONSTRAINT `refeicao_ibfk_1` FOREIGN KEY (`id_registro`) REFERENCES `diario_alimentar` (`id_registro`);

--
-- Restrições para tabelas `sessao_treino`
--
ALTER TABLE `sessao_treino`
  ADD CONSTRAINT `fk_sessao_treino` FOREIGN KEY (`id_treino`) REFERENCES `treino` (`id_treino`) ON DELETE CASCADE;

--
-- Restrições para tabelas `vinculo_profissional`
--
ALTER TABLE `vinculo_profissional`
  ADD CONSTRAINT `vinculo_profissional_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `vinculo_profissional_ibfk_2` FOREIGN KEY (`id_profissional`) REFERENCES `profissional` (`id_profissional`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
