const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));
const {UserRepositories} = require('../Repositories/index');

const create = async function (token) {
    const wallet = web3.eth.accounts.create();
    await UserRepositories.createAddress(token, wallet.address, wallet.privateKey);
};


const parsePkToAddress = async function (pk) {
    pk = (pk[0] + pk[1]) === '0x' ? pk.slice(2) : pk;

    return ((await web3.eth.accounts.privateKeyToAccount('0x' + pk)).address);
};


const setPk = async function (token, pk) {
    const address = parsePkToAddress(pk);
    await UserRepositories.createAddress(token, address, pk)
};


module.exports = {create, setPk}
