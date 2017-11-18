const tokenAbi = require('../abi/tokenAbis');
const listen = require('../events/proofEvents');
const contract = tokenAbi().at('0xb5b66f236320efaf7efd53bf81c1ea626f98958c');

listen(contract);

module.exports = () => contract

