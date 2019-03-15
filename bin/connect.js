const mysql = require('mysql2/promise');
let conn;

async function createConn() {
    conn = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
    return conn;
}

function getConn() {
    return conn;
}

module.exports.createConn = createConn;
module.exports.getConn = getConn;
