const db = require('../config/database');

const LopHocPhan = {};

LopHocPhan.getLopHocPhanOf = (magiangvien) => {
    const queryString = "SELECT * FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan WHERE magiangvien = $1";
    const params = [magiangvien];   
    return db.query(queryString, params);
}

module.exports = LopHocPhan;