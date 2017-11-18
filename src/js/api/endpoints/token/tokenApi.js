const {promisify} = require('util')
const {HttpError} = require('../../core/api')
const {getAccountAddress} = require('../../helpers/account')

const purchaseTokens = async (web3, labCoinContract, ctx) => {
  const {value=1} = ctx.request.body;
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
    ctx.body = HttpError(500, 'Error');
  }
}

const getTokenBalance = async (labCoinContract, ctx) => {
  const {address} = ctx.query;
  const getBalanceOf = promisify(labCoinContract.balanceOf);
  
  try {
    const balance = await getBalanceOf(address);
    ctx.body = {balance: balance.toString(10)};
  }
  catch(error) {
    ctx.body = HttpError(500, 'Error');
  }
}

module.exports = {purchaseTokens, getTokenBalance};
