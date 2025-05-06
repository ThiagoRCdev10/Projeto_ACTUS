import Usuario from '../models/Usuario.js';



export const listarUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

export const criarUsuario = async (req, res) => {
  const {  dataNascimento, nomeCompleto, email, cargo, senha } = req.body;
  const novo = new Usuario({ dataNascimento, nomeCompleto, email, cargo, senha });
  await novo.save();
  res.status(201).json(novo);
};
export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email, senha });

  if (!usuario) {
    return res.status(401).json({ erro: "Email ou senha incorretos" });
  }
  res.json({ mensagem: "Login válido", usuario });
};

export const obterUsuario = async (req, res) => {
  const ag = await Usuario.findById(req.params.id);
  if (!ag) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(ag);

  // console.log(req.params);
  // res.send("Obtendo...");
};

export const atualizarUsuario = async (req, res) => {
    const {  dataNascimento, nomeCompleto, email, cargo, senha } = req.body;
  const ag = await Usuario.findByIdAndUpdate(req.params.id, { dataNascimento, nomeCompleto, email, cargo, senha }, { new: true });
  res.json(ag);
};

export const deletarUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.status(204).end();
};