const db = require('../config/database');

const GiangVien = {};

GiangVien.getAll = () => {
    const queryString = "SELECT * FROM GiangVien ORDER BY magiangvien ASC";
    return db.query(queryString);
}

GiangVien.get = (username) => {
    let queryString = 'SELECT * FROM giangvien WHERE magiangvien = $1';
    let params = [username];
    return db.query(queryString, params);
}

GiangVien.search = (name) => {
    let queryString = "SELECT * FROM GiangVien WHERE LOWER(magiangvien) LIKE '%" + name.toLowerCase() +"%' OR LOWER(hoten) LIKE '%"+ name.toLowerCase() +"%'";
    return db.query(queryString);
}

GiangVien.insert = (magiangvien, hoten, email, admin, matkhau) => {
    let queryString = 'INSERT INTO GiangVien VALUES ($1, $2, $3, $4, $5)';
    let params = [magiangvien, hoten, email, admin, matkhau];
    return db.query(queryString, params);
}

GiangVien.updateWithoutPassword = (magiangvien, hoten, email, admin) => {
    let queryString = 'UPDATE GiangVien SET hoten = $2, email = $3, admin = $4 WHERE magiangvien = $1';
    let params = [magiangvien, hoten, email, admin];
    return db.query(queryString, params);
}

GiangVien.updateWithPassword = (magiangvien, hoten, email, admin, matkhau) => {
    let queryString = 'UPDATE GiangVien SET hoten = $2, email = $3, admin = $4, matkhau = $5 WHERE magiangvien = $1';
    let params = [magiangvien, hoten, email, admin, matkhau];
    return db.query(queryString, params);
}

GiangVien.delete = (magiangvien) => {
    let queryString = "DELETE FROM GiangVien WHERE magiangvien = $1";
    let params = [magiangvien];
    return db.query(queryString, params);
}

module.exports = GiangVien;