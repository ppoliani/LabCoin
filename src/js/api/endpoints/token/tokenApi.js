const {promisify} = require('util')
const {HttpError} = require('../../core/api')
const {getAccountAddress} = require('../../helpers/account')

const purchaseTokens = async (web3, labCoinContract, ctx) => {
  const {value} = ctx.request.body;
  const address = getAccountAddress();
  const options = {
    from: address,
    value
  }

  try {
    const txnHash = await labCoinContract.sendTransaction(options);
    ctx.body = {txnHash, address};
  }
  catch(error) {
    ctx.body = ctx.throw(500, 'error')
  }
}

const getTokenBalance = async (labCoinContract, getLogs, ctx) => {
  const {address} = ctx.query;
  const getBalanceOf = promisify(labCoinContract.balanceOf);
  
  try {
    const balance = await getBalanceOf(address);
    const logs = await getLogs(labCoinContract, address);
    ctx.body = {logs, balance: balance.toString(10)};
  }
  catch(error) {
    ctx.body = HttpError(500, 'Error');
  }
}

module.exports = {purchaseTokens, getTokenBalance};
