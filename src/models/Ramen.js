import mongoose from 'mongoose';

const RamenSchema = new mongoose.Schema({
    sabor: { type: String, required: true },
    descricao: { type: String, required: true },
    foto: { type: String, required: true },
    preco: { type: Number, required: true },
  });


export const Ramen = mongoose.model('ramens', RamenSchema);
