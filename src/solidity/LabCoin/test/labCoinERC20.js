const LabCoin = artifacts.require('./LabCoinERC20.sol');

contract('LabCoinERC20', accounts => {
  it('should put 1000000 labcoins to the first account', async () => {
    const contractInst = await LabCoin.deployed();
    const balance = await contractInst.balanceOf(accounts[0]);

    assert.equal(balance.valueOf(), 100000000, 'Wrong initial supply')
  });

  it('should make the totalSupply available', async () => {
    const contractInst = await LabCoin.deployed();
    const supply = await contractInst.totalSupply();
    
    assert.equal(supply.valueOf(), 100000000, 'Wrong initial supply')
  });

  it('should transfer an amount of token from the sender to the recipient of a transaction', async () => {
    const amount = 1000;
    const sender = accounts[0];
    const recipient = accounts[1];
    const contractInst = await LabCoin.deployed();
    const senderStartingBalance = await contractInst.balanceOf(sender);
    const recipientStartingBalance = await contractInst.balanceOf(recipient);
    const transferTxnResult = await contractInst.transfer(recipient, amount, {from: sender});
    const senderCurrentBalance = await contractInst.balanceOf(sender);
    const recipientCurrentBalance = await contractInst.balanceOf(recipient);

    assert.equal(senderStartingBalance.valueOf() - amount, senderCurrentBalance.valueOf(), 'sender has worng balance after the transfer');
    assert.equal(Number(recipientStartingBalance.valueOf()) + amount, recipientCurrentBalance.valueOf(), 'recipient has worng balance after the transfer');
  }); 

  it('should set the ending time of the ICO', async () => {
    const now = Number(new Date());
    let nextSecond = new Date();
    nextSecond.setSeconds(nextSecond.getSeconds() + 2);
    nextSecond = Number(nextSecond);

    const contractInst = await LabCoin.deployed();
    const result = await contractInst.setEndtime(nextSecond);
    const endtime = await contractInst.endTime();

    assert.ok(result);
    assert.equal(nextSecond, endtime.valueOf(), 'Failed to update the endtime')
  });

  // it('should increase the supply of tokens when someone is participating in the ICO', async () => {
  //   const constractInst = LabCoin.deployed();

  // });
});
