
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
    enum: ["A fazer", "Em desenvolvimento", "Finalizado"], // Restringe valores possíveis
    default: "A fazer"
  },
  tag: {
    type:String, 
    required:true,
    enum: ["aberta", "em processo", "concluido", "rejeitado"], // Restringe valores possíveis
    default: "aberta"
  }

});

export default mongoose.model('Projeto', projetoSchema);
