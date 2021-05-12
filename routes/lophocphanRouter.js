const express = require('express');
const router = express.Router();
const lophocphanController = require('../controllers/lophocphanController');
const diemController =  require('../controllers/diemController');
const tylechuanController = require('../controllers/tylechuanController');
const danhgiaController = require('../controllers/danhgiaController');

router.get('/', lophocphanController.renderLopHocPhanListView);
router.post('/search', lophocphanController.searchLopHocPhan);

router.get('/diem/:idlophocphan', diemController.renderDiemLisView);
router.post('/diem', diemController.updateDiem);

router.get('/tylechuan/:idlophocphan', tylechuanController.renderTyLeChuanLisView);
router.post('/tylechuan', tylechuanController.insertTyLeChuan);

router.get('/danhgia/:idlophocphan', danhgiaController.renderDanhGiaView);

module.exports = router;