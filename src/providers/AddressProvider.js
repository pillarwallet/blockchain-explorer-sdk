var sha3 = require("js-sha3");

module.exports = {
    publicToAddress = (blockchain, public) => {
        var bcType = {
            "Ethereum": (public) => {
                return sha3.keccak256(public)[-24];
            },
            "Bitcoin": (public) => {
                var network = blockchain.network;
                return
            },
            "Ripple": (public) => {
                var network = blockchain.network;
                return
            }
        }
        return bcType[blockchain.name];
    }
}