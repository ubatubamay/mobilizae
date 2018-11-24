var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');

router.get('/', controller.index);
router.post('/', controller.singUp);
router.get('/logout', controller.logout);
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);
router.get('/:id/me', controller.me);
router.put('/:id/password', controller.changePassword);


module.exports = router;
