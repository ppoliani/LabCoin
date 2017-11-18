1) Start local ethereum network `testrpc`
2) Deploy contract `truffle migrate` in the smart contract folder
3) Find the contract address and paste it to `src/js/api/eth/contracts/LabCoinTokenContract.js`
  - `truffle console`
  - `LabCoinERC20.deployed().then(x => x.address)`

