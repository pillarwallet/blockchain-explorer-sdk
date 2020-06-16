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
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  target: 'web',
  mode: 'development',
  externals: {
    'react-native': 'react-native',
    zlib: 'browserify-zlib',
    console: 'console-browserify',
    constants: 'constants-browserify',
    crypto: 'react-native-crypto',
    dns: 'dns.js',
    net: 'react-native-tcp',
    domain: 'domain-browser',
    http: '@tradle/react-native-http',
    https: 'https-browserify',
    os: 'react-native-os',
    path: 'path-browserify',
    querystring: 'querystring-es3',
    fs: 'react-native-level-fs',
    _stream_transform: 'readable-stream/transform',
    _stream_readable: 'readable-stream/readable',
    _stream_writable: 'readable-stream/writable',
    _stream_duplex: 'readable-stream/duplex',
    _stream_passthrough: 'readable-stream/passthrough',
    dgram: 'react-native-udp',
    stream: 'stream-browserify',
    timers: 'timers-browserify',
    tty: 'tty-browserify',
    vm: 'vm-browserify',
    tls: 'tls',
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
};
