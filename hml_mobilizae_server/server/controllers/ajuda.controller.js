const Ajuda = require ('../models/ajudas');
const ajudaCtrl = {};

ajudaCtrl.getAjudas = async (req, res) => {
    const ajudas = await Ajuda.find().populate('campanha').populate('usuario');
    res.json(ajudas);
}

ajudaCtrl.registerAjuda = async (req, res) => {
    let ajudaData = req.body;
    let ajuda = new Ajuda(ajudaData);
    ajuda.save((err, registeredAjuda) => {
        if(err) {
            console.log(err);
        }else{
            res.status(200).send(registeredAjuda);
        }
    });
}

ajudaCtrl.getAjuda = async (req, res) => {
    const ajuda = await Ajuda.findById(req.params.id);
    res.json(ajuda);
}

module.exports = ajudaCtrl;