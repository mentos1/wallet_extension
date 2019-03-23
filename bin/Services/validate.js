function checkGas(val1, val2) {
    return (parseInt(val1.minus(val2)) < 0);
}

function isValidPk(pk) {
    return pk !== '' && (pk.length <= 66 && pk.length >= 64);
}

function isValidTo(to) {
    return to !== '' && (to.length <= 44 && to.length >= 40);
}

function catOxPk(pk) {
    return (pk[0] + pk[1]) === '0x' ? pk.slice(2) : pk;
}

function addOxTo(to) {
    return (to[0] + to[1]) !== '0x' ? '0x' + to : to;
}

module.exports.checkGas = checkGas;
module.exports.isValidPk = isValidPk;
module.exports.isValidTo = isValidTo;
module.exports.catOxPk = catOxPk;
module.exports.addOxTo = addOxTo;