const { Pool } = require('pg');
const config = require('./database-config.json');

const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
});

module.exports = {
    query: (queryString, params) => {
        return pool.query(queryString, params);
    }
}
