const EthMethodsFactory = require('./ethMethodsFactory');

class MethodsFactory {
  constructor(sdk) {
    switch (sdk.protocol) {
      case 'eth':
        this.methodsProduct = new EthMethodsFactory(sdk);
        break;
      case 'btc':
        break;
      default:
        break;
    }
    return {
      txHistory: this.methodsProduct.txHistory,
    };
  }
}
module.exports = MethodsFactory;
