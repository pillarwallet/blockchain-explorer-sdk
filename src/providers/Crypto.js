//var ethUtil = require("ethereumjs-util");
var EC = require("elliptic").ec;
var Hashes = require('jshashes');
var sha3 = require('js-sha3');
   /** 
    * Register a new wallet on BCX
    * @method sign
    * @param  {Object} data   
    * @param  {String} privateKey
    * @param  {String} hash
    * @return {String}
    */

exports.sign = (data, privateKey, hash) => {
    var ec = new EC('secp256k1');
    var key = ec.keyFromPrivate(privateKey,"hex");
    var digest  =  hashTable[hash](JSON.stringify(data));
    var signature =  ec.sign(digest, key, "hex");
    return  signature.r.toString("hex")+ signature.s.toString("hex") + (signature.recoveryParam);
}

var hashTable = {
    "MD5": function(msg) {
        return new Hashes.MD5().hex(msg);
    },
    "SHA1": function(msg) {
        return new Hashes.SHA1().hex(msg);
    },
    "SHA224": function(msg) {
        return new Hashes.SHA224().hex(msg);
    },
    "SHA256": function(msg) {
        return new Hashes.SHA256().hex(msg);
    },
    "SHA384": function(msg) {
        return new Hashes.SHA384MD5().hex(msg);
    },
    "SHA512": function(msg) {
        return new Hashes.SHA512().hex(msg);
    },
    "RMD160": function(msg) {
        return new Hashes.RMD160().hex(msg);
    },
    "KECCAK224": function(msg) {
        return sha3.keccak224(msg);
    },
    "KECCAK256": function(msg) {
        return sha3.keccak256(msg);;
    },
    "KECCAK384": function(msg) {
        return sha3.keccak384(msg);;
    },
    "KECCAK512": function(msg) {
        return sha3.keccak512(msg);;
    },
    "SHA3_224": function(msg) {
        return sha3.sha3_224(msg);
    },
    "SHA3_256": function(msg) {
        return sha3.sha3_256(msg);
    },
    "SHA3_384": function(msg) {
        return sha3.sha3_384(msg);
    },
    "SHA3_512": function(msg) {
        return sha3.sha3_512(msg);
    },
    "SHAKE128": function(msg) {
        return sha3.shake128(msg,256);
    },
    "SHAKE256": function(msg) {
        return sha3.shake256(msg,512);
    }    
};

  
  