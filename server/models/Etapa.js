import mongoose from 'mongoose';

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
      required:true,
      unique:true
    }
  });
  
  export default mongoose.model('Etapa', etapaSchema);