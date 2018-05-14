###Blockchain Explorer SDK

Pillar blockchain explorer SDK for [node](http://nodejs.org).

#### Install

```bash
$ npm install @pillarwallet/bcx-api
```
- copy /.sample.env file to /.env with your local development settings

**Development**
To enable dev mode - add `NODE_ENV=development` to `.env` file
#### Usage

```js
var bcx = require('@pillarwallet/bcx-api')
```

#### Setup

##### Balance and transaction history

###### Balance

```js
const query = {
                address: "0xe6220A8FF48E2F94D3B4Cddf8Ba1d69f8276f895",
                asset = "ETH"
              }

bcx.getBalance(query).then(response => {
  console.log(response)
})
```
<details><summary>Response</summary><p>

```js
{
  result: "success", 
  balance: {
            address: "0xabA31e585c4a221d9e196EA46c98793e0A0490bD", 
            asset: "PLR", 
            balance: 0
          }
}
```
</p></details>

###### Transaction History
```js
const query = {
                address1 = "0x5eDa0D39f19C28731a64491eD48dF5EDB0945169",
                asset = "PLR"
              }

history = bcx.txHistory(query).then(response => {
  console.log(response)
})
```

<details><summary>Response</summary><p>

```js
{
  result: "success",
  txHistory: {
      [
        {
          "to": "0x5eDa0D39f19C28731a64491eD48dF5EDB0945169",
          "from": "0xabA31e585c4a221d9e196EA46c98793e0A0490bD",
          "asset": "PLR",
          "contractAddress": "0x583cbbb8a8443b38abcc0c956bece47340ea1367",
          "timestamp": 12345678910,
          "value": 7.89,
          "status": "pending",
          "hash": "0xfe0083d38169d3d0fa0330558ef917c6e4884e318df8abaa26cec540ee4f49c",
          "gasUsed": 30234,
          "nbConfirmations": 2
        }
      ]
    }
```
</p></details>

#### Tests

###### Unit tests

```bash
$ npm test
```

###### End-to-End tests

Instructions on [Pillar-wallet-QA](https://github.com/pillarwallet/Pillar-wallet-QA) repository

#### License

  [MIT](LICENSE)