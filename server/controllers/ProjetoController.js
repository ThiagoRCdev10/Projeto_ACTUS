// server/controllers/AgendamentoController.js
import Projeto from '../models/Projeto.js';


export const listarProjetos = async (req, res) => {
  const usuarioId = req.params.idUs;

  try {
    
    const projetos = await Projeto.find({ usuarioId });

    const projetosFormatados = projetos.map((projeto, index) => ({
      id: projeto._id.toString(),
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      status: projeto.status.toLowerCase(),
      tag: projeto.tag.toLowerCase(),
      cidade: projeto.cidade || "",
      estado: projeto.estado || "",
      endereco: projeto.endereco,
      responsavel: projeto.usuarioId || "",
      dataFinal: projeto.dataFinal,
      dataCriacao: projeto.data
    }));

    res.json(projetosFormatados);
  } catch (erro) {
    console.error("Erro ao buscar projetos:", erro);
    res.status(500).json({ erro: "Erro ao buscar projetos do usuário" });
  }
};

export const criarProjetos = async (req, res) => {
  try {
    const { data, dataFinal, endereco, cidade, estado, descricao, titulo, usuarioId, status, tag } = req.body;
    
    const novo = new Projeto({ data, dataFinal, endereco, cidade, estado, descricao, titulo, usuarioId, status, tag });
    await novo.save();

    res.status(201).json({ message: "Projeto criado com sucesso!", projeto: novo });

  } catch (erro) {
    console.error("Erro ao criar projeto:", erro);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const obterProjeto = async (req, res) => {
  const ag = await Projeto.findById(req.params.id);
  if (!ag) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(ag);

  // console.log(req.params);
  // res.send("Obtendo...");
};

export const moverProjeto = async (req, res) => {
  try {
    const { status, tag } = req.body;

    const projetoAtualizado = await Projeto.findByIdAndUpdate(
      req.params.idPj,
      { status, tag },
      { new: true }
    );

    res.json(projetoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar status e tag do projeto." });
  }
};

export const atualizarProjetoIndividual = async (req, res) => {
  try {
    const { data, dataFinal, endereco, cidade, estado, descricao, titulo } = req.body;

    const projetoAtualizado = await Projeto.findByIdAndUpdate(
      req.params.idPj,
      { data, dataFinal, endereco, cidade, estado, descricao, titulo},
      { new: true }
    );

    res.json(projetoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar projeto." });
  }
};

export const deletarProjeto = async (req, res) => {
  await Projeto.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

