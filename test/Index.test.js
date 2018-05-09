var requestProvider = require("../src/providers/RequestProvider");
var sdk = require("../");
require('dotenv').load();

describe('Index Unit Tests', () => {

    it('Expect getBalance to call requestProvider.getRequest', () => {

      requestProvider.getRequest = jest.fn()
      sdk.getBalance("arg1","arg2")

      let payload  = { 
        address:         "arg1",
        asset:           "arg2",
      };

      expect(requestProvider.postRequest).toBeCalled();
      expect(requestProvider.getRequest).toBeCalledWith(process.env.BCX_GET_BALANCE, payload);
  
      });

      it('Expect txHistory to call requestProvider.getRequest', () => {

        requestProvider.getRequest = jest.fn()
        sdk.txHistory("arg1","arg2","arg3","arg4")
        let payload  = { 
          address1:   "arg1",
          address2:   "arg2",
          asset:      "arg3",
          fromtmstmp: "arg4"
        };

        expect(requestProvider.postRequest).toBeCalled();
        expect(requestProvider.getRequest).toBeCalledWith(process.env.BCX_TX_HISTORY, payload);
    
        });
  })