const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request - sem autorização');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).send('Unauthorized request - null');
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload) {
        return res.status(401).send('Unauthorized request - sem playload'); 
    }
    req.userId = payload.subject;
    next();
}

const school = require('../controllers/school.controller');

//se quiser restringir o acesso direto ao endereço do banco 
//localhost:3000, usar a função verifyToken como parâmetro entre
//o path e o controller
router.get('/', school.getSchools);
router.post('/', school.createSchool);
router.get('/:id', school.getSchool);
router.put('/:id', school.editSchool);
router.delete('/:id', school.deleteSchool);


module.exports = router;