const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

router.get('/:username', accountController.getAccountByUserName);

module.exports = router;