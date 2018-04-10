var bcxApi = require("./src/BcxApi.js");

module.exports = {

    /** 
    * Register a new wallet on BCX
    *
    * @param  {String} walletId
    * @param  {String} ethAddress
    * @param  {String} fcmIID
    * @param  {String} serverPublicKey
    * @param  {String} signature
    * @return {JSON}
    */
   registerAccount: (walletId, ethAddress, fcmIID, serverPublicKey, signature) => {

        const data = { 
            walletId:           walletId,
            ethAddress:         ethAddress,
            fcmIID:             fcmIID,
            requesterPublicKey: serverPublicKey,
            signature:          signature

        };
        return bcxApi.postRequest(bcxApi.BCXREGISTER_URL, data)
  },

    /** 
    * Unregister a wallet 
    *
    * @param  {String} walletId
    * @param  {String} ethAddress
    * @param  {String} signature
    * @return {JSON}
    */
   unregisterAccount: (walletId, ethAddress, signature) => {

    const data = { 
        walletId:           walletId,
        ethAddress:         ethAddress,
        signature:          signature

    };
    return bcxApi.postRequest(bcxApi.BCXUNREGISTER_URL, data)
},
    /** 
    * Update the FCMIID
    *
    * @param  {String} walletId
    * @param  {String} fcmIID
    * @return {JSON}
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
     *
     * @param  {String} address
     * @param  {String} asset
     * @param  {String} contract
     * @return {JSON}
     */
    getBalance: (address, asset, requesterPublicKey = undefined) => {
        
        const data = {
          address:         address,
          asset:           asset,
          contractAddress: requesterPublicKey
        };
        return bcxApi.postRequest(bcxApi.BCXBALANCE_URL, data)
      },

    /** 
    * Get transaction history from BCX
    *
    * @param  {String} address1
    * @param  {String} address2
    * @param  {String} asset
    * @param  {String} timestamp
    * @return {JSON}
    */
    txHistory: (address1, address2 = undefined, asset = undefined, timestamp = undefined) => {
        
        const data = {
          address1:   address1,
          address1:   address2,
          asset:      asset,
          fromtmstmp: timestamp
        };
        Object.keys(data).forEach((key) => (body[key] == "ALL") && delete body[key]);
        return bcxApi.postRequest(bcxApi.BCXHISTORY_URL, data)
      }
  };
