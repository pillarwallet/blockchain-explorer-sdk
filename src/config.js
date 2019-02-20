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
    format: ['production', 'development', 'qa'],
    default: 'development',
    env: 'NODE_ENV',
  },
  bcxServerUrl: {
    format: 'url',
    default: '',
    arg: 'bcxServerUrl',
    env: 'BCX_SERVER_URL',
  },
  bcxGetBalance: {
    format: 'url',
    default: '',
    arg: 'bcxGetBalance',
    env: 'BCX_GET_BALANCE',
  },
  bcxTxHistory: {
    format: 'url',
    default: '',
    arg: 'bcxTxHistory',
    env: 'BCX_TX_HISTORY',
  },
  bcxGasInfo: {
    format: 'url',
    default: '',
    arg: 'bcxGasInfo',
    env: 'BCX_GAS_INFO',
  },
  bcxGasStation: {
    format: 'url',
    default: '',
    arg: 'bcxGasStation',
    env: 'BCX_GAS_STATION',
  }
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(`./config/${env}.json`);

// Perform validation
config.validate({
  allowed: 'strict',
});

module.exports = config;
