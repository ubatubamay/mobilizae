const School = require('../models/school');
const schoolCtrl = {};

schoolCtrl.getSchools = async (req, res) => {
    const schools = await School.find();
    res.json(schools);
}

schoolCtrl.createSchool = async (req, res) => {
   const school = new School({
       name: req.body.name,
       cidade: req.body.cidade,
       estado: req.body.estado,
       governo: req.body.governo
   });
   await school.save();
    res.json({
       'status': 'School saved' 
    });
}

schoolCtrl.getSchool = async (req, res) => {
    const school = await School.findById(req.params.id);
    res.json(school);
}

schoolCtrl.editSchool = async (req, res) => {
    const { id } =  req.params;
    const school = {
        name: req.body.name,
        cidade: req.body.cidade,
        estado: req.body.estado,
        governo: req.body.governo
    };
    await School.findByIdAndUpdate(id, {$set: school}, {new: true});
    res.json({status: 'School Updated'});
}

schoolCtrl.deleteSchool = async (req, res) => {
    await School.findByIdAndRemove(req.params.id);
    res.json({status: 'Schoold deleted'});
}

module.exports = schoolCtrl;