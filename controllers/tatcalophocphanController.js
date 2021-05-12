const LopHocPhan = require('../models/LopHocPhan');
const NienKhoa = require('../models/NienKhoa');

module.exports = {

    async renderTatCaLopHocPhanListView(req, res){
        if(req.isAuthenticated()){
            const { magiangvien, hoten, admin } = req.user;
            try{
                const data = await NienKhoa.getAll();
        
                if(data.rowCount > 0){
                    let result = [];
                    for(let i = 0; i < data.rows.length; i++){
                        const data2 = await LopHocPhan.getAllLopHocPhanByNienKhoa(magiangvien, data.rows[i].manienkhoa);
                        if(data2.rowCount > 0){
                            let obj = {};
                            obj.nienkhoa = "Năm học " + data.rows[i].namhoc + ", học kỳ " + data.rows[i].hocky;
                            obj.lophocphan = data2.rows;
                            result.push(obj);
                        }
                    }

                    res.render('tatcalophocphanlistview', { data: result, hoten, admin });
                }
            }catch(err){
                res.send("ERROR");
            }
        }else{
            res.redirect('/login');
        }
    },

    async searchAllLopHocPhan(req, res){
        if(req.isAuthenticated()){
            const { magiangvien, hoten, admin } = req.user;
            try{
                const data = await NienKhoa.getAll();
                const {malophocphan} = req.body;
                
                if(data.rowCount > 0){
                    let result = [];
                    for(let i = 0; i < data.rows.length; i++){
                        const data2 = await LopHocPhan.searchAll(magiangvien, data.rows[i].manienkhoa, malophocphan);
                        if(data2.rowCount > 0){
                            let obj = {};
                            obj.nienkhoa = "Năm học " + data.rows[i].namhoc + ", học kỳ " + data.rows[i].hocky;
                            obj.lophocphan = data2.rows;
                            result.push(obj);
                        }
                    }

                    res.render('tatcalophocphansearch', { data: result, hoten, admin });
                }
            }catch(err){
                res.send("ERROR");
            }
        }else{
            res.redirect('/login');
        }
    },
}