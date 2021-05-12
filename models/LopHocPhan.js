const db = require('../config/database');

const LopHocPhan = {};

LopHocPhan.getLopHocPhanOf = (magiangvien) => {
    const queryString = "SELECT * FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan INNER JOIN NienKhoa n ON l.manienkhoa = n.manienkhoa WHERE l.magiangvien = $1 ORDER BY l.idlophocphan";
    const params = [magiangvien];   
    return db.query(queryString, params);
}

LopHocPhan.getLopHocPhanByNienKhoa = (magiangvien, nienkhoa) => {
    const queryString = "SELECT * FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan INNER JOIN NienKhoa n ON l.manienkhoa = n.manienkhoa WHERE l.magiangvien = $1 AND n.manienkhoa = $2";
    const params = [magiangvien, nienkhoa];   
    return db.query(queryString, params);
}

LopHocPhan.search = (magiangvien, nienkhoa, malophocphan) => {
    const queryString = `SELECT * FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan 
                        INNER JOIN NienKhoa n ON l.manienkhoa = n.manienkhoa 
                        WHERE l.magiangvien = '${magiangvien}' AND n.manienkhoa = '${nienkhoa}' 
                        AND (l.malophocphan LIKE '%${malophocphan.toUpperCase()}%' OR LOWER(h.tenhocphan) LIKE '%${malophocphan.toLowerCase()}%')`;
    // const queryString = "SELECT * FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan INNER JOIN NienKhoa n ON l.manienkhoa = n.manienkhoa WHERE l.magiangvien = '"+ magiangvien +"' AND n.manienkhoa = '"+ nienkhoa +"' AND l.malophocphan LIKE '%"+ malophocphan.toUpperCase() +"%' OR LOWER(h.tenhocphan) LIKE '%" + malophocphan.toLowerCase() +"%'";
    return db.query(queryString);
}

LopHocPhan.getAllLopHocPhanByNienKhoa = (magiangvien, nienkhoa) => {
    const queryString = "SELECT * FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan INNER JOIN NienKhoa n ON l.manienkhoa = n.manienkhoa WHERE l.magiangvien != $1 AND n.manienkhoa = $2";
    const params = [magiangvien, nienkhoa];   
    return db.query(queryString, params);
}

LopHocPhan.searchAll = (magiangvien, nienkhoa, malophocphan) => {
    const queryString = `SELECT * FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan 
                        INNER JOIN NienKhoa n ON l.manienkhoa = n.manienkhoa 
                        WHERE l.magiangvien != '${magiangvien}' AND n.manienkhoa = '${nienkhoa}' 
                        AND (l.malophocphan LIKE '%${malophocphan.toUpperCase()}%' OR LOWER(h.tenhocphan) LIKE '%${malophocphan.toLowerCase()}%')`;
    // const queryString = "SELECT * FROM LopHocPhan l INNER JOIN HocPhan h ON l.mahocphan = h.mahocphan INNER JOIN NienKhoa n ON l.manienkhoa = n.manienkhoa WHERE l.magiangvien = '"+ magiangvien +"' AND n.manienkhoa = '"+ nienkhoa +"' AND l.malophocphan LIKE '%"+ malophocphan.toUpperCase() +"%' OR LOWER(h.tenhocphan) LIKE '%" + malophocphan.toLowerCase() +"%'";
    return db.query(queryString);
}

module.exports = LopHocPhan;