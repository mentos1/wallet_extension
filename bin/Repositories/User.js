const conn = require('../connect');
let connection;

async function create(body) {
    connection = await conn.getConn();

    const sql = 'INSERT INTO users (`access_token_twitter`, `access_token_secret_twitter`, `id_twitter`, `name`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?)';

    let array = Object.values(body);
    array.push(new Date());
    array.push(new Date());

    try {
        await connection.execute(
            sql,
            array
        );

        return true;
    } catch (e) {
        console.log('Error insert : ', e);
        return false;
    }

}

async function has(id) {
    connection = await conn.getConn();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users` where id=?', [id]);
    } catch (err) {
        console.error(err);
    }

    return !!([...rows].length);

}

async function getAll() {
    connection = await conn.connectionAsync();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users`');
    } catch (err) {
        console.error(err);
    }

    return [...rows];

}

async function findById(id) {
    connection = await conn.connectionAsync();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users` where id=?', [id]);
    } catch (err) {
        console.error(err);
    }

    return [...rows];
}

module.exports = {findById, getAll, create, has};
