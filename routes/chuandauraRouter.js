const express = require('express');
const router = express.Router();
const chuandauraController = require('../controllers/chuandauraController');

router.get('/', chuandauraController.renderChuanDauRaView);
router.post('/', chuandauraController.addChuanDauRa);
router.put('/', chuandauraController.updateChuanDauRa);
router.delete('/', chuandauraController.deleteChuanDauRa);

router.post('/search', chuandauraController.searchChuanDauRa);
router.post('/checkexist', chuandauraController.checkExistChuanDauRa);

router.post('/search/json', chuandauraController.searchAPI);

module.exports = router;