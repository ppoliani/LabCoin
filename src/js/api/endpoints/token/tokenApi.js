const {promisify} = require('util');
const {HttpError} = require('../../core/api');

const purchaseTokens = async (web3, labCoinContract, ctx, next) => {
  const {amount} = ctx.request.body;
  const sendTransaction = promisify(labCoinContract.set.sendTransaction);
  const options = {
    from: web3.eth.accounts[0]
  }

  try{
    const success = await sendTransaction(owner, filehash, options);
    ctx.body = {success};
  }
  catch(error) {
    ctx.body = HttpError(500, 'Error');
  }
}

const getTokenBalance = async (labCoinContract, ctx, next) => {
  const {pubKey} = ctx.query;
  throw 'Not Implemented'
  ctx.body = {};
}

module.exports = {purchaseTokens, getTokenBalance};
