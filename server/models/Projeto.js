
import mongoose from 'mongoose';

const projetoSchema = new mongoose.Schema({
  data: {
    type: Date, 
    required:true
  },
  dataFinal: {
    type: Date, 
  },
  endereco:{ 
    type: String, 
    required:true
  },
  cidade:{ 
    type: String, 
  },
  estado:{ 
    type: String, 
  },
  descricao:{ 
    type: String, 
    required:true
  },
  titulo:{ 
    type: String, 
    required:true
  },
  usuarioId: {
    type: String, 
    required:true
  },
  status: {
    type:String, 
    required:true,
    enum: ["afazer", "emdev", "finalizado"], // Restringe valores possíveis
    default: "afazer"
  },
  tag: {
    type:String, 
    required:true,
    enum: ["aberta", "em processo", "concluido", "rejeitado","em verificação","em espera"], // Restringe valores possíveis
    default: "aberta"
  }

});

export default mongoose.model('Projeto', projetoSchema);
