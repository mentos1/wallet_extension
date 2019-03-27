const conn = require('../connect');
const {getBalance} = require('../Services/wallet');
let connection;

async function create(profile, token, tokenSecret) {
    connection = await conn.getConn();
    const sql = 'INSERT INTO users (`access_token_twitter`, `access_token_secret_twitter`, `id_twitter`, `name`, `created_at`, `updated_at`, `photo`, `email`, `screen_name`, `id_twitter_str`) VALUES (?,?,?,?,?,?,?,?,?,?)';

    let array = [
        token,
        tokenSecret,
        profile._json.id,
        profile.displayName,
        new Date(),
        new Date(),
        profile.photos && profile.photos .length ? profile.photos[0].value.replace(/_normal/, '') : '',
        profile.emails && profile.emails.length  ? profile.emails[0].value : '',
        profile.username,
        profile._json.id_str,
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

async function update(profile, token, tokenSecret) {
    connection = await conn.getConn();
    let sql = 'UPDATE users SET  `access_token_twitter` = ?, `access_token_secret_twitter` = ?, `name` = ?,`updated_at` = ?, `photo` = ?, `email` = ?, `screen_name` = ? `id_twitter_str` = ?  WHERE `id_twitter` = ?';

    let array = [
        token,
        tokenSecret,
        profile.displayName,
        new Date(),
        profile.photos && profile.photos .length ? profile.photos[0].value.replace(/_normal/, '') : '',
        profile.emails && profile.emails.length  ? profile.emails[0].value : '',
        profile.username,
        profile._json.id_str,
        profile._json.id
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

async function createUser(id_twitter) {
    connection = await conn.getConn();
    const sql = 'INSERT INTO users (`id_twitter`, `created_at`, `updated_at`) VALUES (?,?,?)';

    let array = [
        id_twitter,
        new Date(),
        new Date(),
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

async function has(id_twitter) {
    connection = await conn.getConn();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users` where id_twitter=?' , [id_twitter]); // and screen_name IS NOT NULL

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

    let users = [...rows]

    if (users.length) {
        return users[0];
    } else {
        return null;
    }
}

async function findByTwitterId(id) {
    connection = await conn.getConn();

    let rows;
    try {
        [rows] = await connection.execute('SELECT * FROM `users` where `id_twitter` = ?', [id]);
    } catch (err) {
        console.error(err);
    }

    console.log('_____row________---');
    console.log(rows);
    console.log('_____row________---');
    let users = [...rows];

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

async function updateStatusInvite(id, status) {
    connection = await conn.getConn();

    try {
        let sql = 'UPDATE users SET  `invite_status` = ? WHERE `id_twitter` = ?';
        await connection.execute(
            sql,
            [status, id]
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

async function createAddressById(twitter_id, address, pk) {
    connection = await conn.getConn();

    let user = await findByTwitterId(twitter_id);

    if (!user) {
        return false;
    }

    let wallet = {};
    wallet[address] = pk;
    console.log('_______params______________');
    console.log([wallet, user, user.id]);
    console.log('_______params______________');

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

    let users = [...rows];

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

async function removeSecretFields(user) {
    delete user['id_twitter'];
    delete user['id_vk'];
    delete user['friends_vk'];
    delete user['friends_twitter'];
    delete user['access_token_vk'];
    delete user['access_token_twitter'];
    delete user['access_token_secret_twitter'];
    user.address = user.wallets && Object.keys(user.wallets).length ? Object.keys(user.wallets)[0] : null;
    user.balance = user.address ? await getBalance(user.address) : 'Address empty';
    delete user['wallets'];
    delete user['token_access'];

    return user;
}

module.exports = {
    findById,
    getAll,
    create,
    createUser,
    has,
    findByTwitterId,
    updateToken,
    createAddress,
    isToken,
    getUserByToken,
    removeSecretFields,
    createAddressById,
    update,
    updateStatusInvite
};
