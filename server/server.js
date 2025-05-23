// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
 
import { connectDB} from './config/database.js';

// Importando Rotas
// import usuarioRoutes from './routes/usuarioRoutes.js';
import projetoRoutes from './routes/ProjetoRoutes.js'; 
import etapaRoutes from './routes/EtapaRoutes.js';
import usuarioRoutes from './routes/UsuarioRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// Rota raiz
app.get('/', (req, res) => {
    res.send('API do Sistema de Projetos Online');
  });


  // Usar as rotas
// app.use('/api/usuarios', usuarioRoutes);
app.use('/api/projeto', projetoRoutes);
app.use('/api/etapa', etapaRoutes);
app.use('/api/usuario', usuarioRoutes);

// Rota coringa: deve ser a **última**
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho: req.originalUrl
  });
});
  
connectDB();


app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});



/*// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';

// Importando Rotas da API
import projetoRoutes from './routes/ProjetoRoutes.js'; 
import etapaRoutes from './routes/EtapaRoutes.js';
import usuarioRoutes from './routes/UsuarioRoutes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname)); // Para servir arquivos HTML estáticos

// Conectar ao MongoDB
connectDB();

// Banco de códigos temporários (em memória)
const codigos = {};

// Configurar transporte de e-mail (em produção, use variáveis de ambiente!)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'seuemail@gmail.com',
    pass: process.env.EMAIL_PASS || 'suasenha'
  }
});

// Rota raiz
app.get('/', (req, res) => {
  res.send('API do Sistema de Projetos Online');
});

// Rotas de funcionalidade de redefinição de senha
app.post('/enviar-codigo', (req, res) => {
  const email = req.body.email;
  const codigo = Math.floor(100000 + Math.random() * 900000);
  codigos[email] = codigo;

  transporter.sendMail({
    to: email,
    subject: 'Código de verificação',
    text: `Seu código de verificação: ${codigo}`
  }, (err, info) => {
    if (err) return res.send('Erro ao enviar o e-mail');
    res.redirect(`/verificar.html?email=${email}`);
  });
});

app.post('/verificar-codigo', (req, res) => {
  const { email, codigo } = req.body;
  if (codigos[email] == codigo) {
    res.redirect(`/nova-senha.html?email=${email}`);
  } else {
    res.send('Código incorreto!');
  }
});

app.post('/redefinir-senha', (req, res) => {
  const { email, senha } = req.body;
  // Aqui você deve criptografar e salvar a nova senha no banco
  delete codigos[email];
  res.send('Senha redefinida com sucesso!');
});

// Usar rotas da API
app.use('/api/projeto', projetoRoutes);
app.use('/api/etapa', etapaRoutes);
app.use('/api/usuario', usuarioRoutes);

// Rota coringa para erros 404
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho: req.originalUrl
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
*/