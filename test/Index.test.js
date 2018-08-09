var requestProvider = require("../src/providers/RequestProvider");
var SDK = require("../src/index.js");
var bcx = new SDK({apiUrl:'bcx-url'});

describe('Index Unit Tests', () => {

    it('Expect getBalance to call requestProvider.getRequest', () => {

      requestProvider.getRequest = jest.fn()
      
      let payload  = { 
        address:         "arg1",
        asset:           "arg2",
      };
      bcx.getBalance(payload)
      expect(requestProvider.getRequest).toBeCalled();
      expect(requestProvider.getRequest).toBeCalledWith(bcx.url + '/wallet-client/balance', payload);
  
      });

      it('Expect txHistory to call requestProvider.getRequest', () => {

        requestProvider.getRequest = jest.fn()
        let payload  = { 
          address1:  "arg1",
          address2:  "arg2",
          asset:     "arg3",
          nbTx:      "arg4",
          fromIndex: "arg5"
        };
        bcx.txHistory(payload)

        expect(requestProvider.getRequest).toBeCalled();
        expect(requestProvider.getRequest).toBeCalledWith(bcx.url +'/wallet-client/txhistory', payload);
    
        });
  })