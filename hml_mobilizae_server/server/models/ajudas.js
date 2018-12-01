const mongoose = require('mongoose');
const { Schema } = mongoose;

const AjudaSchema = new Schema({
    campanha: { type: Schema.Types.ObjectId, ref: 'Campaing' },
    tipo: { type: String },
    vaga: { type: String },
    material: [{ id: String, qtd: Number }],
    status: {type: String, default: 'Aguardando confirmação' },
    usuario: { type: Schema.Types.ObjectId, ref: 'User' },
    _dataRequisicao: { type: String }
});

module.exports = mongoose.model('Ajuda', AjudaSchema);