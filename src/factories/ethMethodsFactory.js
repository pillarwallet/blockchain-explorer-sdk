const { validate } = require('../schemas');
const { fetchRequests } = require('../util/requester');
const txHistorySchema = require('../schemas/txHistory.json');

class EthMethodsFactory {
  constructor(sdk) {
    this.options = {
      uri: sdk.url,
      headers: { 'Content-Type': 'application/json' },
    };

    this.network = sdk.network;
    this.protocol = sdk.protocol;
    this.txHistory = this.txHistory.bind(this);
    this.gasStation = this.gasStation.bind(this);
  }

  /**
   * Sends a POST requests to transactions history endpoint
   * @param {Object} payload
   * @return {Promise<object>} Returns a promise
   */
  txHistory(payload) {
    try {
      validate(txHistorySchema, payload);
    } catch (e) {
      return Promise.reject(e);
    }

    const data = {
      protocol: this.protocol,
      network: this.network,
      from: payload.address1,
      to: payload.address2,
      asset: payload.asset,
      hash: payload.txHash,
      sort: payload.sort,
      order: payload.order,
      offset: payload.fromIndex,
      limit: payload.nbTx,
    };

    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    let formattedPayload = JSON.stringify(data).replace(/[{}]+/g, '');
    formattedPayload = formattedPayload.replace(/"(\w+)"\s*:/g, '$1:');
    this.options.method = 'POST';
    this.options.body = `query { searchTransaction(${formattedPayload}) }`;
    return fetchRequests(this.options);
  }

  /**
   * Sends a POST requests to gas station endpoint
   * @return {Promise<object>} Returns a promise
   */
  gasStation() {
    this.options.method = 'POST';
    this.options.body = 'query { gasStation }';
    return fetchRequests(this.options);
  }
}
module.exports = EthMethodsFactory;
