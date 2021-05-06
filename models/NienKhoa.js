const db = require('../config/database');

const NienKhoa = {};

NienKhoa.getAll = () => {
    const queryString = "SELECT * FROM NienKhoa ORDER BY namhoc DESC";
    return db.query(queryString);
}

module.exports = NienKhoa;