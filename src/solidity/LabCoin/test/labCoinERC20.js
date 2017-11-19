const LabCoin = artifacts.require('./LabCoinERC20.sol');

contract('LabCoinERC20', accounts => {
  it('should put 1000000 labcoins to the first account', () => {
    return LabCoin.deployed()
    .then(contractInst => contractInst.balanceOf(accounts[0]))
    .then(balance => {
      assert.equal(balance.valueOf(), 100000000, 'Wrong initial supply')
    })
  });

  it('should make the totalSupply available', () => {
    return LabCoin.deployed()
      .then(contractInst => contractInst.totalSupply())
      .then(supply => {
        assert.equal(supply.valueOf(), 100000000, 'Wrong initial supply')
      })
  });

  it('should transfer an amount of token from the sender to the recipient of a transaction', () => {
    const sender = accounts[0];
    const recipient = accounts[1];
    const amount = 1000;
    let senderStartingBalance;
    let recipientStartingBalance;
    let contractInst;

    return LabCoin.deployed()
      .then(inst => {
        contractInst = inst;

        return Promise.all([
          contractInst.balanceOf(sender),
          contractInst.balanceOf(recipient),
          contractInst.transfer(recipient, amount, {from: sender}),
        ]);
      })
      .then(([_senderStartingBalance, _recipientStartingBalance]) => {
        senderStartingBalance = _senderStartingBalance;
        recipientStartingBalance = _recipientStartingBalance;

        return Promise.all([
          contractInst.balanceOf(sender),
          contractInst.balanceOf(recipient)
        ]);
      })
      .then(([senderCurrentBalance, recipientCurrentBalance]) => {
        assert.equal(senderStartingBalance.valueOf() - amount, senderCurrentBalance.valueOf(), 'sender has worng balance after the transfer');
        assert.equal(Number(recipientStartingBalance.valueOf()) + amount, recipientCurrentBalance.valueOf(), 'recipient has worng balance after the transfer');
      });
  }); 

  it('should set the ending time of the ICO', () => {
    const now = Number(new Date());
    let nextSecond = new Date();
    nextSecond.setSeconds(nextSecond.getSeconds() + 2);
    nextSecond = Number(nextSecond);

    return LabCoin.deployed()
      .then(contractInst => {
        return Promise.all([
          contractInst.setEndtime(nextSecond),
          contractInst.endTime()
        ]);
      })
      .then(([result, endtime]) => {
        assert.ok(result);
        assert.equal(nextSecond, endtime.valueOf(), 'Failed to update the endtime')
      })
  });
});
