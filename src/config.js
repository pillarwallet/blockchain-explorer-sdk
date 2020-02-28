/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const convict = require('convict');

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  bcxServerUrl: {
    doc: 'The server url.',
    format: 'url',
    default: 'https://bcx-api.io',
    env: 'BCX_SERVER_URL',
  },
  bcxTxHistory: {
    doc: 'The transaction history graph endpoint.',
    format: 'String',
    default: 'searchTransaction',
    env: 'BCX_TX_HISTORY',
  },
  bcxBalanceHistory: {
    doc: 'The balance history graph endpoint.',
    format: 'String',
    default: 'dailyLedger',
    env: 'BCX_BALANCE_HISTORY',
  },
  bcxGasStation: {
    doc: 'The gas station endpoint.',
    format: 'String',
    default: 'gasStation',
    env: 'BCX_GAS_STATION',
  },
  network: {
    doc: 'The network (mainnet/testnet).',
    format: 'String',
    default: 'mainnet',
    env: 'BCX_NETWORK',
  },
  protocol: {
    doc: 'The protocol (eth/btc...).',
    format: 'String',
    default: 'eth',
    env: 'BCX_PROTOCOL',
  },
});

// Load environment dependent configuration
const env = config.get('env');
try {
  config.loadFile(`./config/${env}.json`);
} catch (_err) {
  // Ignoring "ENOENT: no such file or directory exception"
  // in case config file not provided
  // Assigning default values to variables.
}

// Perform validation
config.validate({
  allowed: 'strict',
});

module.exports = config;
