const db = require('../config/database');

const Account = {};

Account.get = (username) => {
    let queryString = 'SELECT * FROM account WHERE username = $1';
    let params = [username];
    return db.query(queryString, params);
}

module.exports = Account;