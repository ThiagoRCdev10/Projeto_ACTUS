import express from 'express';
import {
    listarUsuarios,
    criarUsuario,
    obterUsuario,
    atualizarUsuario,
    deletarUsuario,
    loginUsuario,
    

} from '../controllers/UsuarioController.js';

const router = express.Router();


router.get('/listarUs', listarUsuarios);
router.get('/obterIdUs/:id', obterUsuario);
router.post('/createUs', criarUsuario);
router.post('/login', loginUsuario);
router.put('/:idUs', atualizarUsuario);
router.delete('/deleteUs/:id', deletarUsuario);

router.use((req, res) => {
  res.status(404).json({
    erro: 'SubRota de /usuario não encontrada',
    caminho: req.originalUrl
  });
});


export default router;