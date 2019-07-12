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
  async txHistory(payload) {
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

    const response = await fetchRequests(this.options);
    const parsedResponse = JSON.parse(response);
    const { result, body, txCount } = parsedResponse.data.searchTransaction;
    const formatted = body.txHistory.map((element) => {
      const temp = {};
      const parsedPayload = JSON.parse(element.payload);
      Object.assign(temp, element, parsedPayload);
      delete temp.payload;
      delete temp.hash;
      delete temp.r;
      delete temp.s;
      delete temp.v;
      return temp;
    });
    return {
      txHistory: {
        result,
        txHistory: formatted,
        txCount,
      },
    };
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
