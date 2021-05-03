const TyLeChuan = require('../models/TyLeChuan');

module.exports = {
    renderTyLeChuanLisView(req, res){
        if(req.isAuthenticated()){
            const idlophocphan = req.params.idlophocphan;
            TyLeChuan.getByLopHocPhan(idlophocphan)
            .then(data => {
                if(data.rowCount > 0){
                    res.render('tylechuanlistview', { idlophocphan, data });
                }else{
                    TyLeChuan.getByLopHocPhanToInsert(idlophocphan)
                    .then(data => {
                        res.render('tylechuanlistview', { idlophocphan, data });
                    })
                    .catch(() => {
                        res.send("ERROR");
                    })
                }
            })
            .catch(() => {
                res.send("ERROR");
            })
            
        }else{
            res.redirect('/login');
        }
    },

    insertTyLeChuan(req, res){
        if(req.isAuthenticated()){
            const { idlophocphan, data } = req.body;
            TyLeChuan.getByLopHocPhan(idlophocphan)
            .then(dt => {
                if(dt.rowCount > 0){
                    for(let i = 0; i < data.length; i++){
                        TyLeChuan.update(idlophocphan, data[i].machuan, data[i].tyle);
                    }
                }else{
                    for(let i = 0; i < data.length; i++){
                        TyLeChuan.insert(idlophocphan, data[i].machuan, data[i].tyle);
                    }
                }

                res.json({ status: true });
            })
            .catch(() => {
                res.send("ERROR");
            })
            
        }else{
            res.redirect('/login');
        }
    },
}