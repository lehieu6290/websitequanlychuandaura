const db = require('../config/database');

const TyLeChuan = {};

TyLeChuan.getByLopHocPhan = (idlophocphan) => {
    const queryString = "SELECT * FROM TyLeChuan t INNER JOIN ChuanDauRa c ON t.machuan = c.machuan WHERE idlophocphan = $1";
    const params = [idlophocphan];
    return db.query(queryString, params);
}

TyLeChuan.getByLopHocPhanToInsert = (idlophocphan) => {
    const queryString = "SELECT * FROM getTyLeChuanOf($1)";
    const params = [idlophocphan];
    return db.query(queryString, params);
}

TyLeChuan.insert = (idlophocphan, machuan, tyle) => {
    const queryString = "INSERT INTO TyLeChuan VALUES ($1, $2, $3)";
    const params = [machuan, idlophocphan, tyle];
    return db.query(queryString, params);
}

TyLeChuan.update = (idlophocphan, machuan, tyle) => {
    const queryString = "UPDATE TyLeChuan SET tyle = $1 WHERE idlophocphan = $2 AND machuan = $3";
    const params = [tyle, idlophocphan,machuan];
    return db.query(queryString, params);
}

module.exports = TyLeChuan;