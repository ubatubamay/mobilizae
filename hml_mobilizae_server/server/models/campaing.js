const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampaingSchema = new Schema({
    tipo: { type: String},
    titulo: { type: String},
    resumo: { type: String },
    sobre: { type: String},
    dataHora: {type: String},
    materiais: [{id: Number, qtd: Number, tipoMaterial: String}],
    vagas: [{id: Number, qtd: Number, nomeVaga: String, descVaga: String}],
    _dataCriacao: String
});

module.exports = mongoose.model('Campaing', CampaingSchema);