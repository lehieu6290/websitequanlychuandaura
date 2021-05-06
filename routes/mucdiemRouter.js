const express = require('express');
const router = express.Router();
const mucdiemController = require("../controllers/mucdiemController");

router.get('/json', mucdiemController.getAllJSON);

module.exports = router;