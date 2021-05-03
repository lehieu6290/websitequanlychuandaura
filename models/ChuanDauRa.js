const db = require('../config/database');

const ChuanDauRa = {};

ChuanDauRa.search = (machuan) => {
    const queryString = "";
    const params = [machuan];
    return db.query(queryString, params);
}

module.exports = ChuanDauRa;