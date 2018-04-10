var bcxApi = require("./src/BcxApi.js");

module.exports = {

    /** 
    * Register a new wallet on BCX
    * @method registerAccount
    * @param  {String} walletId
    * @param  {String} walletAddress
    * @param  {String} fcmIID
    * @param  {String} serverPublicKey
    * @param  {String} signature
    * @return {Object}
    */
   registerAccount: (walletId, walletAddress, fcmIID, serverPublicKey, signature) => {

        const data = { 
            walletId:           walletId,
            ethAddress:         walletAddress,
            fcmIID:             fcmIID,
            requesterPublicKey: serverPublicKey,
            signature:          signature

        };
        return bcxApi.postRequest(bcxApi.BCXREGISTER_URL, data)
  },

    /** 
    * Unregister a wallet 
    * @method unregisterAccount
    * @param  {String} walletId
    * @param  {String} ethAddress
    * @param  {String} signature
    * @return {Object}
    */
   unregisterAccount: (walletId, walletAddress, signature) => {

    const data = { 
        walletId:           walletId,
        ethAddress:         walletAddress,
        signature:          signature

    };
    return bcxApi.postRequest(bcxApi.BCXUNREGISTER_URL, data)
},
    /** 
    * Update the FCMIID
    * @method updateFMCIID
    * @param  {String} walletId
    * @param  {String} fcmIID
    * @return {Object}
    */
    updateFMCIID: (walletId, fcmIID) => {
        
        const data = {
            walletId:           walletId,
            fcmIID:             fcmIID
        };
        return bcxApi.postRequest(bcxApi.BCXFCMIID_URL, data)
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
        return bcxApi.postRequest(bcxApi.BCXBALANCE_URL, data)
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
        return bcxApi.postRequest(bcxApi.BCXHISTORY_URL, data)
      }
  };
