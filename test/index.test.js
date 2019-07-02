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
const requestProvider = require('../src/providers/RequestProvider');
const SDK = require('../src/index.js');

const API_URL = 'bcx-url';

const bcx = new SDK({
  apiUrl: API_URL,
});

const postRequestRestore = requestProvider.postRequest;
const getRequestRestore = requestProvider.getRequest;

describe('BcxSdk Class', () => {
  beforeEach(() => {
    requestProvider.getRequest = jest.fn();
    requestProvider.postRequest = jest.fn();
  });

  afterEach(() => {
    requestProvider.getRequest = getRequestRestore;
    requestProvider.postRequest = postRequestRestore;
  });

  describe('.txHistory', () => {
    it('makes a POST request to /wallet/txhistory with payload', () => {
      const payload = {
        address1: 'arg1',
        address2: 'arg2',
        asset: 'arg3',
        nbTx: 4,
        fromIndex: 5,
      };

      bcx.txHistory(payload);
      expect(requestProvider.postRequest).toBeCalled();
      expect(requestProvider.postRequest).toBeCalledWith(
        API_URL,
        {
          from: 'arg1',
          to: 'arg2',
          asset: 'arg3',
          limit: 4,
          offset: 5,
          protocol: 'Ethereum',
          network: 'mainnet',
        },
        'transaction',
        'searchTransaction',
      );
    });

    it('makes a POST request to txhistory with no payload', () => {
      bcx.txHistory({});
      expect(requestProvider.postRequest).toBeCalled();
      expect(requestProvider.postRequest).toBeCalledWith(
        API_URL,
        {
          protocol: 'Ethereum',
          network: 'mainnet',
        },
        'transaction',
        'searchTransaction',
      );
    });

    describe('.gasInfo', () => {
      it('makes a GET request to /wallet-client/gasinfo with a payload', () => {
        const payload = {
          nBlocks: 10,
        };

        bcx.gasInfo(payload);

        expect(requestProvider.getRequest).toBeCalled();
        expect(requestProvider.getRequest).toBeCalledWith(`${API_URL}/wallet-client/gasinfo`, payload);
      });

      it('makes a GET request to /wallet-client/gasinfo with no payload', () => {
        bcx.gasInfo();

        expect(requestProvider.getRequest).toBeCalled();
        expect(requestProvider.getRequest).toBeCalledWith(`${API_URL}/wallet-client/gasinfo`, {});
      });
    });

    describe('.gasStation', () => {
      it('makes a GET request to /wallet-client/gasstation', () => {
        bcx.gasStation();

        expect(requestProvider.getRequest).toBeCalled();
        expect(requestProvider.getRequest).toBeCalledWith(`${API_URL}/wallet-client/gasstation`, {});
      });
    });
  });
});
