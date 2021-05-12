const Diem = require('../models/Diem');
const TyLeChuan = require('../models/TyLeChuan');
const MucDiem = require('../models/MucDiem');

module.exports = {
    // async renderDanhGiaView(req, res){
    //     if(req.isAuthenticated()){
    //         const { magiangvien, hoten, admin } = req.user;
    //         const {idlophocphan} = req.params;
            
    //         try{
    //             let diem = await Diem.getByLopHocPhan(idlophocphan);
    //             diem = diem.rows.map(d => d.diem);
    //             let diemdanhap = diem.filter(d => d != null);
                
    //             const chuandaura = await TyLeChuan.getChuanDauRa(idlophocphan);
    //             if(chuandaura.rowCount > 0){
    //                 let arr = [];
    //                 for(let i = 0; i < chuandaura.rows.length; i++){
    //                     const {machuan, noidung, malophocphan} = chuandaura.rows[i];
    //                     const tylechuan = await TyLeChuan.getTyLeChuan(idlophocphan, machuan);
                        
    //                     if(tylechuan.rowCount > 0){
    //                         arr.push({machuan, noidung, tyle: tylechuan.rows[0].tyle});
    //                     }
    //                 }

    //                 if(arr.length == chuandaura.rowCount){
    //                     if(diemdanhap.length > 0){
    //                         const data = {
    //                             tongsodiem: diem.length,
    //                             tongsodiemdanhap: diemdanhap.length,
    //                             tongsochuan: arr.length,
    //                         }

    //                         let diemdatach = {};
    //                         if(arr.length > 1){
    //                             //Tach diem
    //                             diemdanhap.forEach(diem => {
    //                                 let total = 0;
    //                                 for(let i = 0; i < arr.length - 1; i++){
    //                                     let d = diem * arr[i].tyle/100.0;
    //                                     total += d;
    //                                     diemdatach[arr[i].machuan] = [...diemdatach[arr[i].machuan] || [], parseFloat((d /(arr[i].tyle / 100)).toFixed(2))];
    //                                 }


    //                             })


    //                         }else{
    //                             diemdatach[arr[0].machuan] = diemdanhap;
    //                         }
    //                         console.log(diemdatach);
                            
    //                         res.render('danhgiaview', {idlophocphan, magiangvien, hoten, admin, data});
    //                     }else{
    //                         res.render('danhgiaview', {idlophocphan, magiangvien, hoten, admin, data: null, error: 'Vui lòng nhập điểm để có thể thống kê'});
    //                     }
    //                 }else{    
    //                     res.render('danhgiaview', {idlophocphan, magiangvien, hoten, admin, data: null, error: 'Vui lòng nhập tỷ lệ chuẩn để có thể thống kê'});
    //                 } 
    //             }else{
    //                 res.render('danhgiaview', { idlophocphan, data: null, error: 'Học phần này chưa có chuẩn đầu ra', magiangvien, hoten, admin });
    //             }
    //         }catch(error){
    //             res.send("ERROR");
    //         }          
    //     }else{
    //         res.redirect('/login');
    //     }
    // },

    async renderDanhGiaView(req, res){
        if(req.isAuthenticated()){
            const { magiangvien, hoten, admin } = req.user;
            const {idlophocphan} = req.params;
            
            try{
                let diem = await Diem.getByLopHocPhan(idlophocphan);
                diem = diem.rows.map(d => d.diem);
                let diemdanhap = diem.filter(d => d != null);
            
                const chuandaura = await TyLeChuan.getChuanDauRa(idlophocphan);
                if(chuandaura.rowCount > 0){
                    if(diemdanhap.length > 0){
                        let soluongdiem = {MD1: 0, MD2: 0, MD3: 0, MD4: 0, MD5: 0};
                        for(let i = 0; i < diemdanhap.length; i++){
                            const diem = diemdanhap[i];
                            if(diem >= 9.0 && diem <= 10.0){
                                soluongdiem['MD1'] += 1;
                            }else if(diem >= 8.0 && diem < 9.0){
                                soluongdiem['MD2'] += 1;
                            }else if(diem >= 7.0 && diem < 8.0){
                                soluongdiem['MD3'] += 1;
                            }else if(diem >= 6.5 && diem < 7){
                                soluongdiem['MD4'] += 1;
                            }else{
                                soluongdiem['MD5'] += 1;
                            }
                        }
                        
                        let phantramdiem = [];
                        
                        let phantramMD1 = parseFloat((soluongdiem['MD1'] * 100.0 / diemdanhap.length).toFixed(2));
                        let phantramMD2 = parseFloat((soluongdiem['MD2'] * 100.0 / diemdanhap.length).toFixed(2));
                        let phantramMD3 = parseFloat((soluongdiem['MD3'] * 100.0 / diemdanhap.length).toFixed(2));
                        let phantramMD4 = parseFloat((soluongdiem['MD4'] * 100.0 / diemdanhap.length).toFixed(2));
                        phantramdiem.push({madiem: 'MD1', diemchu: 'A', phantram: phantramMD1});
                        phantramdiem.push({madiem: 'MD2', diemchu: 'B+', phantram: phantramMD2});
                        phantramdiem.push({madiem: 'MD3', diemchu: 'B', phantram: phantramMD3});
                        phantramdiem.push({madiem: 'MD4', diemchu: 'C+', phantram: phantramMD4});
                        phantramdiem.push({madiem: 'MD5', diemchu: 'K', phantram: parseFloat((100 - (phantramMD1 + phantramMD2 + phantramMD3 + phantramMD4)).toFixed(2))});

                        let ketqua = [];
                        for(let i = 0; i < chuandaura.rows.length; i++){
                            const {machuan, mamucdiem, phantram} = chuandaura.rows[i];
                
                            if(mamucdiem == "MD1"){
                                let thucte = phantramdiem[0].phantram;
                                thucte = thucte > 100 ? 100 : thucte;
                                let datchuan = thucte >= phantram ? "Đạt" : "Chưa đạt";
                                ketqua.push({machuan, phantram, nguongdiem: 'A', thucte, datchuan});
                            }else if(mamucdiem == "MD2"){
                                let thucte = phantramdiem[0].phantram + phantramdiem[1].phantram;
                                thucte = thucte > 100 ? 100 : thucte;
                                let datchuan = thucte >= phantram ? "Đạt" : "Chưa đạt";
                                ketqua.push({machuan, phantram, nguongdiem: 'B+', thucte, datchuan});
                            }else if(mamucdiem == "MD3"){
                                let thucte = phantramdiem[0].phantram + phantramdiem[1].phantram + phantramdiem[2].phantram;
                                thucte = thucte > 100 ? 100 : thucte;
                                let datchuan = thucte >= phantram ? "Đạt" : "Chưa đạt";
                                ketqua.push({machuan, phantram, nguongdiem: 'B', thucte, datchuan});
                            }else if(mamucdiem == "MD4"){
                                let thucte = phantramdiem[0].phantram + phantramdiem[1].phantram + phantramdiem[2].phantram + phantramdiem[3].phantram;
                                thucte = thucte > 100 ? 100 : thucte;
                                let datchuan = thucte >= phantram ? "Đạt" : "Chưa đạt";
                                ketqua.push({machuan, phantram, nguongdiem: 'C+', thucte, datchuan});
                            }else{
                                let thucte = phantramdiem[4].phantram;
                                thucte = thucte > 100 ? 100 : thucte;
                                let datchuan = thucte >= phantram ? "Đạt" : "Chưa đạt";
                                ketqua.push({machuan, phantram, nguongdiem: 'K', thucte, datchuan});
                            }
                        }

                        
                        const data = {
                            tongsodiem: diem.length,
                            tongsodiemdanhap: diemdanhap.length,
                            tongsochuan: chuandaura.rowCount,
                            phantramdiem,
                            ketqua
                        }

                        res.render('danhgiaview', {idlophocphan, magiangvien, hoten, admin, data});
                    }else{
                        res.render('danhgiaview', {idlophocphan, magiangvien, hoten, admin, data: null, error: 'Vui lòng nhập điểm để có thể thống kê'});
                    }
                }else{
                    res.render('danhgiaview', { idlophocphan, data: null, error: 'Học phần này chưa có chuẩn đầu ra', magiangvien, hoten, admin });
                }
            }catch(error){
                res.send("ERROR");
            }          
        }else{
            res.redirect('/login');
        }
    },
}