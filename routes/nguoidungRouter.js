const express = require('express');
const router = express.Router();
const nguoidungController = require('../controllers/nguoidungController');

router.get('/', nguoidungController.renderNguoiDungListView);
router.post('/', nguoidungController.addNguoiDung);
router.put('/', nguoidungController.updateNguoiDung);
router.delete('/', nguoidungController.deleteNguoiDung);
router.post('/search', nguoidungController.searchNguoiDung);
router.post('/checkexist', nguoidungController.checkExistNguoiDung);

module.exports = router;