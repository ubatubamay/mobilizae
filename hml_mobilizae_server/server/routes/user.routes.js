const express = require('express');
const router = express.Router();
const handleAuthentication = require('../controllers/authentication');

const user = require('../controllers/user.controller');

router.get('/', user.getUsers);
router.post('/', user.createUser);
router.get('/:id', user.getUser);
router.put('/:id', user.editUser);
router.delete('/:id', user.deleteUser);

router.post('/register', user.registerUser);
router.post('/login', handleAuthentication);

module.exports = router;