const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));
const Tx = require('ethereumjs-tx');
//const {UserRepositories} = require('../../bin/Repositories/index'); //TODO doesn't work
const validate = require('./validate');
const BigNumber = require('bignumber.js');


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


const sendTransaction = async function (pk, to, amount) {

    pk = validate.catOxPk(pk);
    to = validate.addOxTo(to);


    const from = await web3.eth.accounts.privateKeyToAccount('0x' + pk).address;
    const nonce = await web3.eth.getTransactionCount(from);
    console.log('pk, to, amount', pk, to, amount);

    let gasPrice = (((await web3.eth.getGasPrice()) * parseFloat(process.env.GAS_COEFFICIENT)).toFixed());

    const gasLimit = 21000;
    const balAmount = await web3.eth.getBalance(from);
    let valAmount = web3.utils.toWei(amount, 'ether');

    let balance = BigNumber(balAmount);
    let amount_BN = BigNumber(valAmount);
    let gas = BigNumber(gasLimit).times(gasPrice);
    let sub_bal = balance.minus(amount_BN);

    console.log('------------ETH gas, balance-----------------');
    console.log("| gas: ", gas);
    console.log("| balance: ", balance);
    console.log("| sub_bal ", sub_bal);
    console.log("| from ", from);
    console.log("| to ", to);
    console.log('---------------------------------------------');

    if (validate.checkGas(sub_bal, gas)) {
        console.error('gas > bal - amount' );
        return {status : 0, msg : "gas > bal - amount"};
    }

    let params = {
        //nonce: web3.utils.toHex(nonce),
        nonce: nonce,
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasLimit),
        to: to,
        value: web3.utils.toHex(amount_BN),
    };

    const privateKey = Buffer.from(pk, 'hex');
    const tx = new Tx(params);
    tx.sign(privateKey);

    const serializedTx = '0x' + tx.serialize().toString('hex');

    let tx_transaction = web3.utils.sha3(serializedTx, {encoding: 'hex'});

    return {status : 1, data : obj.tx_transaction};

    try {
        let result = await web3.eth.sendSignedTransaction(serializedTx);
        if (result.status) {
            return {status : 1, msg : "Success", data : tx_transaction};
        } else {
            return {status : 0, msg : "Send status fail."};
        }
    } catch (err) {

        let reg_error = /Transaction has been reverted by the EVM/gms,
            reg_obj = /{.*}/gms;

        if (reg_error.test(err)) {
            let obj = JSON.parse(reg_obj.exec(err));

            if (obj && obj.status) {
                return {status : 1, msg : "Success", data : obj.transactionHash};
            }
        }

        return {status : 0, msg : err};
    }
}

module.exports = {create, setPk, getBalance, getRandomWallet, createById, sendTransaction};

