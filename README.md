Blockchain Explorer SDK
=======================

Pillar blockchain explorer SDK for [node](http://nodejs.org).

## Install

```bash
$ npm install @pillarwallet/bcx-api
```
## Usage

```js
var bcx = require('@pillarwallet/bcx-api')
bcx = new BCX({apiUrl:`https://apiurl.io:${port}`)
```
####  Transaction history, gas station, and gas info

###### Transaction History
```js

const payload = {
      address1: '0xe6220A8FF48E2F94D3B4Cddf8Ba1d69f8276f895',
      asset: 'ETH',
    }

bcx.txHistory(payload).then(console.log)
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

###### Gas Station
```js
bcx.gasStation().then(console.log);
```

<details><summary>Response</summary><p>

```js
{ result: 'success',
  safeLow: 7,
  standard: 8,
  fast: 13,
  fastest: 50,
  blockTime: 15,
  blockNumber: 6795711 }
```

</p></details>

###### Gas Info
```js
bcx.gasInfo().then(console.log);
```

<details><summary>Response</summary><p>

```js
{
result: 'success',
avgGasPrice: 6984665476.524783,
stdDev: 4497814031.576423,
topBlock: 6795711
}
```

</p></details>



## License

  [MIT](LICENSE)