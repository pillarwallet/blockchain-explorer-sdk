var requestProvider = require("./providers/RequestProvider");
var requesterUtil = require("./util/RequestUtil");

const BCX_GET_BALANCE = "/wallet-client/balance";
const BCX_TX_HISTORY = "/wallet-client/txhistory";

class BcxSdk {

  constructor(configuration) {
    this.url = configuration.apiUrl;
  }

  /** 
   * Get balance from BCX
   * @method getBalance Wallet requests asset balance
   * @param  {Object} payload 
   * @param  {Object} payload.address Ethereum address for which balance is requested
   * @param  {String} payload.asset Ticker of the asset for which balance is requested
   * @return {Promise}
   */
  getBalance(payload) {
    return requestProvider.getRequest(this.url + BCX_GET_BALANCE, payload);
  }

  /** 
  * Get transaction history from BCX
  * @method txHistory Wallet requests transactions history for specified asset
  * @param  {Object} payload 
  * @param  {String} payload.address1 Ethereum address for which tx history is requested
  * @param  {String} [payload.address2] (default = "ALL") Ethereum public address, returned transaction history will only contain transactions between address1 and address2
  * @param  {String} [payload.asset] (default = "ALL") Ticker of the asset for which transaction history is requested. If not specified transaction history will contain transactions for all assets
  * @param  {String} [payload.batchNb] (default = "0")  Batch number for transaction history. If batchNb = 0 client will receive last 10 transactions history, if batch number =1 client will receive tx history between last 10th transaction and last 20th ransction etc…
  * @return {Promise}
  */
  txHistory(payload) {
    const data = {
      address1: payload.address1,
      address2: payload.address2 || "ALL",
      asset: payload.asset || "ALL",
      nbTx: payload.nbTx || 10,
      fromIndex: payload.fromIndex || 0
      };
    return requestProvider.getRequest(this.url + BCX_TX_HISTORY, data);
  }
}

module.exports = BcxSdk;