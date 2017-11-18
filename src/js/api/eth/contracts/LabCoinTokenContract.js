const getContract = require('../abi/labCoinAbi')
const listen = require('../events/labCoinEvents')
const getWeb3 = require('../index')

const CONTRACT_ADDR = '0xaa31641ffb5298d0e18b385c566ec3c2a934b58b';
const contract = getContract().at(CONTRACT_ADDR);

listen(contract);

module.exports = () => 
  Object.assign({}, contract, {
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

