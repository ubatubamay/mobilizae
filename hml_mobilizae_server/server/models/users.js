const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    role: { type: String },
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },       
    cpf: { type: String },
    data_nascimento: { type: String },
    endereco: {
        logradouro: { type: String }, 
        numero: { type: Number }, 
        bairro: { type: String }, 
        cidade: { type: String }, 
        uf: { type: String }
    },
    slogan: { type: String },    
    governo: {type: String},
    nivelEducacional: {type: String},
    descricao: {type: String},
});

module.exports = mongoose.model('User', UserSchema);