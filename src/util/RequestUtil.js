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
const request = require('request-promise');

/**
* Fetch https requests
* @method fetchRequests
* @param  {String} url
* @param  {Object} body
* @param  {String} type
* @param  {String} queryParams
* @param  {String} [graphEndpoint = null]
* @param  {String} [graphMethod = null]
*/
exports.fetchRequests = (
  url,
  body,
  type,
  queryParams,
  graphEndpoint = null,
  graphMethod = null,
) => {
  let payload = body;
  const rawData = body.replace(/['"{}]+/g, '');
  switch (type) {
    case 'POST':
      payload = `${graphEndpoint} { ${graphMethod}(${rawData}) }`;
      break;
    case 'GET':
      break;
    case 'PUT':
      break;
    case 'DELETE':
      break;
    default:
      break;
  }
  const options = {
    uri: url,
    method: type,
    qs: queryParams,
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  };

  return request(options);
};
