Blockchain Explorer SDK
=======================

Pillar blockchain explorer SDK for [node](http://nodejs.org).

## Install

```bash
$ npm install bcx-api
```
## Usage

```js
//var bcx = require('bcx-api')
var bcx = require('./index.js')
```

#### Account and FCMIID

###### Registration

```js
var secp256k1 = require("secp256k1");
var sha3 = require("ethereumjs-util");

const walletId = 1234;
const walletAddress = "0xabA31e585c4a221d9e196EA46c98793e0A0490bD";
const fcmIID = "APA91bGEmgAWTTgv1SiOwxMBQHKBWKe8WSAPsplsxQNm2nBgVx0DUAIOrRUPsLlG5Xt1HytSi60PxYaZBozAnml4UKySH21IRwKvENjjgGFpCxXAGJ40HLud4ljpvSbCymOdn-dPtPaV";
const requesterPublicKey = "0x5eDa0D39f19C28731a64491eD48dF5EDB0945169";

const payload = bcx.createPayload(walletId, walletAddress, fcmIID, requesterPublicKey)
    
const digest = sha3(JSON.stringify(parameters));
const signature = secp256k1.sign(digest, new Buffer(privateKey, "hex"));
    
bcx.registerAccount(payload, signature)
```
<details><summary>Response</summary><p>

    [200] - NEW ACCOUNT WAS REGISTERED!

</p></details>

###### Remove an account
```js
var secp256k1 = require("secp256k1");
var sha3 = require("ethereumjs-util");

const walletId = 1234;
const walletAddress = "0xabA31e585c4a221d9e196EA46c98793e0A0490bD";
const payload = bcx.createPayload(walletId, walletAddress)
    
const digest = sha3(JSON.stringify(parameters));
const signature = secp256k1.sign(digest, new Buffer(privateKey, "hex"));
    
bcx.unregisterAccount(payload, signature)
```
###### FCMIID Uptade

```js
const walletId = 1234;
const walletAddress = "0xabA31e585c4a221d9e196EA46c98793e0A0490bD";
const newFCMIID =  "APA91bGEmgAWTTgv1SiOwxMBQHKBWKe8WSAPsplsxQNm2nBgVx0DUAIOrRUPsLlG5Xt1HytSi60PxYaZBozAnml4UKySH21IRwKvENjjgGFpCxXAGJ40HLud4ljpvSbCymOdn-dPtPaV";

bcx.updateFCMIID(walletID, walletAddress, newFMCIID);
```

<details><p><summary>Response</summary>

    [200] FCM IID UPDATED FOR ACCOUNT 1234

</p></details>

#### Balance and transaction history

###### Balance

```js
const walletAddress = "0xe6220A8FF48E2F94D3B4Cddf8Ba1d69f8276f895";
const asset = "ETH";
const balance = bcx.getBalance(walletAddress, asset)
```
<details><summary>Response</summary><p>

```js
    { 
        address: '0xe6220A8FF48E2F94D3B4Cddf8Ba1d69f8276f895',
        asset: 'ETH',
        balance: '5.999704284' 
    }
```
</p></details>

###### Transaction History
```js
const walletAddress = "0xe6220A8FF48E2F94D3B4Cddf8Ba1d69f8276f895";
const asset = "ETH";
// txHistory(toAddress: string, fromAddress : string, asset: string, fromTimestamp: number)
history = bcx.txHistory(walletAddress, "ALL", "ALL", 0)
```

<details><summary>Response</summary><p>

```js
{
  [
  transaction: 
  {
    schema: 
    {
      hash: '0xfe0083d38169d3d0fa0330558ef917c6e4884e318df8abaa26cec540ee4f49c',
      nonce: 264,
      blockHash: '0xe0083d38169d3d0fa0330558ef917c6e4884e318df8abaa26cec540ee4f49c',
      blockNumber: 2980845,
      transactionIndex: 134,
      from: '0xabA31e585c4a221d9e196EA46c98793e0A0490bD',
      to: '0x5eDa0D39f19C28731a64491eD48dF5EDB0945169',
      value: '7890000000000000000',
      gasPrice: '1000000000',
      gas: '49000000000',
      input: 'string'
    }
  },
  receipt: 
  {
    schema: 
    {
      blockHash: '0xfe0083d38169d3d0fa0330558ef917c6e4884e318df8abaa26cec540ee4f49c',
      blockNumber: 2980845,
      transactionHash: '0xfe0083d38169d3d0fa0330558ef917c6e4884e318df8abaa26cec540ee4f49c',
      transactionIndex: 134,
      from: '0xabA31e585c4a221d9e196EA46c98793e0A0490bD',
      to: '0x5eDa0D39f19C28731a64491eD48dF5EDB0945169',
      contractAddress: '0x583cbbb8a8443b38abcc0c956bece47340ea1367',
      cumulativeGasUsed: 314159,
      gasUsed: 30234
    }
  },
  hash: '0xfe0083d38169d3d0fa0330558ef917c6e4884e318df8abaa26cec540ee4f49c',
  to: '0x5eDa0D39f19C28731a64491eD48dF5EDB0945169',
  from: '0xabA31e585c4a221d9e196EA46c98793e0A0490bD',
  tmstmp: 12345678910,
  asset: 'PLR',
  value: 7.89,
  nbConfirmations: 2,
  status: 'pending'
  ]
}
```
</p></details>

## License

  [MIT](LICENSE)