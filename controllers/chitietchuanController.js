const ChiTietChuan = require('../models/ChiTietChuan');

module.exports = {
    renderChiTietChuanListView(req, res){
        if(req.isAuthenticated()){
            ChiTietChuan.getAll(req.params.mahocphan)
            .then(data => {
                res.render('chitietchuanlistview', { data });
            })
            .catch(() => {
                res.send("ERROR");
            })
        }else{
            res.redirect('/login');
        }
    }
}