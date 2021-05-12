const express = require('express');
const router = express.Router();
const chitietchuanController = require('../controllers/chitietchuanController');

router.post('/', chitietchuanController.insertChiTietChuan);
router.put('/', chitietchuanController.updateChiTietChuan);
router.delete('/', chitietchuanController.deleteChiTietChuan);

router.post('/checkexistchuan', chitietchuanController.checkExistChuan);

module.exports = router;