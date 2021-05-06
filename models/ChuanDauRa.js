const db = require('../config/database');

const ChuanDauRa = {};

ChuanDauRa.search = (machuan) => {
    const queryString = "SELECT * FROM ChuanDauRa WHERE machuan LIKE '%"+ machuan.toUpperCase() +"%' OR LOWER(noidung) LIKE '%"+ machuan.toLowerCase() +"%'";
    return db.query(queryString);
}

ChuanDauRa.getAll = () => {
    let queryString = "SELECT * FROM ChuanDauRa ORDER BY machuan";
    return db.query(queryString);
}

ChuanDauRa.get = (machuan) => {
    const queryString = "SELECT * FROM ChuanDauRa WHERE machuan = $1";
    const params = [machuan];
    return db.query(queryString, params);
}

ChuanDauRa.insert = (machuan, noidung) => {
    const queryString = "INSERT INTO ChuanDauRa VALUES ($1, $2)";
    const params = [machuan, noidung];
    return db.query(queryString, params);
}

ChuanDauRa.update = (machuan, noidung) => {
    const queryString = "UPDATE ChuanDauRa SET noidung = $2 WHERE machuan = $1";
    const params = [machuan, noidung];
    return db.query(queryString, params);
}

ChuanDauRa.delete = (machuan) => {
    const queryString = "DELETE FROM ChuanDauRa WHERE machuan = $1";
    const params = [machuan];
    return db.query(queryString, params);
}

module.exports = ChuanDauRa;