const Maybe = require('folktale/maybe')
const getContract = require('../abi/labCoinAbi')
const {listenToEvents} = require('../events/labCoinEvents')
const getWeb3 = require('../index')

const CONTRACT_ADDR = '0xb39f9ef5ffde6782c8d7b1639cf15cade06bdd75';
const contract = getContract().at(CONTRACT_ADDR);

listenToEvents(contract);

const extendedContract = Object.assign({}, contract, {
  // Add a new function becuase currently the way to invkove the fallback function is 
  // by utilizing web3.eth.sendTransaction 
  sendTransaction: ({from, value}) => {
    const web3 = getWeb3();
    
    return new Promise((resolve, reject) => { 
      web3.eth.sendTransaction({from, to: CONTRACT_ADDR, value: web3.toWei(value, 'ether')}, (error, result) => {
        if(error) return reject(error);
        resolve(result);
      })
    });
  }
})

module.exports = extendedContract;
 

