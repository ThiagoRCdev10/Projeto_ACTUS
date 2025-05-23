import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  dataNascimento: {
    type: Date, 
    required:true
  },
  nomeCompleto:{ 
    type: String, 
    required:true
  },
  email:{ 
    type: String, 
    required:true
  },
  cargo: {
    type:String, 
    required:true
  },
  senha: {
    type:String, 
    required:true
  }

});

export default mongoose.model('Usuario', usuarioSchema);