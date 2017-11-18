const Web3 = require('web3');
const Maybe = require('folktale/data/maybe');

let web3 = Maybe.Nothing();

const get = () => web3.matchWith({
  Just: prop('value'),
  Nothing: () => {
    web3 = Maybe.fromNullable(new Web3(new Web3.providers.HttpProvider("http://localhost:8545")))
    return web3;
  }
});

module.exports = get;
