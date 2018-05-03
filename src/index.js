var requestProvider = require("./providers/RequestProvider.js")
var requesterUtils = require("./util/RequestUtils.js")
var plrAuth = require('@pillarwallet/plr-auth-sdk');

process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

module.exports = {
    /** 
    * Register a new wallet on BCX
    * @method registerAccount
    * @param  {String}   
    * @param  {String}
    * @param  {String} 
    * @param  {String} 
    * @param  {String} 
    * @return {String}
    */
   registerAccount: (walletId, walletAddress, fcmIID, serverPublicKey, privateKey) => {
    
      let payload  = { 
        walletId:           walletId,
        ethAddress:         walletAddress,
        fcmIID:             fcmIID,
        requesterPublicKey: serverPublicKey,
    };
      
    let data = {...payload, signature: plrAuth.sign(payload,privateKey)
    };
      
      return requestProvider.postRequest(process.env.BCX_REGISTER_ACC, data)
  },

    /** 
    * Unregister a wallet 
    * @method unregisterAccount
    * @param  {String}
    * @param  {String} 
    * @param  {String} 
    * @return {String}
    */
   unregisterAccount: (walletId, walletAddress, privateKey) => {
        
      const payload = { 
          walletId:           walletId,
          requesterPublicKey: walletAddress,
        };

      let data = {...payload, signature: plrAuth.sign(payload,privateKey)

    };

      return requestProvider.postRequest(process.env.BCX_UNREGISTER_ACC, data)
},
    /** 
    * Update the FCMIID
    * @method updateFMCIID
    * @param  {String} walletId
    * @param  {String} fcmIID
    * @return {Object}
    */
    updateFMCIID: (walletId, requesterPublicKey, fcmIID, privateKey) => {

        const payload = {
            walletId:           walletId,
            requesterPublicKey: requesterPublicKey,
            FCMIID:             fcmIID
        };
        let data = {...payload, signature: plrAuth.sign(payload,privateKey)};

        return requestProvider.postRequest(process.env.BCX_UPDATE_FCMIID, data)
      },
     /** 
     * Get balance from BCX
     * @method getBalance
     * @param  {String} walletAddress
     * @param  {String} asset
     * @param  {String} contract
     * @return {Object}
     */
    getBalance: (walletAddress, asset, requesterPublicKey = undefined) => {
        
        const data = {
          address:         walletAddress,
          asset:           asset,
          contractAddress: requesterPublicKey
        };
        
        return requestProvider.postRequest(process.env.BCX_GET_BALANCE, data)
      },

    /** 
    * Get transaction history from BCX
    * @method txHistory
    * @param  {String} address1
    * @param  {String} address2
    * @param  {String} asset
    * @param  {String} timestamp
    * @return {Object}
    */
    txHistory: (walletAddress1, walletAddress2 = undefined, asset = undefined, timestamp = undefined) => {
        
        const data = {
          address1:   walletAddress1,
          address1:   walletAddress2,
          asset:      asset,
          fromtmstmp: timestamp
        };
        Object.keys(data).forEach((key) => (body[key] == "ALL") && delete body[key]);
        
        return requestProvider.postRequest(process.env.BCX_GET_TXHISTORY, data)
      }
  };
