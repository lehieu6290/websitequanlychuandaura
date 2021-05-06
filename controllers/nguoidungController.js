const GiangVien = require('../models/GiangVien');
const bcrypt = require('bcrypt');

module.exports = {
    renderNguoiDungListView(req, res){
        if(req.isAuthenticated()){
            const { magiangvien, hoten, admin } = req.user;

            GiangVien.getAll()
            .then(data => {
                res.render('nguoidunglistview', { data, hoten, admin, magiangvien });
            })
            .catch(() => {
                res.send("ERROR");
            })
            
        }else{
            res.redirect('/login');
        }
    },

    searchNguoiDung(req, res){
        if(req.isAuthenticated()){
            const { magiangvien, hoten, admin } = req.user;
            const { namesearch } = req.body;
            GiangVien.search(namesearch)
            .then(data => {
                res.render('nguoidungsearch', { data, hoten, admin, magiangvien });
            })
            .catch(() => {
                res.send("ERROR");
            })
            
        }else{
            res.redirect('/login');
        }
    },

    checkExistNguoiDung(req, res){
        const { magiangvien } = req.body;
        GiangVien.get(magiangvien.toLowerCase())
        .then((data) => {
            if(data.rowCount > 0){
                res.json({exist: true});
            }else{
                res.json({exist: false});
            }
        })
        .catch(()=>{
            res.send("ERROR");
        })
    },

    async addNguoiDung(req, res){
        const { magiangvien, hoten, email, admin, matkhau } = req.body;
        let passwordHashed = await bcrypt.hash(matkhau, 10);
        GiangVien.insert(magiangvien.toLowerCase(), hoten, email, admin, passwordHashed)
        .then((data) => {
            res.json({status: true});
        })
        .catch(() => {
            res.json({status: false});
        })
    },

    async updateNguoiDung(req, res){
        const { magiangvien, hoten, email, admin, matkhau } = req.body;
        if(matkhau != ''){
            let passwordHashed = await bcrypt.hash(matkhau, 10);
            GiangVien.updateWithPassword(magiangvien.toLowerCase(), hoten, email, admin, passwordHashed)
            .then((data) => {
                res.json({status: true});
            })
            .catch(() => {
                res.json({status: false});
            })
        }else{
            GiangVien.updateWithoutPassword(magiangvien.toLowerCase(), hoten, email, admin)
            .then((data) => {
                res.json({status: true});
            })
            .catch(() => {
                res.json({status: false});
            })
        }
    },

    deleteNguoiDung(req, res){
        GiangVien.delete(req.body.magiangvien.toLowerCase())
        .then((data) => {
            res.json({status: true});
        })
        .catch(() => {
            res.json({status: false});
        })
    }
}