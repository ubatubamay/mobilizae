const Campaing = require ('../models/campaing');
const campaingCtrl = {};

campaingCtrl.getCampaings = async (req, res) => {
    const campaings = await Campaing.find();
    res.json(campaings);
}

campaingCtrl.registerCampaing = async (req, res) => {
    let campaingData = req.body;
    let campaing = new Campaing(campaingData);
    campaing.save((err, registeredCampaing) => {
        if(err) {
            console.log(err);
        }else{
            res.status(200).send(registeredCampaing);
        }
    });
}

campaingCtrl.getCampaing = async (req, res) => {
    const campaing = await Campaing.findById(req.params.id);
    res.json(campaing);
}

module.exports = campaingCtrl;