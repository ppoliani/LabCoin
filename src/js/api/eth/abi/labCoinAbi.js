const getWeb3 = require('../index')
const labCoinContractDefinition = require('../../../../solidity/LabCoin/build/contracts/LabCoinERC20.json')

module.exports = () => {
  const web3 = getWeb3();
  return web3.eth.contract(labCoinContractDefinition.abi);
}
