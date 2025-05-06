// server/controllers/AgendamentoController.js
import Projeto from '../models/Projeto.js';


export const listarProjetos = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const projetos = await Projeto.find({ usuarioId });
    res.json(projetos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar projetos do usuário" });
  }
};

export const criarProjetos = async (req, res) => {
  const { data,  duracaoFinal, endereco, cidade, estado, descricao, titulo, usuarioId, status, tag } = req.body;
  const novo = new Projeto({ data,  duracaoFinal, endereco, cidade, estado, descricao, titulo, usuarioId, status, tag });
  await novo.save();
  
};

export const obterProjeto = async (req, res) => {
  const ag = await Projeto.findById(req.params.id);
  if (!ag) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(ag);

  // console.log(req.params);
  // res.send("Obtendo...");
};

export const atualizarProjeto = async (req, res) => {
  const { data,  duracaoFinal, endereco, cidade, estado, descricao, titulo, usuarioId, status, tag } = req.body;
  const ag = await Projeto.findByIdAndUpdate(req.params.id, { data,  duracaoFinal, endereco, cidade, estado, descricao, titulo, usuarioId, status, tag }, { new: true });
  res.json(ag);
};

export const deletarProjeto = async (req, res) => {
  await Projeto.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

