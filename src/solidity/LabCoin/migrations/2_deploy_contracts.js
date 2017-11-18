const LabCoinERC20 = artifacts.require('./LabCoinERC20.sol');
module.exports = (deployer) => {
  deployer.deploy(LabCoinERC20, 100000, 'LABCoin', 'LABCoin', 2, 500); 
};
