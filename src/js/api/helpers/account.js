const getWeb3 = require('../eth');

const getAccountPubKey = (pubKey) => {
  const web3 = getWeb3();

  // TODO: dummy implementation.
  return web3.eth.accounts[1];
}

module.exports = {getAccountPubKey}
