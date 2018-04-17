var ethUtil = require("ethereumjs-util");

exports.sign = (data, privateKey, hash) => {
    let digest = hashTable[hash](data);
    let signature =  ethUtil.secp256k1.sign(digest, privateKey);
    return signature.signature.toString('hex');
}

var hashTable = {
    "sha256": function(msg) {
      return ethUtil.sha256(msg);
    },
    "sha3": function(msg) {
      return ethUtil.sha3(msg);
    },
    "keccak":  function(msg) {
      return ethUtil.keccak(msg);
    }
  };