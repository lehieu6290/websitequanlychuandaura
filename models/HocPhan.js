const db = require('../config/database');

const HocPhan = {};

HocPhan.getAll = () => {
    const queryString = "SELECT * FROM HocPhan";
    return db.query(queryString);
}

HocPhan.search = (mahocphan) => {
    const queryString = "SELECT * FROM HocPhan WHERE mahocphan LIKE '%"+ mahocphan.toUpperCase() +"%' OR LOWER(tenhocphan) LIKE '%"+ mahocphan.toLowerCase() +"%'";
    return db.query(queryString);
}

module.exports = HocPhan;