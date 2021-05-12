const db = require('../config/database');

const TyLeChuan = {};

TyLeChuan.getByLopHocPhan = (idlophocphan) => {
    const queryString = "SELECT * FROM TyLeChuan t INNER JOIN ChuanDauRa c ON t.machuan = c.machuan INNER JOIN LopHocPhan l ON l.idlophocphan = t.idlophocphan WHERE t.idlophocphan = $1";
    const params = [idlophocphan];
    return db.query(queryString, params);
}

// TyLeChuan.getByLopHocPhanToInsert = (idlophocphan) => {
//     const queryString = "SELECT * FROM getTyLeChuanOf($1)";
//     const params = [idlophocphan];
//     return db.query(queryString, params);
// }

TyLeChuan.getByLopHocPhanToInsert = (idlophocphan) => {
    const queryString = `SELECT l.malophocphan, c.machuan, c.noidung
                        FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan
                        INNER JOIN ChiTietChuan ct ON ct.mahocphan = l.mahocphan
                        INNER JOIN ChuanDauRa c ON c.machuan = ct.machuan
                        WHERE l.idlophocphan = $1`;
    const params = [idlophocphan];
    return db.query(queryString, params);
}

TyLeChuan.getChuanDauRa = (idlophocphan) => {
    const queryString = `SELECT l.malophocphan, c.machuan, c.noidung, ct.phantram, ct.mamucdiem
                        FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan
                        INNER JOIN ChiTietChuan ct ON ct.mahocphan = l.mahocphan
                        INNER JOIN ChuanDauRa c ON c.machuan = ct.machuan
                        WHERE l.idlophocphan = $1`;
    const params = [idlophocphan];
    return db.query(queryString, params);
}

TyLeChuan.getTyLeChuan = (idlophocphan, machuan) => {
    const queryString = "SELECT * FROM TyLeChuan WHERE idlophocphan = $1 AND machuan = $2";
    const params = [idlophocphan, machuan];
    return db.query(queryString, params);
}

TyLeChuan.insert = (idlophocphan, machuan, tyle) => {
    const queryString = "INSERT INTO TyLeChuan VALUES ($1, $2, $3)";
    const params = [machuan, idlophocphan, tyle];
    return db.query(queryString, params);
}

TyLeChuan.update = (idlophocphan, machuan, tyle) => {
    const queryString = "UPDATE TyLeChuan SET tyle = $1 WHERE idlophocphan = $2 AND machuan = $3";
    const params = [tyle, idlophocphan, machuan];
    return db.query(queryString, params);
}

TyLeChuan.delete = (machuan) => {
    const queryString = "DELETE FROM TyLeChuan WHERE machuan = $1";
    const params = [machuan];
    return db.query(queryString, params);
}

module.exports = TyLeChuan;