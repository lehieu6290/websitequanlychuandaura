const db = require('../config/database');

const MucDiem = {};

MucDiem.getAll = () => {
    const queryString = "SELECT * FROM MucDiem";
    return db.query(queryString);
}

module.exports = MucDiem;