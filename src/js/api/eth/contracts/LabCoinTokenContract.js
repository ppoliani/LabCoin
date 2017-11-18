const getContract = require('../abi/labCoinAbi')
const listen = require('../events/labCoinEvents')
const getWeb3 = require('../index')

const CONTRACT_ADDR = '0x8726221f08e3f15e2cb85a440ca45d295ff13175';
const contract = getContract().at(CONTRACT_ADDR);

listen(contract);

module.exports = () => 
  Object.assign({}, contract, {
    sendTransaction: ({from, value}) => {
      const web3 = getWeb3();

      web3.eth.sendTransaction({from, to: CONTRACT_ADDR, value: web3.toWei(value, 'ether')})
    }
  })

