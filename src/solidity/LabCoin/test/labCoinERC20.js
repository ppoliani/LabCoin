const LabCoin = artifacts.require('./LabCoinERC20.sol');

contract('LabCoinERC20', accounts => {
  it('Should put 1000000 labcoins to the first account', () => {
    return LabCoin.deployed()
    .then(contractInst => contractInst.balanceOf(accounts[0]))
    .then(balance => {
      assert.equal(balance.valueOf(), 100000000, 'Wrong initial supply')
    })
  });
});
