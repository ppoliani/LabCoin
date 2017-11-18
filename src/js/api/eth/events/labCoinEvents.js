const logger = require('../../helpers/logger');

const logTransfer = (error, result) => {
  if(result.args.status) {
    logger.info(result)
  }
}

const listen = labCoinContract => {
  labCoinContract.logFileAddedStatus().watch(logFileAddedStatusListener)
}

module.exports = listen;
