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
