import mongoose from "mongoose";

const Mots = mongoose.model('Mots', new mongoose.Schema({
    contenue: { type: String, unique: true },
    
}));

export default Mots