var requestProvider = require("../src/providers/RequestProvider");
var sdk = require("../src");
var endpoints = require("../src/config/constants.js").httpsURL[process.env.NODE_ENV];

describe('Index Unit Tests', () => {

    it('Expect getBalance to call requestProvider.getRequest', () => {

      requestProvider.getRequest = jest.fn()
      
      let payload  = { 
        address:         "arg1",
        asset:           "arg2",
      };
      sdk.getBalance(payload)

      expect(requestProvider.getRequest).toBeCalled();
      expect(requestProvider.getRequest).toBeCalledWith(endpoints.BCX_GET_BALANCE, payload);
  
      });

      it('Expect txHistory to call requestProvider.getRequest', () => {

        requestProvider.getRequest = jest.fn()
        let payload  = { 
          address1:   "arg1",
          address2:   "arg2",
          asset:      "arg3",
          batchNb:    "arg4"
        };
        sdk.txHistory(payload)

        expect(requestProvider.getRequest).toBeCalled();
        expect(requestProvider.getRequest).toBeCalledWith(endpoints.BCX_TX_HISTORY, payload);
    
        });
  })