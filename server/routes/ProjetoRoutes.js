// server/routes/agendamentoRoutes.js

import express from 'express';
import {
  listarProjetos,
  obterProjeto,
  criarProjetos,
  atualizarProjeto,
  deletarProjeto,
} from '../controllers/ProjetoController.js';

const router = express.Router();


// localhost:3000/api/agendamentos/listaId/id

// router.get('/users', listarUsers);
router.get('/listarPj', listarProjetos);
router.get('/obterIdPj/:id', obterProjeto);
router.post('/createPj', criarProjetos);
router.put('/:idPj', atualizarProjeto);
router.delete('/deletePj/:id', deletarProjeto);

router.use((req, res) => {
  res.status(404).json({
    erro: 'SubRota de /projeto não encontrada',
    caminho: req.originalUrl
  });
});


export default router;
