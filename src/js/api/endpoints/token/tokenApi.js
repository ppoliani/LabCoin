const {promisify} = require('util')
const {HttpError} = require('../../core/api')
const {getAccountPubKey} = require('../../helpers/account')

const purchaseTokens = async (web3, labCoinContract, ctx) => {
  const {value=1} = ctx.request.body;
  const publicKey = getAccountPubKey();
  const options = {
    from: publicKey,
    value 
  }

  try {
    const txnHash = await labCoinContract.sendTransaction(options);
    ctx.body = {txnHash, publicKey};
  }
  catch(error) {
    ctx.body = HttpError(500, 'Error');
  }
}

const getTokenBalance = async (labCoinContract, ctx) => {
  const {pubkey} = ctx.query;
  const getBalanceOf = promisify(labCoinContract.balanceOf);
  
  try {
    const balance = await getBalanceOf(pubkey);
    ctx.body = {balance: balance.toString(10)};
  }
  catch(error) {
    ctx.body = HttpError(500, 'Error');
  }
}

module.exports = {purchaseTokens, getTokenBalance};
