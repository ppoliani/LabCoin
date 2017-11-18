const logger = require('../../helpers/logger');

const logTransferListener = (error, result) => {
  if(error) return logger.error(error);
  if(result.args.status) {
    logger.info(result)
  }
}

const listen = labCoinContract => {
  labCoinContract.LogTransfer().watch(logTransferListener)
}

module.exports = listen;
