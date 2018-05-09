var requestProvider = require("./providers/RequestProvider")
var requesterUtil = require("./util/RequestUtil")

process.env.NODE_ENV = 'development';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

module.exports = {
     /** 
     * Get balance from BCX
     * @method getBalance
     * @param  {String} walletAddress
     * @param  {String} asset
     * @return {Promise}
     */
    getBalance: (walletAddress, asset) => {
      
        const data = {
          address:         walletAddress,
          asset:           asset,
        };
        return requestProvider.getRequest(process.env.BCX_GET_BALANCE, data)
      },

    /** 
    * Get transaction history from BCX
    * @method txHistory
    * @param  {String} walletAddress1
    * @param  {String} walletAddress2
    * @param  {String} asset
    * @param  {String} timestamp
    * @return {Promise}
    */
    txHistory: (walletAddress1, walletAddress2, asset, timestamp) => {
        
        const data = {
          address1:   walletAddress1,
          address2:   walletAddress2,
          asset:      asset,
          fromtmstmp: timestamp
        };
        
        return requestProvider.getRequest(process.env.BCX_TX_HISTORY, data)
      }
  };
