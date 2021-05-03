const db = require('../config/database');

const HocPhan = {};

HocPhan.getAll = () => {
    const queryString = "SELECT * FROM HocPhan";
    return db.query(queryString);
}

module.exports = HocPhan;