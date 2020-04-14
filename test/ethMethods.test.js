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
/* eslint-disable global-require */
const requester = require('../src/util/requester');
const config = require('../src/config');

let EthMethods;
let methodsFactory;

const mockResponse = {
  data: {
    dailyLedger: {
      result: 200,
      body: {
        balanceHistory: [],
      },
    },
    searchTransaction: {
      result: 200,
      body: {
        txHistory: [],
      },
    },
    gasStation: '{"result": "success"}',
  },
};

describe('Tests whether EthMethods call the correct endpoints.', () => {
  beforeAll(() => {
    jest.spyOn(requester, 'fetchRequests')
      .mockImplementation(() => (JSON.stringify(mockResponse)));
    EthMethods = require('../src/factories/ethMethods');
    methodsFactory = new EthMethods({});
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('txHistory() test', async () => {
    await methodsFactory.txHistory({});
    const { body } = requester.fetchRequests.mock.calls[0][0];
    const endpoint = config.get('bcxTxHistory');
    expect(body).toMatch(new RegExp(`(${endpoint})`));
  });

  test('balanceHistory() test', async () => {
    await methodsFactory.balanceHistory({
      wallet: '0x00',
      asset: 'ETH',
    });
    const { body } = requester.fetchRequests.mock.calls[0][0];
    const endpoint = config.get('bcxBalanceHistory');
    expect(body).toMatch(new RegExp(`(${endpoint})`));
  });

  test('gasStation() test', async () => {
    await methodsFactory.gasStation();
    const { body } = requester.fetchRequests.mock.calls[0][0];
    const endpoint = config.get('bcxGasStation');
    expect(body).toMatch(new RegExp(`(${endpoint})`));
  });
});
