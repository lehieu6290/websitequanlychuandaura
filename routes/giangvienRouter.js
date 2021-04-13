const express = require('express');
const router = express.Router();
const giangvienController = require('../controllers/giangvienController');

router.get('/', giangvienController.renderIndexView);
router.get('/login', giangvienController.renderLoginView);
router.post('/login', giangvienController.login);
router.get('/logout', giangvienController.logout);

module.exports = router;