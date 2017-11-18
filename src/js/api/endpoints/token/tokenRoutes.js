const {purchaseTokens, getTokenBalance} = require('./tokenApi');
const {partial} = require('../helpers/fn');
const labCoinContract = require('../eth/contracts/LabCoinTokenContract');
const web3 = require('../eth');

const routes = {
  '/tokens/purchase': {
    method: 'post',
    fn: partial(purchaseTokens, web3(), tokenContract())
  },

  '/tokens/balance': {
    method: 'get',
    fn: partial(getTokenBalance, tokenContract())
  }
};

module.exports = routes;
