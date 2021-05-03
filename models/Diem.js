const db = require('../config/database');

const Diem = {};

Diem.getByLopHocPhan = (idlophocphan) => {
    const queryString = "SELECT * FROM Diem d INNER JOIN SinhVien s ON d.masinhvien = s.masinhvien WHERE idlophocphan = $1";
    const params = [idlophocphan];
    return db.query(queryString, params);
}

module.exports = Diem;