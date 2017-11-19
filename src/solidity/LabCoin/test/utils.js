const toMicroEther = value => Number(web3.fromWei(value, 'microether'));
const toEther = value => Number(web3.fromWei(value, 'ether'));
const ethertoWei = value => Number(web3.toWei(value, 'ether'));
const gweiToWei = value => Number(web3.toWei(value, 'gwei'));

module.exports = {toMicroEther, toEther, ethertoWei, gweiToWei}
