const Diem = require('../models/Diem');

module.exports = {
    renderDiemLisView(req, res){
        if(req.isAuthenticated()){
            Diem.getByLopHocPhan(req.params.idlophocphan)
            .then(data => {
                res.render('diemlistview', { data });
            })
            .catch(() => {
                res.send("ERROR");
            })
            
        }else{
            res.redirect('/login');
        }
    }
}