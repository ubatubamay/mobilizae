const express = require('express');
const router = express.Router();
const handleAuthorization = require('../controllers/authorization');

const campaing = require('../controllers/campaing.controller');

router.get('/', campaing.getCampaings);
router.post('/', campaing.registerCampaing);
router.get('/:id', campaing.getCampaing);

module.exports = router;