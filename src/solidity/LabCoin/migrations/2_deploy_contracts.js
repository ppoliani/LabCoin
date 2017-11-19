const LabCoinERC20 = artifacts.require('./LabCoinERC20.sol');
module.exports = (deployer) => {
  deployer.deploy(LabCoinERC20, 1000000, 'LABCoin', 'LABCoin', 2); 
};
