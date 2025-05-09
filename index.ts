import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';

const app = fastify();

app.register(cors);

//////////////////////////////

// Rota para verificar se o servidor está funcionando
app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send("Fastify Funcionando!");
});

// Rota para salvar dados do formulário de pessoa
app.post('/pessoa', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id, nome, sobrenome, empresa } = request.body as any;

  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'Trabalho',
      port: 3306,
    });

    // Inserir na tabela pessoa
    const resultado = await conn.query(
      "INSERT INTO pessoa (id, nome, sobrenome, empresa) VALUES (?, ?, ?, ?)",
      [id, nome, sobrenome, empresa]
    );

    reply.status(200).send({ mensagem: "Pessoa cadastrada com sucesso!" });
  } catch (erro: any) {
    console.log(`❌ Deu erro! :` + erro);
    if (erro.code === "ECONNREFUSED") {
      console.log("❌ ERRO: LIGUE O LARAGON => Conexão recusada");
      reply.status(400).send({ mensagem: "❌ ERRO: LIGUE O LARAGON => Conexão recusada" });
    } else if (erro.code === 'ER_BAD_DB_ERROR') {
      console.log("❌ ERRO: CRIE UM BANCO DE DADOS  COM O NOME DEFINIDO NA CONEXÃO => Conexão não encontrada");
      reply.status(400).send({ mensagem: "❌ ERRO: CRIE UM BANCO DE DADOS  COM O NOME DEFINIDO NA CONEXÃO => Conexão não encontrada" });
    } else if (erro.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log("❌ ERRO: CONFERIR O USUÁRIO E SENHA DEFINIDOS NA CONEXÃO => Conexão não encontrada");
      reply.status(400).send({ mensagem: "❌ ERRO: CONFERIR O USUÁRIO E SENHA DEFINIDOS NA CONEXÃO => Conexão não encontrada" });
    } else if (erro.code === 'ER_NO_SUCH_TABLE') {
      console.log("❌ ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY");
      reply.status(400).send({ mensagem: "❌ ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY" });
    } else if (erro.code === 'ER_PARSE_ERROR') {
      console.log("❌ ERRO: Você tem um erro de escrita em sua QUERY confira: VÍRGULAS, PARENTESES E NOME DE COLUNAS");
      reply.status(400).send({ mensagem: "❌ ERRO: Você tem um erro de escrita em sua QUERY confira: VÍRGULAS, PARENTESES E NOME DE COLUNAS" });
    } else {
      console.log(erro);
      reply.status(400).send({ mensagem: "❌ ERRO: Não identificado" });
    }
  }
});

// Rota para salvar dados do formulário de produto
app.post('/produto', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id, nome, descricao, preco } = request.body as any;

  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'Trabalho',
      port: 3306,
    });

    // Inserir na tabela produto
    const resultado = await conn.query(
      "INSERT INTO produto (id, nome, descricao, preco) VALUES (?, ?, ?, ?)",
      [id, nome, descricao, preco]
    );

    reply.status(200).send({ mensagem: "Produto cadastrado com sucesso!" });
  } catch (erro: any) {
    console.log(`❌ Deu erro! :` + erro);
    if (erro.code === "ECONNREFUSED") {
      console.log("❌ ERRO: LIGUE O LARAGON => Conexão recusada");
      reply.status(400).send({ mensagem: "❌ ERRO: LIGUE O LARAGON => Conexão recusada" });
    } else if (erro.code === 'ER_BAD_DB_ERROR') {
      console.log("❌ ERRO: CRIE UM BANCO DE DADOS  COM O NOME DEFINIDO NA CONEXÃO => Conexão não encontrada");
      reply.status(400).send({ mensagem: "❌ ERRO: CRIE UM BANCO DE DADOS  COM O NOME DEFINIDO NA CONEXÃO => Conexão não encontrada" });
    } else if (erro.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log("❌ ERRO: CONFERIR O USUÁRIO E SENHA DEFINIDOS NA CONEXÃO => Conexão não encontrada");
      reply.status(400).send({ mensagem: "❌ ERRO: CONFERIR O USUÁRIO E SENHA DEFINIDOS NA CONEXÃO => Conexão não encontrada" });
    } else if (erro.code === 'ER_NO_SUCH_TABLE') {
      console.log("❌ ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY");
      reply.status(400).send({ mensagem: "❌ ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY" });
    } else if (erro.code === 'ER_PARSE_ERROR') {
      console.log("❌ ERRO: Você tem um erro de escrita em sua QUERY confira: VÍRGULAS, PARENTESES E NOME DE COLUNAS");
      reply.status(400).send({ mensagem: "❌ ERRO: Você tem um erro de escrita em sua QUERY confira: VÍRGULAS, PARENTESES E NOME DE COLUNAS" });
    } else {
      console.log(erro);
      reply.status(400).send({ mensagem: "❌ ERRO: Não identificado" });
    }
  }
});

//////////////////////////////

// Iniciar o servidor
app.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

