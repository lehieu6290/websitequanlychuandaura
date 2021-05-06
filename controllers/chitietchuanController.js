const ChiTietChuan = require('../models/ChiTietChuan');

module.exports = {
    renderChiTietChuanListView(req, res){
        if(req.isAuthenticated()){
            ChiTietChuan.getAll(req.params.mahocphan)
            .then(data => {
                res.render('chitietchuanlistview', { data, mahocphan: req.params.mahocphan });
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
            ChiTietChuan.delete(mahocphan, machuan)
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
}