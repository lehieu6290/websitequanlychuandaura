const HocPhan = require('../models/HocPhan');

module.exports = {
    renderHocPhanListView(req, res){
        if(req.isAuthenticated()){
            const {magiangvien, hoten, admin} = req.user;
            HocPhan.getAll()
            .then(data => {
                res.render('hocphanlistview', { data, magiangvien, hoten, admin });
            })
            .catch(() => {
                res.send("ERROR");
            })
            
        }else{
            res.redirect('login');
        }
    },

    searchHocPhan(req, res){
        if(req.isAuthenticated()){
            const {magiangvien, hoten, admin} = req.user;
            const {mahocphan} = req.body;
            HocPhan.search(mahocphan)
            .then(data => {
                res.render('hocphansearch', { data, magiangvien, hoten, admin });
            })
            .catch(() => {
                res.send("ERROR");
            })
            
        }else{
            res.redirect('login');
        }
    }
}