
import express from 'express';
import {
  listarEtapa,
  obterEtapa,
  criarEtapa,
  atualizarEtapa,
  deletarEtapa,
} from '../controllers/EtapaController.js';

const router = express.Router();


// localhost:3000/api/agendamentos/listaId/id

// router.get('/users', listarUsers);
router.get('/listarEt/:projetoId', listarEtapa);
router.get('/obterIdEt/:id', obterEtapa);
router.post('/createEt', criarEtapa);
router.put('/:idEt', atualizarEtapa);
router.delete('/deleteEt/:id', deletarEtapa);

router.use((req, res) => {
  res.status(404).json({
    erro: 'SubRota de /etapa não encontrada',
    caminho: req.originalUrl
  });
});


export default router;