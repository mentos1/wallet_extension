const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));
//const {UserRepositories} = require('../../bin/Repositories/index'); //TODO doesn't work

const create = async function (token) {
    const {UserRepositories} = require('../../bin/Repositories/index');

    try {
        const wallet = getRandomWallet();
        await UserRepositories.createAddress(token, wallet.address, wallet.privateKey);
        return wallet.address;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const createById = async function (id_twitter) {
    const {UserRepositories} = require('../../bin/Repositories/index');

    try {
        const wallet = getRandomWallet();
        await UserRepositories.createAddressById(id_twitter, wallet.address, wallet.privateKey);
        return wallet.address;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const getRandomWallet = function () {
    return web3.eth.accounts.create();
};


const parsePkToAddress = async function (pk) {
    return ((await web3.eth.accounts.privateKeyToAccount(pk)).address);
};


const setPk = async function (token, pk) {
    const {UserRepositories} = require('../../bin/Repositories/index');

    try {
        pk = (pk[0] + pk[1]) === '0x' ? pk : '0x' + pk;

        const address = await parsePkToAddress(pk);
        await UserRepositories.createAddress(token, address, pk);

        return address;
    } catch (e) {

        console.error(e);
        return false;
    }
};

const getBalance = async function (address) {
    try {

        let balance = await web3.eth.getBalance(address); //Will give value in.

        return web3.utils.fromWei(balance, 'ether');
    } catch (e) {

        console.error(e);
        return 0;
    }
};


module.exports = {create, setPk, getBalance, getRandomWallet, createById};
