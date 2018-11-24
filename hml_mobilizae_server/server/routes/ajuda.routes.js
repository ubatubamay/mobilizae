const express = require('express');
const router = express.Router();
const handleAuthorization = require('../controllers/authorization');

const ajuda = require('../controllers/ajuda.controller');

router.get('/', ajuda.getAjudas);
router.post('/', ajuda.registerAjuda);
router.get('/:id', ajuda.getAjuda);

module.exports = router;