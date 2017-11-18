const {promisify} = require('util')
const logger = require('../../helpers/logger')
const getWeb3 = require('../index')

const logICOTxnListener = (error, result) => {
  if(error) return logger.error(error);
  if(result.args.status) {
    logger.info(result)
  }
}

const listenToEvents = labCoinContract => {
  labCoinContract.LogICOTxn().watch(logICOTxnListener)
}

const getLogs = async (labCoinContract, recipient) => new Promise((resolve, reject) => {
  const filter = {fromBlock: 0, toBlock: 'latest'};
  const realLogs = labCoinContract
    .LogICOTxn({recipient}, filter)
    .get((error, logs) => {
      if(error) return reject(`Error reading logs for the ${event} event: ${error}`);
      resolve(logs)
    });

});

module.exports = {listenToEvents, getLogs};
