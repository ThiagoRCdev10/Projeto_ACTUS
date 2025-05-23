const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/uploads'; // Altere conforme sua config

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('pdfs');
});

// Configuração de armazenamento
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'pdfs',
    };
  },
});
const upload = multer({ storage });

// Rota para upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

// Rota para download
app.get('/download/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'Arquivo não encontrado' });
    }

    const readstream = gfs.createReadStream(file.filename);
    res.set('Content-Type', 'application/pdf');
    readstream.pipe(res);
  });
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
