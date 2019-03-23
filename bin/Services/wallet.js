const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));
const UserRepositories = require('../Repositories/User');

const create = async function (token) {

    console.log('_________UserRepositories___________');
    console.log(UserRepositories);
    console.log('_________UserRepositories___________');

    try {
        const wallet = web3.eth.accounts.create();
        await UserRepositories.createAddress(token, wallet.address, wallet.privateKey);
        return wallet.address;
    } catch (e) {
        console.error(e);
        return false;
    }
};


const parsePkToAddress = async function (pk) {
    return ((await web3.eth.accounts.privateKeyToAccount(pk)).address);
};


const setPk = async function (token, pk) {
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


module.exports = {create, setPk, getBalance};
