-- Criação do banco de dados (Executar manualmente antes deste script se necessário)
-- CREATE DATABASE ingressos_copa;

-- Conectar ao banco ingressos_copa

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE estadios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL
);

CREATE TABLE jogos (
    id SERIAL PRIMARY KEY,
    time_casa VARCHAR(100) NOT NULL,
    time_visitante VARCHAR(100) NOT NULL,
    data_jogo TIMESTAMP NOT NULL,
    estadio_id INT REFERENCES estadios(id)
);

CREATE TABLE assentos (
    id SERIAL PRIMARY KEY,
    jogo_id INT REFERENCES jogos(id),
    setor VARCHAR(50) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'disponivel', -- disponivel, reservado, vendido
    CONSTRAINT unique_assento_jogo UNIQUE(jogo_id, setor, numero)
);

CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    jogo_id INT REFERENCES jogos(id),
    assento_id INT REFERENCES assentos(id),
    status VARCHAR(20) DEFAULT 'pendente', -- pendente, confirmado, cancelado
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
