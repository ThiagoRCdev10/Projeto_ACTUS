import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  descricao: String,
  valor: Number,
}, { _id: false });

const etapaSchema = new mongoose.Schema({
  data: {
    type: Date, 
    required:true
  },
  nome:{ 
    type: String, 
    required:true
  },
  descricao:{ 
    type: String, 
    required:true
  },
  valor: {
    type:String, 
    required:true
  },
  projetoId: {
    type:String, 
    required:true
  },
  itens:[ItemSchema]
  });
  
  export default mongoose.model('Etapa', etapaSchema);