const mongoose = require('mongoose');
const { Schema } = mongoose;

const SchoolSchema = new Schema({
    name: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    governo: { type: String, required: true }
});

module.exports = mongoose.model('School', SchoolSchema);