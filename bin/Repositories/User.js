const conn = require('../connect');
let connection;

async function create(body) {
    connection = await conn.getConn();

    const sql = 'INSERT INTO users (`access_token_twitter`, `access_token_secret_twitter`, `id_twitter`, `name`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?)';

    let array = Object.values(body);
    array.push(new Date());
    array.push(new Date());

    try {
        let response = await connection.execute(
            sql,
            array
        );

        console.error('___________-response_________________')
        console.log(response)
        console.error('___________-response_________________')
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
    connection = await conn.getConn();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users`');
    } catch (err) {
        console.error(err);
    }

    return [...rows];

}

async function findById(id) {
    connection = await conn.getConn();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users` where id=?', [id]);
    } catch (err) {
        console.error(err);
    }

    return [...rows];
}

async function findByTwitterId(id) {
    connection = await conn.getConn();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users` where id_twitter=?', [id]);
    } catch (err) {
        console.error(err);
    }

    let users = [...rows]

    if (users.length) {
        return users[0];
    } else {
        return null;
    }

}

async function updateToken(id, token_access) {
    connection = await conn.getConn();

    try {
        let sql = 'UPDATE users SET  `token_access` = ? WHERE `id` = ?';
        await connection.execute(
            sql,
            [token_access]
        );
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }

}

module.exports = {findById, getAll, create, has, findByTwitterId, updateToken};
