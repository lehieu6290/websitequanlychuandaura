const db = require('../config/database');

const ChiTietChuan = {};

ChiTietChuan.getAll = (mahocphan) => {
    const queryString = `SELECT * FROM ChiTietChuan ct INNER JOIN MucDiem m ON ct.mamucdiem = m.mamucdiem 
    INNER JOIN ChuanDauRa c ON ct.machuan = c.machuan WHERE ct.mahocphan = $1`;
    const params = [mahocphan];
    return db.query(queryString, params);
}

module.exports = ChiTietChuan;