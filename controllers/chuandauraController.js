const ChuanDauRa = require('../models/ChuanDauRa');

module.exports = {
    renderChuanDauRaView(req, res){
        if(req.isAuthenticated()){
            const {magiangvien, hoten, admin} = req.user;
            ChuanDauRa.getAll()
            .then(data => {
                res.render('chuandauralistview', {data, magiangvien, hoten, admin});
            })
            .catch(() => {
                res.send("ERROR");
            })
        }else{
            res.redirect('/login');
        }
    },

    searchChuanDauRa(req, res){
        if(req.isAuthenticated()){
            const {magiangvien, hoten, admin} = req.user;
            const {machuan} = req.body;
            ChuanDauRa.search(machuan)
            .then(data => {
                res.render('chuandaurasearch', {data, magiangvien, hoten, admin});
            })
            .catch(() => {
                res.send("ERROR");
            })
        }else{
            res.redirect('/login');
        }
    },

    searchAPI(req, res){
        if(req.isAuthenticated()){
            const {machuan} = req.body;
            ChuanDauRa.searchAPI(machuan)
            .then(data => {
                res.json({status: true, list: data.rows});
            })
            .catch(() => {
                res.json({status: false});
            })
        }
    },

    checkExistChuanDauRa(req, res){
        const {machuan} = req.body;
        ChuanDauRa.get(machuan.toUpperCase())
        .then(data => {
            if(data.rowCount > 0){
                res.json({exist: true});
            }else{
                res.json({exist: false});
            }
        })
    },

    addChuanDauRa(req, res){
        const {machuan, noidung} = req.body;
        ChuanDauRa.insert(machuan.toUpperCase(), noidung)
        .then(data => {
            res.json({status: true});
        })
        .catch(() => {
            res.json({status: false});
        })
    },

    updateChuanDauRa(req, res){
        const {machuan, noidung} = req.body;
        ChuanDauRa.update(machuan.toUpperCase(), noidung)
        .then(data => {
            res.json({status: true});
        })
        .catch(() => {
            res.json({status: false});
        })
    },

    deleteChuanDauRa(req, res){
        const {machuan} = req.body;
        ChuanDauRa.delete(machuan.toUpperCase())
        .then(data => {
            res.json({status: true});
        })
        .catch(() => {
            res.json({status: false});
        })
    },
}