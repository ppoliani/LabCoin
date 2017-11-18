const tokenAbi = require('../abi/labCoinAbi');
const listen = require('../events/labCoinEvents');
const contract = tokenAbi().at('0xb5b66f236320efaf7efd53bf81c1ea626f98958c');

listen(contract);

module.exports = () => contract

