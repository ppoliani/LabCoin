const {promisify} = require('util')
const {HttpError} = require('../../core/api')
const {getAccountPubKey} = require('../../helpers/account')

const purchaseTokens = async (web3, labCoinContract, ctx) => {
  const {amount} = ctx.request.body;
  const sendTransaction = promisify(labCoinContract.set.sendTransaction);
  const options = {
    from: getAccountPubKey()
  }

  try{
    const success = await sendTransaction(amount, options);
    ctx.body = {success};
  }
  catch(error) {
    ctx.body = HttpError(500, 'Error');
  }
}

const getTokenBalance = async (labCoinContract, ctx) => {
  const {pubKey} = ctx.query;
  throw 'Not Implemented'
  ctx.body = {};
}

module.exports = {purchaseTokens, getTokenBalance};
