const db = require('../config/database');

const GiangVien = {};

GiangVien.get = (username) => {
    let queryString = 'SELECT * FROM giangvien WHERE magiangvien = $1';
    let params = [username];
    return db.query(queryString, params);
}

module.exports = GiangVien;