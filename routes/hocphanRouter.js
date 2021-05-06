const express = require('express');
const router = express.Router();
const hocphanController = require('../controllers/hocphanController');
const chitietchuanController = require('../controllers/chitietchuanController');

router.get('/', hocphanController.renderHocPhanListView);
router.post('/search', hocphanController.searchHocPhan);
router.get('/:mahocphan', chitietchuanController.renderChiTietChuanListView);

module.exports = router;