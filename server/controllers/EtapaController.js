// server/controllers/AgendamentoController.js
import Etapa from '../models/Etapa.js';


export const listarEtapa = async (req, res) => {
  try {
    const { projetoId } = req.params;
    const etapas = await Etapa.find({ projetoId });
    res.status(200).json(etapas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar etapas' });
  }
};

export const criarEtapa = async (req, res) => {
  const { nome, descricao, valor, projetoId, itens } = req.body;
  const novo = new Etapa({
      data: new Date(),  
      nome,
      descricao,
      valor,
      projetoId,
      itens: itens || []
    });
  await novo.save();
  res.json(novo);
};

export const obterEtapa = async (req, res) => {
  const ag = await Etapa.findById(req.params.id);
  if (!ag) return res.status(404).json({ erro: 'Etapa não encontrado' });
  res.json(ag);
};

export const atualizarEtapa = async (req, res) => {
  const {  nome, descricao, valor, itens } = req.body;
  const ag = await Etapa.findByIdAndUpdate(req.params.idEt, {  nome, descricao, valor,  itens }, { new: true });
  res.json(ag);
};

export const deletarEtapa = async (req, res) => {
  await Etapa.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

