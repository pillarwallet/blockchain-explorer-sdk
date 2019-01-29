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
const requesterUtil = require('../util/RequestUtil');

module.exports = {
/**
  * Https POST request
  * @method registerAccount
  * @param  {String} url
  * @param  {Object} body
  */
  postRequest: (url, body) => requesterUtil.fetchRequests(url, body, 'POST', undefined),

  /**
    * Https GET request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
  getRequest: (url, body) => requesterUtil.fetchRequests(url, undefined, 'GET', body),

  /**
    * Https PUT request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
  putRequest: (url, body) => requesterUtil.fetchRequests(url, body, 'PUT', undefined),

  /**
    * Https DELETE request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
  deleteRequest: (url, body) => requesterUtil.fetchRequests(url, body, 'DELETE', undefined),
};
