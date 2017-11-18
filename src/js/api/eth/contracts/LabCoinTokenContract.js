const getContract = require('../abi/labCoinAbi');
const listen = require('../events/labCoinEvents');
const contract = getContract().at('0x8726221f08e3f15e2cb85a440ca45d295ff13175');

listen(contract);

module.exports = () => contract

