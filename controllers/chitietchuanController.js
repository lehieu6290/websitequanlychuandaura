const ChiTietChuan = require('../models/ChiTietChuan');
const TyLeChuan = require('../models/TyLeChuan');

module.exports = {
    renderChiTietChuanListView(req, res){
        if(req.isAuthenticated()){
            const {magiangvien, hoten, admin} = req.user;
            ChiTietChuan.getAll(req.params.mahocphan)
            .then(data => {
                res.render('chitietchuanlistview', { data, magiangvien, hoten, admin, mahocphan: req.params.mahocphan });
            })
            .catch(() => {
                res.send("ERROR");
            })
        }else{
            res.redirect('/login');
        }
    },

    deleteChiTietChuan(req, res){
        if(req.isAuthenticated()){
            const {mahocphan, machuan} = req.body;

            try{
                await = ChiTietChuan.delete(mahocphan, machuan);
                await = TyLeChuan.delete(machuan);
                res.json({status: true});
            }catch(error){
                res.json({status: false});
            }

            // ChiTietChuan.delete(mahocphan, machuan)
            // .then(data => {
            //     res.json({status: true});
            // })
            // .catch(() => {
            //     res.json({status: false});
            // })
        }else{
            res.redirect('/login');
        }
    },

    updateChiTietChuan(req, res){
        if(req.isAuthenticated()){
            const { mahocphan, machuan, mamucdiem, phantram } = req.body;

            ChiTietChuan.update(mahocphan, machuan, mamucdiem, phantram)
            .then(data => {
                res.json({status: true});
            })
            .catch(() => {
                res.json({status: false});
            })
        }else{
            res.redirect('/login');
        }
    },

    insertChiTietChuan(req, res){
        const { mahocphan, machuan, mamucdiem, phantram } = req.body;

        ChiTietChuan.insert(mahocphan, machuan.toUpperCase(), mamucdiem, phantram)
        .then(data => {
            res.json({status: true});
        })
        .catch(() => {
            res.json({status: false});
        })
    },

    checkExistChuan(req, res){
        const { mahocphan, machuan } = req.body;

        ChiTietChuan.checkExistChuan(mahocphan, machuan)
        .then(data => {
            if(data.rowCount > 0){
                res.json({status: true});
            }else{
                res.json({status: false});
            }
        })
    },
}