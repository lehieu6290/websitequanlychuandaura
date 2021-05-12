const Diem = require('../models/Diem');

module.exports = {
    renderDiemLisView(req, res){
        if(req.isAuthenticated()){
            const {magiangvien, hoten, admin} = req.user;
            const idlophocphan = req.params.idlophocphan;
            Diem.getByLopHocPhan(idlophocphan)
            .then(data => {
                res.render('diemlistview', { data, magiangvien, hoten, admin, idlophocphan });
            })
            .catch(() => {
                res.send("ERROR");
            })
            
        }else{
            res.redirect('/login');
        }
    },

    async updateDiem(req, res){
        const {idlophocphan, data} = req.body;

        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                try{
                    await Diem.update(idlophocphan, data[i].masinhvien, data[i].diem)
                }catch{
                    res.json({status: false});
                }
            }

            res.json({status: true});
        }
    },
}