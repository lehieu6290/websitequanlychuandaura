const HocPhan = require('../models/HocPhan');

module.exports = {
    renderHocPhanListView(req, res){
        if(req.isAuthenticated()){
            HocPhan.getAll()
            .then(data => {
                res.render('hocphanlistview', { data });
            })
            .catch(() => {
                res.send("ERROR");
            })
            
        }else{
            res.redirect('login');
        }
    }
}