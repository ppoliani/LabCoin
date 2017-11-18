const getWeb3 = require('../eth');

const getAccountAddress = (pubKey) => {
  const web3 = getWeb3();

  // TODO: dummy implementation.
  return web3.eth.accounts[1];
}

module.exports = {getAccountAddress}
