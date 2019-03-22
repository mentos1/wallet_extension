const conn = require('../connect');
let connection;

async function create(profile, token, tokenSecret) {
    connection = await conn.getConn();
    const sql = 'INSERT INTO users (`access_token_twitter`, `access_token_secret_twitter`, `id_twitter`, `name`, `created_at`, `updated_at`, `photo`, `email`) VALUES (?,?,?,?,?,?,?,?)';

    let array = [
        token,
        tokenSecret,
        profile.id,
        profile.displayName,
        new Date(),
        new Date(),
        profile.photos && profile.photos .length ? profile.photos[0].value.replace(/_normal/, '') : '',
        profile.emails && profile.emails.length  ? profile.emails[0].value : ''
    ];

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

        return !!([...rows].length);
    } catch (err) {

        console.error(err);
        return null;
    }
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
            [token_access, id]
        );
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }

}

async function createAddress(token, address, pk) {
    let user = await getUserByToken(token);
    let wallet = {};
    wallet[address] = pk;
    console.log('_______params______________');
    console.log([wallet, user.id]);
    console.log('_______params______________');
    connection = await conn.getConn();

    try {
        let sql = 'UPDATE users SET  `wallets` = ? WHERE `id` = ?';
        await connection.execute(
            sql,
            [wallet, user.id]
        );
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }

}

async function getUserByToken(token) {
    connection = await conn.getConn();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users` where `token_access`=?', [token]);
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

async function isToken(token) {
    connection = await conn.getConn();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users` where `token_access`=?', [token]);
    } catch (err) {
        console.error(err);
    }

    let users = [...rows]

    if (users.length) {
        return true
    } else {
        return false;
    }

}

function removeSecretFields(user) {
    delete user['id_twitter'];
    delete user['id_vk'];
    delete user['friends_vk'];
    delete user['friends_twitter'];
    delete user['access_token_vk'];
    delete user['access_token_twitter'];
    delete user['access_token_secret_twitter'];
    user.address = user.wallets && user.wallets.length ? user.wallets.address : null;
    delete user['token_access'];

    return user;
}

module.exports = {
    findById,
    getAll,
    create,
    has,
    findByTwitterId,
    updateToken,
    createAddress,
    isToken,
    getUserByToken,
    removeSecretFields
};
