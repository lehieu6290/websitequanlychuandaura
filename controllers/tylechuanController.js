const TyLeChuan = require('../models/TyLeChuan');

module.exports = {
    // renderTyLeChuanLisView(req, res){
    //     if(req.isAuthenticated()){
    //         const {magiangvien, hoten, admin} = req.user;
    //         const idlophocphan = req.params.idlophocphan;
    //         TyLeChuan.getByLopHocPhan(idlophocphan)
    //         .then(data => {
    //             if(data.rowCount > 0){
    //                 res.render('tylechuanlistview', { idlophocphan, data, magiangvien, hoten, admin });
    //             }else{
    //                 TyLeChuan.getByLopHocPhanToInsert(idlophocphan)
    //                 .then(data => {
    //                     res.render('tylechuanlistview', { idlophocphan, data, magiangvien, hoten, admin });
    //                 })
    //                 .catch(() => {
    //                     res.send("ERROR");
    //                 })
    //             }
    //         })
    //         .catch(() => {
    //             res.send("ERROR");
    //         })
            
    //     }else{
    //         res.redirect('/login');
    //     }
    // },

    async renderTyLeChuanLisView(req, res){
        if(req.isAuthenticated()){
            const {magiangvien, hoten, admin} = req.user;
            const idlophocphan = req.params.idlophocphan;
            
            try{
                const data = await TyLeChuan.getChuanDauRa(idlophocphan);
                if(data.rowCount > 0){
                    let arr = [];
                    for(let i = 0; i < data.rows.length; i++){
                        const {machuan, noidung, malophocphan} = data.rows[i];
                        const data2 = await TyLeChuan.getTyLeChuan(idlophocphan, machuan);
                        
                        if(data2.rowCount > 0){
                            arr.push({malophocphan, machuan, noidung, tyle: data2.rows[0].tyle});
                        }else{
                            arr.push({malophocphan, machuan, noidung, tyle: null});
                        }
                    }

                    res.render('tylechuanlistview', { idlophocphan, data: arr, magiangvien, hoten, admin });
                }else{
                    res.render('tylechuanlistview', { idlophocphan, data: [], magiangvien, hoten, admin });
                }
            }catch(error){
                res.send("ERROR");
            }
        }else{
            res.redirect('/login');
        }
    },

    async insertTyLeChuan(req, res){
        if(req.isAuthenticated()){
            const { idlophocphan, data } = req.body;

            try{
                for(let i = 0; i < data.length; i++){
                    const response = await TyLeChuan.getTyLeChuan(idlophocphan, data[i].machuan);
                    if(response.rowCount > 0){
                        await TyLeChuan.update(idlophocphan, data[i].machuan, data[i].tyle);
                    }else{
                        await TyLeChuan.insert(idlophocphan, data[i].machuan, data[i].tyle);
                    }
                }

                res.json({ status: true });
            }catch(error){
                res.send("ERROR");
            }
            
        }else{
            res.redirect('/login');
        }
    },
}