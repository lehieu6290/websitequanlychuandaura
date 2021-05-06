const db = require('../config/database');

const ChiTietChuan = {};

ChiTietChuan.getAll = (mahocphan) => {
    const queryString = `SELECT * FROM ChiTietChuan ct INNER JOIN MucDiem m ON ct.mamucdiem = m.mamucdiem 
    INNER JOIN ChuanDauRa c ON ct.machuan = c.machuan WHERE ct.mahocphan = $1`;
    const params = [mahocphan];
    return db.query(queryString, params);
}

ChiTietChuan.delete = (mahocphan, machuan) => {
    const queryString = "DELETE FROM ChiTietChuan WHERE mahocphan = $1 AND machuan = $2";
    const params = [mahocphan, machuan];
    return db.query(queryString, params);
}

ChiTietChuan.update = (mahocphan, machuan, mamucdiem, phantram) => {
    const queryString = "UPDATE ChiTietChuan SET mamucdiem = $3, phantram = $4 WHERE mahocphan=$1 AND machuan=$2";
    const params = [mahocphan, machuan, mamucdiem, phantram];
    return db.query(queryString, params);
}

module.exports = ChiTietChuan;