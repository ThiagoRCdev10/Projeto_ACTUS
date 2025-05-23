import Usuario from '../models/Usuario.js';
import {hashPassword, isPasswordValid} from '../utils/bcrypt.js'; 
import {gerarToken} from '../utils/jwt.js';

export const listarUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

export const criarUsuario = async (req, res) => {
  const {  dataNascimento, nomeCompleto, email, cargo, senha } = req.body;
  const senhaCriptografada = await hashPassword(senha);
  const novo = new Usuario({ dataNascimento, nomeCompleto, email, cargo, senha: senhaCriptografada });
  await novo.save();
  res.status(201).json(novo);
};
export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ erro: "Email incorretos" });
    }

    const senhaValida = await isPasswordValid(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "senha incorretos" });
    }

    const token = gerarToken(usuario._id);

    res.status(200).json({
      mensagem: "Login válido",
      token,
      usuario: {
        id: usuario._id,
        nomeCompleto: usuario.nomeCompleto,
        email: usuario.email,
        cargo: usuario.cargo,
        dataNascimento: usuario.dataNascimento
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
};

export const obterUsuario = async (req, res) => {
  const ag = await Usuario.findById(req.params.id);
  if (!ag) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(ag);

  // console.log(req.params);
  // res.send("Obtendo...");
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { dataNascimento, nomeCompleto, email, cargo, senha } = req.body;

    const senhaHash = await hashPassword(senha);

    const atualizado = await Usuario.findByIdAndUpdate(
      req.params.idUs,
      { dataNascimento, nomeCompleto, email, cargo, senha: senhaHash },
      { new: true }
    );

    res.json(atualizado);
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
};

export const atualizarInfoBasica = async (req, res) => {
  try {
    const { nomeCompleto, cargo, dataNascimento } = req.body;

    const atualizado = await Usuario.findByIdAndUpdate(
      req.params.idUs1,
      { nomeCompleto, cargo, dataNascimento },
      { new: true }
    );

    if (!atualizado) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(atualizado);
  } catch (err) {
    console.error('Erro ao atualizar dados básicos do usuário:', err);
    res.status(500).json({ erro: 'Erro ao atualizar dados básicos do usuário' });
  }
};

export const deletarUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.status(204).end();
};