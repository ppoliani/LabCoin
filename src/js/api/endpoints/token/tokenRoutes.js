const {purchaseTokens, getTokenBalance} = require('./tokenApi')
const {partial} = require('../../helpers/fn')
const labCoinContract = require('../../eth/contracts/LabCoinTokenContract')
const {getLogs} = require('../../eth/events/labCoinEvents')
const getWeb3 = require('../../eth')

const routes = {
  '/tokens/purchase': {
    method: 'post',
    fn: partial(purchaseTokens, getWeb3(), labCoinContract)
  },

  '/tokens/balance': {
    method: 'get',
    fn: partial(getTokenBalance, labCoinContract, getLogs)
  }
};

module.exports = routes;
