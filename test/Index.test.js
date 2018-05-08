var requestProvider = require("../src/providers/RequestProvider");
var sdk = require("../");
var plrAuth = require('@pillarwallet/plr-auth-sdk');
require('dotenv').load();

describe('Index Unit Tests', () => {

    it('Expected registerAccount to call requestProvider.postRequest', () => {  

    requestProvider.postRequest = jest.fn()
    sdk.registerAccount("arg1","arg2","arg3","arg4","arg5")
    
    let payload  = { 
      walletId:           "arg1",
      ethAddress:         "arg2",
      fcmIID:             "arg3",
      requesterPublicKey: "arg4",
    };
    let data = {...payload, signature: plrAuth.sign(payload,"arg5")}

    expect(requestProvider.postRequest).toBeCalled();
    expect(requestProvider.postRequest).toBeCalledWith(process.env.BCX_REGISTER_ACC, data)

    });

    it('Expect unregisterAccount to call requestProvider.postRequest', () => {

    requestProvider.postRequest = jest.fn()
    sdk.unregisterAccount("arg1","arg2","arg3")

    let payload  = { 
      walletId:           "arg1",
      requesterPublicKey: "arg2"
    };
    let data = {...payload, signature: plrAuth.sign(payload,"arg3")}

    expect(requestProvider.postRequest).toBeCalled();
    expect(requestProvider.postRequest).toBeCalledWith(process.env.BCX_UNREGISTER_ACC, data)

    });
    it('Expect getBalance to call requestProvider.getRequest', () => {

      requestProvider.getRequest = jest.fn()
      sdk.getBalance("arg1","arg2","arg3")

      let payload  = { 
        address:         "arg1",
        asset:           "arg2",
        contractAddress: "arg3"
      };

      expect(requestProvider.postRequest).toBeCalled();
      expect(requestProvider.getRequest).toBeCalledWith(process.env.BCX_GET_BALANCE, payload);
  
      });

      it('Expect getBalance to call requestProvider.getRequest', () => {

        requestProvider.getRequest = jest.fn()
        sdk.txHistory("arg1","arg2","arg3","arg4")
        let payload  = { 
          address1:   "arg1",
          address1:   "arg2",
          asset:      "arg3",
          fromtmstmp: "arg4"
        };

        expect(requestProvider.postRequest).toBeCalled();
        expect(requestProvider.getRequest).toBeCalledWith(process.env.BCX_GET_TXHISTORY, payload);
    
        });
  })