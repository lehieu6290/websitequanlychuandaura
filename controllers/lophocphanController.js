const LopHocPhan = require('../models/LopHocPhan');

module.exports = {
    renderLopHocPhanListView(req, res){
        if(req.isAuthenticated()){
            const { magiangvien } = req.user;
            LopHocPhan.getLopHocPhanOf(magiangvien)
            .then(data => {
                res.render('lophocphanlistview', { data });
            })
            .catch(() => {
                res.send("ERROR");
            })
        }else{
            res.redirect('/login');
        }
    },
}