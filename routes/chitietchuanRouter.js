const express = require('express');
const router = express.Router();
const chitietchuanController = require('../controllers/chitietchuanController');

router.put('/', chitietchuanController.updateChiTietChuan);
router.delete('/', chitietchuanController.deleteChiTietChuan);

module.exports = router;