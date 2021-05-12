const db = require('../config/database');

const MucDiem = {};

MucDiem.getAll = () => {
    const queryString = "SELECT * FROM MucDiem";
    return db.query(queryString);
}

MucDiem.get = (mamucdiem) => {
    const queryString = "SELECT * FROM MucDiem WHERE mamucdiem=$1";
    const params = [mamucdiem]
    return db.query(queryString, params);
}

module.exports = MucDiem;