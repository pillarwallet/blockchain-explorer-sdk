var bcxApi = require("./providers/BcxApi.js");
const bcxEndpoints = require("./constants/BcxEndpoints.js")
var plrAuth = require('@pillarwallet/plr-auth-sdk');
const signatureType = require('./constants/SignatureType.js').defaultSignatureType;


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
      
      let payload = bcxApi.createPayload(walletId, walletAddress, fcmIID, serverPublicKey);  
      let data = {...payload, signature: plrAuth.sign(payload,privateKey,signatureType)
    };
      
      return bcxApi.postRequest(bcxEndpoints.BCXREGISTER_URL, data)
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

      let payload = bcxApi.createPayload(walletId, walletAddress);  
      let data = {...payload, signature: plrAuth.sign(payload,privateKey,signatureType)

    };

      return bcxApi.postRequest(bcxEndpoints.BCXUNREGISTER_URL, data)
},
    /** 
    * Update the FCMIID
    * @method updateFMCIID
    * @param  {String} walletId
    * @param  {String} fcmIID
    * @return {Object}
    */
    updateFMCIID: (walletId, walletAddress, fcmIID) => {
        
        const data = {
            walletId:           walletId,
            pubAddress:         walletAddress,
            FCMIID:             fcmIID
        };
        
        return bcxApi.postRequest(bcxEndpoints.BCXFCMIID_URL, data)
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
        
        return bcxApi.postRequest(bcxEndpoints.BCXBALANCE_URL, data)
        .then(response => {
          callback(response)
        })
        .catch(error => error)
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
        
        return bcxApi.postRequest(bcxEndpoints.BCXHISTORY_URL, data)
      }
  };
