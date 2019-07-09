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
exports.fetchRequests = async (
  url,
  body,
  type,
  queryParams,
  graphEndpoint = null,
  graphMethod = null,
) => {
  const payload = body;
  /**
   * Format the payload into graphQl body format.
   * 1) Remove curly brackets
   * 2) Remove double quotes from keys
   */
  let rawData = JSON.stringify(body).replace(/[{}]+/g, '');
  rawData = rawData.replace(/"(\w+)"\s*:/g, '$1:');

  const options = {
    uri: url,
    method: type,
    qs: queryParams,
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  };

  let queryResponse;
  let queryResponseBody;
  let queryParsedResponse;
  let returnResponse;

  switch (type) {
    case 'POST':
      options.body = `${graphEndpoint} { ${graphMethod}(${rawData}) }`;
      queryResponse = await request(options);
      queryParsedResponse = JSON.parse(queryResponse).data[graphMethod];
      queryResponseBody = queryParsedResponse.body;
      returnResponse = {
        status: queryParsedResponse.status,
        result: queryParsedResponse.result,
      };
      Object.keys(queryResponseBody).forEach((key) => {
        returnResponse[key] = queryResponseBody[key];
      });
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
  return returnResponse;
};
