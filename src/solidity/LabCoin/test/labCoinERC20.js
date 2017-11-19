const LabCoin = artifacts.require('./LabCoinERC20.sol');
const {ethertoWei, gweiToWei, toEther} = require('./utils');

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

  it('should have the correct owner of the contract', async () => {
    const contractInst = await LabCoin.deployed();
    // By default it's the first account; the one that deployed the contract
    const owner = await contractInst.owner();
    
    assert.equal(owner, accounts[0], 'Wrong owner')
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

  it('should increase the supply of tokens when someone is participating in the ICO', async () => {
    const contractInst = await LabCoin.deployed();
    const initialSupply = await contractInst.totalSupply();
    const recipientStartingBalance = await contractInst.balanceOf(accounts[1]);
    const txnResult = await contractInst.sendTransaction({from: accounts[1], value: web3.toWei(2, 'ether')});
    const balance = await contractInst.balanceOf(accounts[1]);
    const supply = await contractInst.totalSupply();
    assert.ok(txnResult);
    assert.equal(Number(balance), Number(recipientStartingBalance) + 1000, 'wrong balance for ICO participant');
    assert.equal(Number(supply), Number(initialSupply) + 1000, 'supply is not correct after the transaction')
  });

  it('should tranfer the ico participation eth amount to the owner of the contract', async () => {
    const contractInst = await LabCoin.deployed();
    const owner = accounts[0];
    const value = web3.toWei(2, 'ether');
    const icoParticipant = accounts[1];
    const ownerStartingEthBalance = await web3.eth.getBalance(owner);
    const icoParticipantcStartingEthBalance = await web3.eth.getBalance(icoParticipant);
    const txnResult = await contractInst.sendTransaction({from: icoParticipant, value});
    const gasUsed = Number(txnResult.receipt.cumulativeGasUsed) / 10000000;
    const expenses = 2 + gasUsed;
    const ownerCurrentEthBalance = await web3.eth.getBalance(owner);
    const icoParticipantcCurrentEthBalance = await web3.eth.getBalance(icoParticipant);
    const expectedOwnerBalance = toEther(ownerCurrentEthBalance);
    const actualOwnerBalance = toEther(ownerStartingEthBalance) + 2;
    const expectedIcoParticipantBalance = toEther(icoParticipantcCurrentEthBalance)
    const actualIcoParticipantBalance = toEther(icoParticipantcStartingEthBalance) - expenses;

    assert.equal(expectedOwnerBalance,  actualOwnerBalance, 'wrong owner eth balance after txn');
    assert.equal(expectedIcoParticipantBalance, actualIcoParticipantBalance, 'wrong ico participant eth balance after txn');
  });

  it.only('should fail if ico period is over and someone wants to buy some tokens', async () => {
    const now = Number(new Date());
    let nextSecond = new Date();
    nextSecond.setSeconds(nextSecond.getSeconds() + 1);
    nextSecond = Number(nextSecond);

    const icoParticipant = accounts[1];
    const contractInst = await LabCoin.deployed();
    const result = await contractInst.setEndtime(nextSecond);

    // send the request after the ico ends
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await contractInst.sendTransaction({from: icoParticipant, value: web3.toWei(2, 'ether')}); 
          // it shouldn't reach this point;   
          assert.fail('Expected to reject the transaction');
        }
        catch(error) {
          assert.ok(true);
        }
        resolve();
      }, 2000);
    });
  });
});
