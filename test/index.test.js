const requestProvider = require('../src/providers/RequestProvider');
const SDK = require('../src/index.js');

const API_URL = 'bcx-url';

const bcx = new SDK({
  apiUrl: API_URL,
});

describe('BcxSdk Class', () => {
  beforeEach(() => {
    requestProvider.getRequest = jest.fn();
  });

  afterEach(() => {
    requestProvider.getRequest.mockRestore();
  });

  describe('.getBalance', () => {
    it('makes a GET request to /wallet-client/balance endpoint with payload', () => {
      const payload = {
        address: 'arg1',
        asset: 'arg2',
      };

      bcx.getBalance(payload);

      expect(requestProvider.getRequest).toBeCalled();
      expect(requestProvider.getRequest).toBeCalledWith(`${API_URL}/wallet-client/balance`, payload);
    });

    it('validates payload', async () => {
      expect.assertions(3);

      try {
        await bcx.getBalance({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch(/data should have required property 'address'/);
        expect(e.message).toMatch(/data should have required property 'asset'/);
      }
    });
  });

  describe('.txHistory', () => {
    it('makes a GET request to /wallet/txhistory with payload', () => {
      const payload = {
        address1: 'arg1',
        address2: 'arg2',
        asset: 'arg3',
        batchNb: 'arg4',
      };

      bcx.txHistory(payload);

      expect(requestProvider.getRequest).toBeCalled();
      expect(requestProvider.getRequest).toBeCalledWith(`${API_URL}/wallet-client/txhistory`, payload);
    });

    it('validates payload', async () => {
      expect.assertions(2);

      try {
        await bcx.txHistory({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch(/data should have required property 'address1'/);
      }
    });

    it('defaults payload properties', () => {
      const address1 = 'address1';

      bcx.txHistory({ address1 });

      const payload = requestProvider.getRequest.mock.calls[0][1];
      expect(payload).toEqual({
        address1,
        address2: 'ALL',
        asset: 'ALL',
        batchNb: '0',
      });
    });
  });
});