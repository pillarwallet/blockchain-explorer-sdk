/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const requestProvider = require('./providers/RequestProvider');

const { validate } = require('./schemas');
const txHistorySchema = require('./schemas/txHistory.json');
const gasInfoSchema = require('./schemas/gasInfo.json');

const BCX_TX_HISTORY = '/wallet-client/txhistory';
const BCX_GAS_INFO = '/wallet-client/gasinfo';
const BCX_GAS_STATION = '/wallet-client/gasstation';

class BcxSdk {
  constructor(configuration) {
    this.url = configuration.apiUrl;
  }

  /**
  * Get transaction history from BCX
  * @method txHistory Wallet requests transactions history for specified asset
  * @param  {Object} payload
  * @param  {String} [payload.address1] Ethereum address for which tx history is requested
  * @param  {String} [payload.address2] (default = "ALL") Ethereum public address, returned
  * transaction history will only contain transactions between address1 and address2
  * @param  {String} [payload.asset] (default = "ALL") Ticker of the asset for which
  * transaction history is requested. If not specified transaction history will contain
  * transactions for all assets
  * @param  {Number} [payload.nbTx] (default = "10")  Number of transactions to be shown.
  * @param  {Number} [payload.fromIndex] (default = "0")  Starting point of transaction history.
  * 0 means the first (newest) entry.
  * @return {Promise}
  */
  txHistory(payload) {
    try {
      validate(txHistorySchema, payload);
    } catch (e) {
      return Promise.reject(e);
    }

    const data = {
      protocol: payload.protocol || 'Ethereum',
      network: payload.network || 'mainnet',
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

    return requestProvider.postRequest(this.url + BCX_TX_HISTORY, data);
  }

  /**
   * Get gas info from BCX
   * @method gasInfo Wallet requests gas info
   * @return {Promise}
   */
  gasInfo(payload = {}) {
    try {
      validate(gasInfoSchema, payload);
    } catch (e) {
      return Promise.reject(e);
    }

    return requestProvider.getRequest(this.url + BCX_GAS_INFO, payload);
  }

  /**
   * Get gas price suggestion from BCX
   * @method gasStation Wallet requests gas price suggestion
   * @return {Promise}
   */
  gasStation() {
    return requestProvider.getRequest(this.url + BCX_GAS_STATION, {});
  }
}

module.exports = BcxSdk;
