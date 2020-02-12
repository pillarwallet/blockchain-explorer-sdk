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
const { validate } = require('../schemas');
const config = require('../config');
const { fetchGraphRequests, fetchRestRequests } = require('../util/requester');
const txHistorySchema = require('../schemas/txHistory.json');
const balanceHistorySchema = require('../schemas/balanceHistory.json');
const gasInfoSchema = require('../schemas/gasInfo.json');

class EthMethodsFactory {
  constructor(sdk) {
    this.options = {
      uri: sdk.url,
      headers: { 'Content-Type': 'application/json' },
    };

    this.network = sdk.network;
    this.protocol = sdk.protocol;
    this.txHistory = this.txHistory.bind(this);
    this.balanceHistory = this.balanceHistory.bind(this);
    this.gasStation = this.gasStation.bind(this);
  }

  /**
   * Sends a POST requests to transactions history endpoint
   * @param {Object} payload
   * @return {Promise<object>} Returns a promise
   */
  async txHistory(payload) {
    try {
      validate(
        txHistorySchema,
        payload,
      );
    } catch (e) {
      return Promise.reject(e);
    }

    const data = {
      protocol: this.protocol,
      network: this.network,
      from: payload.address1,
      to: payload.address2,
      asset: payload.asset,
      txHash: payload.txHash,
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
    const endpoint = config.get('bcxTxHistory');
    this.options.method = 'POST';
    this.options.body = `query { ${endpoint}(${formattedPayload}) }`;

    const response = await fetchGraphRequests(this.options);
    const parsedResponse = JSON.parse(response);
    const {
      result,
      body,
    } = parsedResponse.data.searchTransaction;
    const formatted = body.txHistory.map((element) => {
      const temp = {};
      const parsedPayload = JSON.parse(element.payload);
      Object.assign(
        temp,
        element,
        parsedPayload,
      );
      delete temp.payload;
      delete temp.hash;
      delete temp.createdAt;
      delete temp.updatedAt;
      delete temp.notify;
      delete temp.nonce;
      delete temp.hashmd5;
      delete temp.blockHash;
      delete temp.transactionIndex;
      delete temp.gas;
      delete temp.r;
      delete temp.s;
      delete temp.v;
      return temp;
    });
    return {
      txHistory: {
        result,
        txHistory: formatted,
        txCount: body.count,
      },
    };
  }

  /**
   * Sends a GET requests to gas station endpoint
   * @return {Promise<object>} Returns a promise
   */
  async gasStation() {
    const endpoint = config.get('bcxGasStation');
    this.options.method = 'GET';
    this.options.uri = this.options.uri + endpoint;
    return fetchRestRequests(this.options);
  }

  /**
   * Sends a GET requests to gas info endpoint
   * @param {Object} payload
   * @return {Promise<object>} Returns a promise
   */
  async gasInfo(payload) {
    try {
      validate(
        gasInfoSchema,
        payload,
      );
    } catch (e) {
      return Promise.reject(e);
    }
    const endpoint = config.get('bcxGasInfo');
    this.options.method = 'GET';
    this.options.uri = this.options.uri + endpoint;
    return fetchRestRequests(this.options);
  }

  /**
   * Sends a POST requests to balance history endpoint
   * @param {Object} payload
   * @return {Promise<object>} Returns a promise
   */
  async balanceHistory(payload) {
    try {
      validate(balanceHistorySchema, payload);
    } catch (e) {
      return Promise.reject(e);
    }

    const data = payload;

    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    let formattedPayload = JSON.stringify(data).replace(/[{}]+/g, '');
    formattedPayload = formattedPayload.replace(/"(\w+)"\s*:/g, '$1:');
    const endpoint = config.get('bcxBalanceHistory');
    this.options.method = 'POST';
    this.options.body = `query { ${endpoint}(${formattedPayload}) }`;

    const response = await fetchGraphRequests(this.options);
    const parsedResponse = JSON.parse(response);
    const { result, body } = parsedResponse.data.dailyLedger;
    const formatted = body.balanceHistory;
    return {
      balanceHistory: {
        result,
        balanceHistory: formatted,
      },
    };
  }
}
module.exports = EthMethodsFactory;
