const Web3 = require('web3')
const Maybe = require('folktale/maybe')
const {prop} = require('../helpers/fn')

let web3 = Maybe.Nothing();

const get = () => web3.matchWith({
  Just: prop('value'),
  Nothing: () => {
    const _web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    web3 = Maybe.fromNullable(_web3);
    return _web3;
  }
});

module.exports = get;
