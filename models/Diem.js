const db = require('../config/database');

const Diem = {};

Diem.getByLopHocPhan = (idlophocphan) => {
    const queryString = "SELECT * FROM Diem d INNER JOIN SinhVien s ON d.masinhvien = s.masinhvien WHERE idlophocphan = $1 ORDER BY d.masinhvien ASC";
    const params = [idlophocphan];
    return db.query(queryString, params);
}

Diem.update = (idlophocphan, masinhvien, diem) => {
    const queryString = "UPDATE Diem SET diem = $3 WHERE idlophocphan = $1 AND masinhvien = $2";
    const params = [idlophocphan, masinhvien, diem];
    return db.query(queryString, params);
}

module.exports = Diem;