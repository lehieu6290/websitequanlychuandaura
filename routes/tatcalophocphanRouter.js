const express = require('express');
const router = express.Router();
const tatcalophocphanController = require('../controllers/tatcalophocphanController');

router.get('/', tatcalophocphanController.renderTatCaLopHocPhanListView);
router.post('/search', tatcalophocphanController.searchAllLopHocPhan);

module.exports = router;