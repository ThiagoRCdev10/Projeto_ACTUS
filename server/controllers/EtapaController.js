// server/controllers/AgendamentoController.js
import Etapa from '../models/Etapa.js';


export const listarEtapa = async (req, res) => {
  const etapas = await Etapa.find();
  res.json(etapas);
};

export const criarEtapa = async (req, res) => {
  const { data, nome, descricao, valor, projetoid } = req.body;
  const novo = new Etapa({ data, nome, descricao, valor, projetoid });
  await novo.save();
};

export const obterEtapa = async (req, res) => {
  const ag = await Etapa.findById(req.params.id);
  if (!ag) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(ag);
};

export const atualizarEtapa = async (req, res) => {
  const { data, nome, descricao, valor, projetoid } = req.body;
  const ag = await Etapa.findByIdAndUpdate(req.params.id, { data, nome, descricao, valor, projetoid }, { new: true });
  res.json(ag);
};

export const deletarEtapa = async (req, res) => {
  await Etapa.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

